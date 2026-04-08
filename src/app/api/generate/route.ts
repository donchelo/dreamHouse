import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Part, ThinkingLevel } from '@google/genai';
import { DreamHouseParams } from '@/types';

// Vercel configuration: maxDuration only works on Pro plan, but it's the correct way to declare it
// Hobby plan has 10s limit, Pro plan allows up to 300s
export const maxDuration = 120; // Increased to 120s to allow for image generation and thinking time

// Constants for validation
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB per image
const MAX_TOTAL_PAYLOAD_SIZE = 4 * 1024 * 1024; // 4MB total (Vercel limit is 4.5MB, we use 4MB for safety)
const MAX_REFERENCE_IMAGES = 14; // Nano Banana 2 support up to 14

// Helper to map project types to English for better AI understanding
const PROJECT_TYPE_MAP: Record<string, string> = {
  "Casa unifamiliar": "single-family house",
  "Villa de lujo": "luxury villa",
  "Apartamento/Penthouse": "penthouse apartment",
  "Edificio residencial": "residential building",
  "Oficinas corporativas": "corporate office building",
  "Retail/Tienda": "retail store",
  "Restaurante/Bar": "restaurant",
  "Hotel boutique": "boutique hotel",
  "Hotel resort": "resort hotel",
  "Museo/Galería": "museum",
  "Centro cultural": "cultural center",
  "Biblioteca": "library",
  "Teatro/Auditorio": "theater",
  "Edificio educativo": "educational building",
  "Clínica/Hospital": "medical clinic",
  "Spa/Wellness": "wellness spa",
  "Mixed-use": "mixed-use building"
};

// Helper to map mood to English descriptors
const MOOD_MAP: Record<string, string> = {
  "Elegante y sofisticado": "elegant and sophisticated atmosphere",
  "Acogedor y cálido": "cozy and warm atmosphere",
  "Dramático e impactante": "dramatic and striking atmosphere",
  "Sereno y zen": "serene and zen atmosphere",
  "Futurista y vanguardista": "futuristic and avant-garde atmosphere",
  "Rústico y orgánico": "rustic and organic atmosphere",
  "Lujoso y opulento": "luxurious and opulent atmosphere",
  "Industrial y raw": "industrial and raw atmosphere",
  "Minimalista y puro": "minimalist and pure atmosphere",
  "Romántico y nostálgico": "romantic and nostalgic atmosphere"
};

// Helper function to validate image size
function validateImageSize(file: File, fieldName: string): { valid: boolean; error?: string } {
  if (file.size > MAX_IMAGE_SIZE) {
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
function calculatePayloadSize(files: File[], lotImage: File | null, floorPlanImage: File | null, paramsJson: string): number {
  let totalSize = paramsJson.length;
  files.forEach(file => totalSize += file.size);
  if (lotImage) totalSize += lotImage.size;
  if (floorPlanImage) totalSize += floorPlanImage.size;
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

    // Initialize Gemini Client with provided key
    // Initialize Gemini Client with provided key and increased timeout (120s)
    const ai = new GoogleGenAI({ 
      apiKey,
      httpOptions: { timeout: 120000 }
    });

    const formData = await req.formData();
    const paramsJson = formData.get('params') as string;
    const files = formData.getAll('files') as File[];
    const lotImage = formData.get('lotImage') as File | null;
    const floorPlanImage = formData.get('floorPlanImage') as File | null;

    if (!paramsJson) {
      return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
    }

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

    if (lotImage) {
      const validation = validateImageSize(lotImage, 'Lot image');
      if (!validation.valid) {
        return NextResponse.json({ message: validation.error }, { status: 400 });
      }
    }

    if (floorPlanImage) {
      const validation = validateImageSize(floorPlanImage, 'Floor plan image');
      if (!validation.valid) {
        return NextResponse.json({ message: validation.error }, { status: 400 });
      }
    }

    // Validate total payload size
    const totalPayloadSize = calculatePayloadSize(files, lotImage, floorPlanImage, paramsJson);
    if (totalPayloadSize > MAX_TOTAL_PAYLOAD_SIZE) {
      return NextResponse.json(
        {
          message: `Total payload size (${(totalPayloadSize / 1024 / 1024).toFixed(2)}MB) exceeds maximum allowed size of ${MAX_TOTAL_PAYLOAD_SIZE / 1024 / 1024}MB. Please reduce image sizes or number of images.`
        },
        { status: 413 }
      );
    }

    const params: DreamHouseParams = JSON.parse(paramsJson);

    // Process images to base64 for multimodal generation
    let lotImageBase64 = "";
    let lotImageMimeType = "";
    let floorPlanImageBase64 = "";
    let floorPlanImageMimeType = "";
    const referenceImagesBase64: Array<{ mimeType: string; data: string }> = [];

    if (lotImage) {
      const buffer = await lotImage.arrayBuffer();
      lotImageBase64 = Buffer.from(buffer).toString('base64');
      lotImageMimeType = lotImage.type;
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

    // --- Construct Exterior Generation Prompt (JSON context) ---

    const projectType = PROJECT_TYPE_MAP[params.projectType] || params.projectType;
    const validArchitects = Array.isArray(params.architect)
      ? params.architect.filter(a => a !== "Sin arquitecto específico")
      : [];
    const moodDesc = MOOD_MAP[params.mood] || params.mood;

    // Build the structured JSON context object — only include fields with actual values
    const ctx: Record<string, unknown> = {};

    ctx.task = "generate_exterior_architectural_render";
    ctx.output_type = "exterior_view_only";

    // ── CRITICAL ABSOLUTE CONSTRAINTS (always first, highest model weight) ──
    const mandatory: Record<string, unknown> = {
      WARNING: "ALL values in this block are NON-NEGOTIABLE. Violating any constraint means the image is INCORRECT.",
    };
    if (projectType) mandatory.project_type = projectType;
    if (params.city) mandatory.location = params.city;
    if (params.architecturalStyles.length > 0) mandatory.architectural_style = params.architecturalStyles;
    if (validArchitects.length > 0) mandatory.architect_reference = validArchitects;
    if (moodDesc) mandatory.mood_atmosphere = moodDesc;
    if (params.levels > 0) {
      mandatory.levels = params.levels;
      mandatory.levels_mandate = `The building MUST show EXACTLY ${params.levels} floor(s) in the exterior. Count the stories before finalizing. If incorrect, regenerate.`;
    }
    if (params.bedrooms > 0) mandatory.bedrooms = params.bedrooms;
    if (params.bathrooms > 0) mandatory.bathrooms = params.bathrooms;
    if (params.parkingSpots > 0) mandatory.parking_spots = params.parkingSpots;
    if (params.parkingType) mandatory.parking_type = params.parkingType;
    ctx.CRITICAL_ABSOLUTE_CONSTRAINTS = mandatory;

    // ── IMAGE REFERENCES (floor plan → lot → style references) ──
    const imgRefs: Record<string, unknown> = {};
    if (floorPlanImageBase64) {
      imgRefs.floor_plan = {
        provided: true,
        fidelity: "~80% geometric fidelity required",
        mandate: "Trace the floor plan's footprint and perimeter as the building's 3D form. 20% creative freedom for structural coherence, proportion refinement, and 3D translation. Preserve all essential angles, curves, protrusions, and recesses.",
      };
    }
    if (lotImageBase64) {
      imgRefs.lot_image = {
        provided: true,
        mandate: "Integrate the building PERFECTLY into the terrain, topography, and vegetation shown. Match the site's lighting conditions exactly.",
      };
    }
    if (referenceImagesBase64.length > 0) {
      imgRefs.visual_references = {
        count: referenceImagesBase64.length,
        mandate: "Use as PRIMARY source for architectural style, materials, colors, textures, and aesthetic atmosphere. Incorporate their visual language directly.",
      };
    }
    if (Object.keys(imgRefs).length > 0) ctx.image_references = imgRefs;

    // ── VOLUMETRY ──
    const volumetry: Record<string, unknown> = {};
    if (params.size) volumetry.size = params.size;
    if (params.levels > 0) volumetry.levels = params.levels; // repeated — critical for 3D form
    if (params.roofType) volumetry.roof_type = params.roofType;
    if (params.layoutType) volumetry.spatial_layout = params.layoutType;
    if (Object.keys(volumetry).length > 0) ctx.volumetry = volumetry;

    // ── BUILDING PROGRAM ──
    const program: Record<string, unknown> = {};
    if (params.bedrooms > 0) program.bedrooms = params.bedrooms;
    if (params.bathrooms > 0) program.bathrooms = params.bathrooms;
    if (params.parkingSpots > 0) program.parking_spots = params.parkingSpots;
    if (params.parkingType) program.parking_type = params.parkingType;
    if (params.kitchenType) program.kitchen_type = params.kitchenType;
    if (params.livingAreaType) program.living_area_type = params.livingAreaType;
    if (params.socialAreas.length > 0) program.social_areas = params.socialAreas;
    if (Object.keys(program).length > 0) ctx.building_program = program;

    // ── MATERIALITY ──
    const mat: Record<string, unknown> = {};
    if (params.materials.length > 0) mat.facade_materials = params.materials;
    if (params.finishLevel) mat.finish_level = params.finishLevel;
    if (params.architecturalDetails && params.architecturalDetails.length > 0) mat.architectural_details = params.architecturalDetails;
    if (Object.keys(mat).length > 0) ctx.materiality = mat;

    // ── SITE & ENVIRONMENT ──
    const site: Record<string, unknown> = {};
    if (params.environment) site.urban_context = params.environment;
    if (params.climate) site.climate = params.climate;
    if (params.waterBody) site.water_body = params.waterBody;
    if (params.weatherCondition) site.weather_condition = params.weatherCondition;
    if (Object.keys(site).length > 0) ctx.site_and_environment = site;

    // ── COLOR & LANDSCAPE ──
    const colorLandscape: Record<string, unknown> = {};
    if (params.colorPalette.length > 0) colorLandscape.color_palette = params.colorPalette;
    if (params.exteriorElements.length > 0) colorLandscape.exterior_elements = params.exteriorElements;
    if (params.vegetation.length > 0) colorLandscape.vegetation = params.vegetation;
    if (Object.keys(colorLandscape).length > 0) ctx.color_and_landscape = colorLandscape;

    // ── PHOTOGRAPHY ──
    const photo: Record<string, unknown> = {};
    if (params.renderStyle) photo.render_style = params.renderStyle;
    if (params.cameraAngle) photo.camera_angle = params.cameraAngle;
    if (params.composition) photo.composition = params.composition;
    if (params.timeOfDay) photo.time_of_day = params.timeOfDay;
    if (params.season) photo.season = params.season;
    if (params.lighting) photo.lighting = params.lighting;
    if (params.humanContext) photo.human_context = params.humanContext;
    if (Object.keys(photo).length > 0) ctx.photography = photo;

    // ── CREATIVE DIRECTION ──
    const creative: Record<string, unknown> = {};
    if (params.technicalNotes) creative.technical_notes = params.technicalNotes;
    if (params.artDirection) creative.art_direction = params.artDirection;
    if (Object.keys(creative).length > 0) ctx.creative_direction = creative;

    // ── NEGATIVE PROMPT (last — explicit exclusions) ──
    if (params.negativePrompt) {
      ctx.negative_prompt = {
        STRICTLY_FORBIDDEN: "The following elements MUST NOT appear in the generated image under any circumstances.",
        avoid: params.negativePrompt,
      };
    }

    // Build verification checklist for mandatory numeric params
    const checks: string[] = [];
    if (params.levels > 0) checks.push(`- [ ] LEVELS: exactly ${params.levels} floor(s) clearly visible in the exterior view`);
    if (projectType) checks.push(`- [ ] PROJECT TYPE: building is architecturally recognizable as a ${projectType}`);
    if (params.architecturalStyles.length > 0) checks.push(`- [ ] STYLE: ${params.architecturalStyles.join(", ")} clearly expressed in the design`);
    if (params.bedrooms > 0) checks.push(`- [ ] BEDROOMS: ${params.bedrooms} bedroom-scale volumes implied by the building massing`);
    if (params.parkingSpots > 0 || params.parkingType) checks.push(`- [ ] PARKING: ${[params.parkingType, params.parkingSpots > 0 ? `${params.parkingSpots} space(s)` : ''].filter(Boolean).join(', ')} visible`);
    if (params.negativePrompt) checks.push(`- [ ] NEGATIVE PROMPT: none of the forbidden elements appear in the image`);

    const verificationBlock = checks.length > 0
      ? `\nFINAL VERIFICATION — check every item before outputting:\n${checks.join('\n')}\nIf any check fails, correct and regenerate. Do not output an incorrect image.`
      : '';

    const fullPrompt = `You are a world-class architectural visualization AI. Generate a photorealistic exterior architectural render that EXACTLY matches ALL parameters in the JSON context below.

FUNDAMENTAL RULE: This is a professional architectural concept design tool. Every parameter is a MANDATORY design requirement — not a suggestion. Deviating from any value means the output is incorrect.

=== ARCHITECTURAL DESIGN CONTEXT ===
${JSON.stringify(ctx, null, 2)}
=== END CONTEXT ===

OUTPUT REQUIREMENTS:
- Generate EXTERIOR VIEW ONLY — no interiors, no sections, no floor plans
- ${params.renderStyle || 'Photorealistic'} quality, cinematic lighting
- Apply ALL parameters from the context above without exception
- Image priority order: floor plan geometry (~80%) > lot terrain > visual references > parameters
${verificationBlock}`.trim();

    console.log("Generated Exterior Prompt:", fullPrompt);

    // --- Generate Exterior Image ---
    const imageGenerationParts: Part[] = [{ text: fullPrompt }];

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

    for (const refImage of referenceImagesBase64) {
      imageGenerationParts.push({
        inlineData: { mimeType: refImage.mimeType, data: refImage.data }
      });
    }

    const generationResponse = await ai.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
      contents: [{ parts: imageGenerationParts }],
      config: {
        tools: [{ googleSearch: {} }],
        imageConfig: {
          ...(params.renderAspectRatio ? { aspectRatio: params.renderAspectRatio } : {}),
          ...(params.renderOutputResolution ? { imageSize: params.renderOutputResolution } : {})
        },
        ...(params.thinkingLevel === "High" ? {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
            includeThoughts: true
          }
        } : {})
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

    return NextResponse.json({ imageUrl });

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
      // We check for 'status' property which exists on Google AI SDK errors
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
