import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Part } from '@google/genai';
import { DreamHouseParams } from '@/types';
import { buildExteriorPrompt } from '@/modules/exterior/lib/prompt-builder';
import { buildInteriorPrompt } from '@/modules/interior/lib/prompt-builder';
import { buildVistasPrompt } from '@/modules/vistas/lib/prompt-builder';

// Vercel configuration: maxDuration only works on Pro plan, but it's the correct way to declare it
// Hobby plan has 10s limit, Pro plan allows up to 300s
export const maxDuration = 120; // Increased to 120s to allow for image generation and thinking time

// Constants for validation
const MAX_IMAGE_SIZE = 100 * 1024 * 1024; // 100MB per image
const MAX_TOTAL_PAYLOAD_SIZE = 100 * 1024 * 1024; // 100MB total payload
const MAX_REFERENCE_IMAGES = 14; // Nano Banana 2 support up to 14

// Helper function to validate image size
function validateImageSize(file: File, fieldName: string, skipSizeLimit: boolean = false): { valid: boolean; error?: string } {
  if (!skipSizeLimit && file.size > MAX_IMAGE_SIZE) {
    return {
      valid: false,
      error: `${fieldName} exceeds maximum size of ${MAX_IMAGE_SIZE / 1024 / 1024}MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`
    };
  }
  if (!file.type.startsWith('image/')) {
    return {
      valid: false,
      error: `${fieldName} must be an image file. Received: ${file.type}`
    };
  }
  return { valid: true };
}

// Helper function to calculate total payload size
function calculatePayloadSize(files: File[], lotImage: File | null, exteriorReferenceImage: File | null, floorPlanImage: File | null, editCompositeFile: File | null, paramsJson: string): number {
  let totalSize = paramsJson.length;
  files.forEach(file => totalSize += file.size);
  if (lotImage) totalSize += lotImage.size;
  if (exteriorReferenceImage) totalSize += exteriorReferenceImage.size;
  if (floorPlanImage) totalSize += floorPlanImage.size;
  if (editCompositeFile) totalSize += editCompositeFile.size;
  return totalSize;
}

export async function POST(req: NextRequest) {
  try {
    // Check for API key in headers (client-side provided) or environment variables
    const apiKey = req.headers.get('x-api-key') || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { message: 'API Key is missing. Please configure GEMINI_API_KEY in Vercel environment variables or provide it in the header.' },
        { status: 401 }
      );
    }

    // Initialize Gemini Client with provided key and increased timeout (120s)
    console.log("Initializing Gemini SDK with API Key (truncated):", apiKey.substring(0, 5) + "...");
    const ai = new GoogleGenAI({ 
      apiKey,
      httpOptions: { timeout: 120000 }
    });

    const formData = await req.formData();
    const paramsJson = formData.get('params') as string;
    const files = formData.getAll('files') as File[];
    const lotImage = formData.get('lotImage') as File | null;
    const exteriorReferenceImage = formData.get('exteriorReferenceImage') as File | null;
    const floorPlanImage = formData.get('floorPlanImage') as File | null;
    const editCompositeFile = formData.get('editCompositeFile') as File | null;
    const objectImages = formData.getAll('objectImages') as File[];

    if (!paramsJson) {
      return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
    }

    const params: DreamHouseParams = JSON.parse(paramsJson);

    // Validate number of reference images
    if (files.length > MAX_REFERENCE_IMAGES) {
      return NextResponse.json(
        { message: `Maximum ${MAX_REFERENCE_IMAGES} reference images allowed. Received: ${files.length}` },
        { status: 400 }
      );
    }

    // Validate individual image sizes
    for (const file of files) {
      const validation = validateImageSize(file, 'Reference image');
      if (!validation.valid) {
        return NextResponse.json({ message: validation.error }, { status: 400 });
      }
    }

    const isEditMode = params.mode === 'edit';

    if (lotImage) {
      const validation = validateImageSize(lotImage, 'Lot image', isEditMode);
      if (!validation.valid) {
        return NextResponse.json({ message: validation.error }, { status: 400 });
      }
    }
    
    if (exteriorReferenceImage) {
      const validation = validateImageSize(exteriorReferenceImage, 'Exterior reference image', isEditMode);
      if (!validation.valid) {
        return NextResponse.json({ message: validation.error }, { status: 400 });
      }
    }

    if (floorPlanImage) {
      const validation = validateImageSize(floorPlanImage, 'Floor plan image', isEditMode);
      if (!validation.valid) {
        return NextResponse.json({ message: validation.error }, { status: 400 });
      }
    }

    if (editCompositeFile) {
      const validation = validateImageSize(editCompositeFile, 'Edit Composite image', true);
      if (!validation.valid) {
        return NextResponse.json({ message: validation.error }, { status: 400 });
      }
    }

    if (objectImages.length > 13) {
      return NextResponse.json({ message: 'Maximum 13 object images allowed.' }, { status: 400 });
    }
    for (const file of objectImages) {
      const validation = validateImageSize(file, 'Object image');
      if (!validation.valid) {
        return NextResponse.json({ message: validation.error }, { status: 400 });
      }
    }

    // Validate total payload size
    const totalPayloadSize = calculatePayloadSize(files, lotImage, exteriorReferenceImage, floorPlanImage, editCompositeFile, paramsJson);
    if (!isEditMode && totalPayloadSize > MAX_TOTAL_PAYLOAD_SIZE) {
      return NextResponse.json(
        {
          message: `Total payload size (${(totalPayloadSize / 1024 / 1024).toFixed(2)}MB) exceeds maximum allowed size of ${MAX_TOTAL_PAYLOAD_SIZE / 1024 / 1024}MB. Please reduce image sizes or number of images.`
        },
        { status: 413 }
      );
    }

    // Process images to base64 for multimodal generation
    let lotImageBase64 = "";
    let lotImageMimeType = "";
    let exteriorRefBase64 = "";
    let exteriorRefMimeType = "";
    let floorPlanImageBase64 = "";
    let floorPlanImageMimeType = "";
    let editCompositeBase64 = "";
    let editCompositeMimeType = "";
    const referenceImagesBase64: Array<{ mimeType: string; data: string }> = [];
    const objectImagesBase64: Array<{ mimeType: string; data: string }> = [];

    if (lotImage) {
      const buffer = await lotImage.arrayBuffer();
      lotImageBase64 = Buffer.from(buffer).toString('base64');
      lotImageMimeType = lotImage.type;
    }
    
    if (exteriorReferenceImage) {
      const buffer = await exteriorReferenceImage.arrayBuffer();
      exteriorRefBase64 = Buffer.from(buffer).toString('base64');
      exteriorRefMimeType = exteriorReferenceImage.type;
    }

    if (files.length > 0) {
      for (const file of files) {
        const buffer = await file.arrayBuffer();
        const base64Data = Buffer.from(buffer).toString('base64');
        referenceImagesBase64.push({ mimeType: file.type, data: base64Data });
      }
    }

    if (floorPlanImage) {
      const buffer = await floorPlanImage.arrayBuffer();
      floorPlanImageBase64 = Buffer.from(buffer).toString('base64');
      floorPlanImageMimeType = floorPlanImage.type;
    }

    if (editCompositeFile) {
      const buffer = await editCompositeFile.arrayBuffer();
      editCompositeBase64 = Buffer.from(buffer).toString('base64');
      editCompositeMimeType = editCompositeFile.type;
    }

    if (objectImages.length > 0) {
      for (const file of objectImages) {
        const buffer = await file.arrayBuffer();
        objectImagesBase64.push({ mimeType: file.type, data: Buffer.from(buffer).toString('base64') });
      }
    }

    // --- NEW: Narrative Prompt Building ---
    let narrativePrompt = "";
    if (params.mode === 'interior') {
      narrativePrompt = buildInteriorPrompt(params);
    } else if (params.mode === 'exterior') {
      narrativePrompt = buildExteriorPrompt(params, !!exteriorReferenceImage);
    } else if (params.mode === 'vistas') {
      narrativePrompt = buildVistasPrompt(params, params.viewType || 'Perspectiva Principal (Hero Shot)');
    } else {
      narrativePrompt = `USER EDIT PROMPT: ${params.editPrompt}`;
    }

    let mandate = "";
    if (params.mode === "interior") {
      mandate = `INTERNAL SPATIAL MANDATE:
- This image is a professional interior design visualization. Scale, lighting, and texture are critical.
- Respect the functional logic of the specified room: ${params.roomType}.
- Ensure the furniture style (${params.furnitureStyle.join(', ')}) and lighting (${params.interiorLighting.join(', ')}) are rendered with high fidelity.
- Materiality: The floor (${params.flooringMaterial}) and ceiling (${params.ceilingDetail}) must define the vertical boundaries of the space.`;
    } else if (params.mode === "exterior") {
      const structureMandate = exteriorReferenceImage 
        ? "PRESERVE the fundamental architectural geometry, massing, and volumetric structure of the provided HOUSE REFERENCE IMAGE. Apply the requested styles and materials to this existing structure."
        : "Preserve the geometry of the provided floor plan if applicable.";
      mandate = `ARCHITECTURAL EXTERIOR MANDATE:
- This image is part of a professional architectural portfolio. Volumetric hierarchy is absolute.
- ${structureMandate}
- Integrate the building perfectly into the terrain/lot if provided.
- If LEVELS are specified as ${params.levels}, ensure exactly ${params.levels} floors are visible.`;
    } else if (params.mode === "vistas") {
      mandate = `ARCHITECTURAL PORTFOLIO MANDATE:
- This is a consistent architectural portfolio generation.
- The reference image is the ABSOLUTE TRUTH for materials, geometry, and style.
- Change the camera angle and perspective according to the request, but DO NOT change the house design.`;
    } else {
      mandate = `IMAGE EDITING MANDATE:
- Using the provided image (which may include user sketches/notes as a guide), perform the requested edits.
- The user's sketch/notes drawn on the image are instructions/guides for what to change and where.
- Seamlessly integrate the changes, matching the original lighting, style, and perspective.`;
    }

    const fullPrompt = `${narrativePrompt}

${mandate}
- QUALITY: Award-winning photography style, realistic textures, and cinematic lighting.

VERIFICATION STEPS:
1. Review the generated composition against the text description.
2. Verify that all requested materials (${params.materials.join(', ')}) are clearly visible.
3. Confirm that no forbidden elements appear (Negative Prompt: ${params.negativePrompt || 'None'}).
4. If the result is incorrect, reasoning should correct the composition before final output.`.trim();

    console.log("Generated Narrative Prompt:", fullPrompt);

    // --- Generate Exterior Image ---
    const imageGenerationParts: Part[] = [{ text: fullPrompt }];

    if (params.mode === 'edit' && editCompositeBase64) {
      // In edit mode, we only use the composite file (original + user sketches)
      imageGenerationParts.push({
        inlineData: { mimeType: editCompositeMimeType, data: editCompositeBase64 }
      });
    } else {
      // Image order: floor plan (geometric reference) → lot (terrain) → style references
      if (floorPlanImageBase64) {
        imageGenerationParts.push({
          inlineData: { mimeType: floorPlanImageMimeType, data: floorPlanImageBase64 }
        });
      }

      if (lotImageBase64) {
        imageGenerationParts.push({
          inlineData: { mimeType: lotImageMimeType, data: lotImageBase64 }
        });
      }

      if (exteriorRefBase64) {
        imageGenerationParts.push({
          text: "HOUSE REFERENCE IMAGE (STRUCTURAL BASE): The following image is the existing house that must be modified. Maintain its general volume, shape, and architectural structure while applying the new materials, colors, and styles specified in the prompt."
        });
        imageGenerationParts.push({
          inlineData: { mimeType: exteriorRefMimeType, data: exteriorRefBase64 }
        });
      }

      if (objectImagesBase64.length > 0) {
        imageGenerationParts.push({
          text: `OBJECT REFERENCES (${objectImagesBase64.length} piece${objectImagesBase64.length > 1 ? 's' : ''}): The following images are specific furniture pieces, fixtures, or decorative objects that MUST appear in the final interior design. Incorporate each one faithfully — preserve its exact shape, color, material, and design. Place them naturally within the space according to the room layout and style.`
        });
        for (const obj of objectImagesBase64) {
          imageGenerationParts.push({ inlineData: { mimeType: obj.mimeType, data: obj.data } });
        }
      }

      if (referenceImagesBase64.length > 0) {
        const refLabel = params.mode === 'exterior'
          ? `CONCEPTUAL STYLE REFERENCES (${referenceImagesBase64.length} image${referenceImagesBase64.length > 1 ? 's' : ''}): The following images are provided as conceptual inspiration ONLY — NOT as literal templates to replicate. Extract from them: architectural style vocabulary, material palette, spatial mood, massing proportions, and compositional sensibility. DO NOT copy specific buildings, facades, windows, or compositions shown. Translate their essence and spirit into the current project's own design language.`
          : `STYLE REFERENCES (${referenceImagesBase64.length} image${referenceImagesBase64.length > 1 ? 's' : ''}): The following images define the desired aesthetic mood, material palette, and spatial atmosphere. Use them as directional inspiration for the overall look and feel.`;
        imageGenerationParts.push({ text: refLabel });
        for (const refImage of referenceImagesBase64) {
          imageGenerationParts.push({
            inlineData: { mimeType: refImage.mimeType, data: refImage.data }
          });
        }
      }
    }

    const generationResponse = await ai.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
      contents: [{ parts: imageGenerationParts }],
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        // NEW: Enabled both web and image search for superior grounding
        tools: [
          { 
            googleSearch: { 
              searchTypes: {
                webSearch: {},
                imageSearch: {}
              }
            }
          } as any // eslint-disable-line @typescript-eslint/no-explicit-any
        ],
        imageConfig: {
          ...(params.renderAspectRatio ? { aspectRatio: params.renderAspectRatio } : {}),
          ...(params.renderOutputResolution ? { imageSize: params.renderOutputResolution } : {})
        },
        // Enhanced Thinking Configuration
        thinkingConfig: {
          thinkingLevel: params.thinkingLevel === "High" ? "HIGH" : "MINIMAL",
          includeThoughts: true
        } as any // eslint-disable-line @typescript-eslint/no-explicit-any
      }
    });

    const candidates = generationResponse.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No image candidates returned");
    }

    const firstCandidate = candidates[0];
    const parts = firstCandidate?.content?.parts;
    const imagePart = parts?.find((part: Part) => part.inlineData);

    if (!imagePart || !imagePart.inlineData) {
      throw new Error("No image data found in response");
    }

    const imageBase64 = imagePart.inlineData.data;
    const mimeType = imagePart.inlineData.mimeType || "image/png";
    const imageUrl = `data:${mimeType};base64,${imageBase64}`;
    const groundingMetadata = firstCandidate.groundingMetadata;

    // --- Generate House Name using Economical Model (Gemini 1.5 Flash) ---
    let houseName = "DreamHouse Project";
    try {
      const namePrompt = `Generate an inspirational 3-word name (in Spanish) for an architectural house with these characteristics:
- Style: ${params.architecturalStyles.join(', ') || 'Modern'}
- Mode: ${params.mode}
- Mood: ${params.mood}
- Materials: ${params.materials.join(', ')}
- Location: ${params.city || 'Any'}
- Context: ${params.environment}

Return ONLY the 3-word name, no quotes, no extra text. Focus on what makes it unique.`;
      
      const nameResult = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [{ parts: [{ text: namePrompt }] }]
      });
      
      const nameText = nameResult.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (nameText && nameText.split(/\s+/).length <= 6) { // Sanity check on length
        houseName = nameText;
      }
    } catch (nameError) {
      console.error("Failed to generate house name:", nameError);
      // Fallback to project name based on style
      houseName = `${params.architecturalStyles[0] || 'Modern'} Design House`;
    }

    return NextResponse.json({ imageUrl, groundingMetadata, houseName });

  } catch (error: unknown) {
    console.error("API Error Detailed:", error);

    let errorMessage = "Ocurrió un error inesperado al generar el render.";
    let statusCode = 500;
    let errorCode = "UNKNOWN_ERROR";

    if (error instanceof Error) {
      errorMessage = error.message;

      // Handle common gRPC/API error strings
      if (errorMessage.includes('Deadline expired') || errorMessage.includes('timeout') || errorMessage.includes('TIMEOUT')) {
        errorMessage = "El tiempo de espera ha expirado (timeout). La generación está tomando más tiempo de lo esperado en los servidores de Google. Por favor, intenta de nuevo.";
        statusCode = 504;
        errorCode = "TIMEOUT";
      } else if (errorMessage.includes('payload') || errorMessage.includes('too large')) {
        errorMessage = "El tamaño de los archivos es demasiado grande. Por favor, reduce el tamaño o la cantidad de imágenes.";
        statusCode = 413;
        errorCode = "PAYLOAD_TOO_LARGE";
      } else if (errorMessage.includes('API_KEY') || errorMessage.includes('authentication') || errorMessage.includes('401')) {
        errorMessage = "Error de autenticación: la GEMINI_API_KEY no es válida o falta.";
        statusCode = 401;
        errorCode = "AUTH_ERROR";
      } else if (errorMessage.includes('503') || errorMessage.includes('Service Unavailable')) {
        errorMessage = "El servicio de Google AI no está disponible temporalmente (503). Por favor, intenta de nuevo en unos momentos.";
        statusCode = 503;
        errorCode = "SERVICE_UNAVAILABLE";
      }

      // If it's a specific SDK ApiError, it should have a status code
      const sdkError = error as { status?: number; code?: number };
      if (sdkError.status) {
        statusCode = sdkError.status;
      }
    }

    return NextResponse.json(
      { message: errorMessage, code: errorCode },
      { status: statusCode }
    );
  }
}

