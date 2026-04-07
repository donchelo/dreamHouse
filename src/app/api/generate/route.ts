import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Part, ThinkingLevel } from '@google/genai';
import { DreamHouseParams } from '@/types';
import { generateFloorPlan } from '@/lib/floor-plan-engine';

// Vercel configuration: maxDuration only works on Pro plan, but it's the correct way to declare it
// Hobby plan has 10s limit, Pro plan allows up to 300s
export const maxDuration = 60; // 60 seconds for Pro plan (or use 10 for Hobby)

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
function calculatePayloadSize(files: File[], lotImage: File | null, roomImage: File | null, floorPlanImage: File | null, inspirationImage: File | null, paramsJson: string): number {
  let totalSize = paramsJson.length; // JSON params size
  
  files.forEach(file => totalSize += file.size);
  if (lotImage) totalSize += lotImage.size;
  if (roomImage) totalSize += roomImage.size;
  if (floorPlanImage) totalSize += floorPlanImage.size;
  if (inspirationImage) totalSize += inspirationImage.size;
  
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
    const ai = new GoogleGenAI({ apiKey });

    const formData = await req.formData();
    const paramsJson = formData.get('params') as string;
    const files = formData.getAll('files') as File[];
    const lotImage = formData.get('lotImage') as File | null;
    const roomImage = formData.get('roomImage') as File | null;
    const floorPlanImage = formData.get('floorPlanImage') as File | null;
    const inspirationImage = formData.get('inspirationImage') as File | null;
    const mode = (formData.get('mode') as string) || 'exterior'; // 'floor-plan' | 'exterior' | 'interior'

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

    if (roomImage) {
      const validation = validateImageSize(roomImage, 'Room image');
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

    if (inspirationImage) {
      const validation = validateImageSize(inspirationImage, 'Inspiration image');
      if (!validation.valid) {
        return NextResponse.json({ message: validation.error }, { status: 400 });
      }
    }

    // Validate total payload size
    const totalPayloadSize = calculatePayloadSize(files, lotImage, roomImage, floorPlanImage, inspirationImage, paramsJson);
    if (totalPayloadSize > MAX_TOTAL_PAYLOAD_SIZE) {
      return NextResponse.json(
        { 
          message: `Total payload size (${(totalPayloadSize / 1024 / 1024).toFixed(2)}MB) exceeds maximum allowed size of ${MAX_TOTAL_PAYLOAD_SIZE / 1024 / 1024}MB. Please reduce image sizes or number of images.` 
        },
        { status: 413 }
      );
    }

    const params: DreamHouseParams = JSON.parse(paramsJson);

    // Process all images to base64 for multimodal generation
    let lotImageBase64 = "";
    let lotImageMimeType = "";
    let floorPlanImageBase64 = "";
    let floorPlanImageMimeType = "";
    const referenceImagesBase64: Array<{ mimeType: string; data: string }> = [];
    const imagePartsForFloorPlan: Part[] = [];

    // Process inspiration image (highest priority for floor plan structure)
    if (inspirationImage) {
      const buffer = await inspirationImage.arrayBuffer();
      const inspirationBase64 = Buffer.from(buffer).toString('base64');
      imagePartsForFloorPlan.push({
        inlineData: {
          mimeType: inspirationImage.type,
          data: inspirationBase64
        }
      });
    }

    // Process lot image
    if (lotImage) {
      const buffer = await lotImage.arrayBuffer();
      lotImageBase64 = Buffer.from(buffer).toString('base64');
      lotImageMimeType = lotImage.type;
      imagePartsForFloorPlan.push({
        inlineData: {
          mimeType: lotImageMimeType,
          data: lotImageBase64
        }
      });
    }

    // Process room image
    let roomImageBase64 = "";
    let roomImageMimeType = "";
    if (roomImage) {
      const buffer = await roomImage.arrayBuffer();
      roomImageBase64 = Buffer.from(buffer).toString('base64');
      roomImageMimeType = roomImage.type;
    }

    // Process reference images
    if (files.length > 0) {
      for (const file of files) {
        const buffer = await file.arrayBuffer();
        const base64Data = Buffer.from(buffer).toString('base64');
        referenceImagesBase64.push({
          mimeType: file.type,
          data: base64Data
        });
        imagePartsForFloorPlan.push({
          inlineData: {
            mimeType: file.type,
            data: base64Data
          }
        });
      }
    }

    // Process floor plan image (only for exterior mode, not for floor plan generation)
    if (floorPlanImage) {
      const buffer = await floorPlanImage.arrayBuffer();
      floorPlanImageBase64 = Buffer.from(buffer).toString('base64');
      floorPlanImageMimeType = floorPlanImage.type;
    }

    // --- Step 2: Generate Floor Plan Image (if mode is 'floor-plan') ---
    if (mode === 'floor-plan') {
      console.log("Generating floor plan image...");
      const floorPlanImageUrl = await generateFloorPlan(params, imagePartsForFloorPlan, apiKey);
      
      return NextResponse.json({ 
        imageUrl: floorPlanImageUrl
      });
    }

    // --- Step 3: Interior Design Prompt ---
    if (mode === 'interior') {
      // Validate: if room image is provided, room type must be specified
      if (roomImage && roomImageBase64 && (!params.roomType || params.roomType === "")) {
        return NextResponse.json(
          { message: 'Si subes una foto de habitación, debes indicar obligatoriamente qué tipo de habitación es. Por favor, selecciona el tipo de habitación.' },
          { status: 400 }
        );
      }

      const interiorStyles = params.interiorStyle.length > 0 ? params.interiorStyle.join(", ") : "Not specified";
      const validInteriorDesigners = Array.isArray(params.interiorDesigner) 
        ? params.interiorDesigner.filter(d => d !== "Sin diseñador específico")
        : [];
      const interiorDesigners = validInteriorDesigners.join(" and ");
      const wallMaterials = params.wallMaterial.length > 0 ? params.wallMaterial.join(", ") : "Not specified";
      const colors = params.colorPalette.length > 0 ? params.colorPalette.join(", ") : "Not specified";
      const moodDesc = MOOD_MAP[params.mood] || params.mood;

      // Build a narrative, descriptive prompt following Nano Banana best practices
      // "Describe the scene, don't just list keywords" - from documentation
      const interiorPrompt = roomImageBase64 ? `
You are a world-class interior decorator working with a real photograph of a ${params.roomType}. The image attached shows the existing room structure - its walls, floor, doors, windows, and architectural elements. Your task is to transform this space through decoration, adding furniture, textiles, lighting, and decorative elements that bring it to life in a ${interiorStyles} style${interiorDesigners ? `, inspired by the work of ${interiorDesigners}` : ''}.

**THE ROOM AS YOUR FOUNDATION:**
The photograph shows a ${params.roomType} with its existing architecture. Preserve the room's structure - the walls, floor surface, doors, windows, and ceiling remain as they appear in the photo. Think of yourself as a decorator who walks into this exact space and transforms it through furniture placement, color accents, lighting design, and decorative accessories.

**YOUR DECORATION MISSION:**
Decorate this room to create a ${moodDesc} atmosphere. Fill the space with ${params.furnitureStyle} furniture that complements the existing architecture. The color palette should emphasize ${colors !== "Not specified" ? colors : "harmonious tones that work with the room's existing materials"}. 

Imagine the scene: ${params.interiorLighting} illuminates the space, creating ${moodDesc === "Elegante y sofisticado" ? "an elegant and sophisticated" : moodDesc === "Acogedor y cálido" ? "a warm and inviting" : moodDesc === "Sereno y zen" ? "a serene and peaceful" : "a refined"} atmosphere. The furniture selection should reflect ${params.finishLevel} quality, with pieces that feel authentic and well-crafted.

**DECORATIVE ELEMENTS TO ADD:**
- Furniture pieces appropriate for a ${params.roomType} in ${interiorStyles} style
- Textiles: cushions, throws, rugs that complement the existing floor
- Lighting: lamps, pendant lights, or chandeliers that enhance the ${params.interiorLighting} ambiance
- Decorative accessories: artwork, plants, vases, books, and objects that tell a story
- Window treatments: curtains or blinds that frame the existing windows beautifully
- Personal touches that make the space feel lived-in and inviting

**THE RESULT:**
The final image should look like a professional interior photography shot of this same room, but now fully decorated and styled. The architecture remains recognizable - same walls, same floor, same windows - but the space is now transformed through thoughtful decoration. The lighting should feel natural and cinematic, highlighting both the existing architecture and the new decorative elements. The overall composition should feel balanced, inviting, and true to the ${interiorStyles} aesthetic.

${referenceImagesBase64.length > 0 ? `
**STYLE REFERENCES:**
${referenceImagesBase64.length} reference image(s) are provided to guide the furniture style, decorative object selection, and overall aesthetic mood. Use these as inspiration for the types of pieces and decorative elements that would work beautifully in this space, while respecting the room's existing structure shown in the first image.
` : ''}

**PHOTOGRAPHIC QUALITY:**
Capture this decorated room as if photographed by a professional interior photographer for a luxury design magazine. The image should be photorealistic, with attention to natural lighting behavior, realistic material textures, and authentic details. ${params.renderOutputResolution || "4K"} resolution, cinematic composition from a ${params.cameraAngle} perspective.

${params.negativePrompt ? `**ELEMENTS TO AVOID:** ${params.negativePrompt}` : ''}
${params.artDirection ? `**ARTISTIC DIRECTION:** ${params.artDirection}` : ''}
` : `
**OBJECTIVE: CREATE AN AWARD-WINNING INTERIOR PHOTOGRAPH**

You are a world-class interior designer and architectural photographer. Create a complete, photorealistic interior visualization of a ${params.roomType} that embodies ${interiorStyles} style${interiorDesigners ? `, inspired by the work of ${interiorDesigners}` : ''}.

**THE DESIGN VISION:**
Design a ${params.roomType} that feels ${moodDesc}. The space should feature ${params.furnitureStyle} furniture, with a color palette emphasizing ${colors !== "Not specified" ? colors : "harmonious and sophisticated tones"}. The materials should reflect ${params.finishLevel} quality - think authentic textures, natural materials, and refined finishes.

**THE ATMOSPHERE:**
Imagine ${params.interiorLighting} filling the space, creating depth and atmosphere. The room should feel lived-in yet pristine, with every element carefully considered. The design should tell a story - this is a space where someone would want to spend time, relax, work, or entertain, depending on the room type.

**ARCHITECTURAL ELEMENTS:**
Design walls, floor, ceiling, windows, and doors that complement the ${interiorStyles} aesthetic. Consider how natural light enters through windows, how materials interact with each other, and how the space flows. Every architectural decision should support the overall design vision.

**FURNITURE AND DECORATION:**
Populate the space with appropriate furniture pieces, decorative accessories, artwork, plants, and textiles that bring the design to life. Each element should feel intentional and contribute to the ${moodDesc} atmosphere you're creating.

${referenceImagesBase64.length > 0 ? `
**VISUAL REFERENCES:**
${referenceImagesBase64.length} reference image(s) are provided to guide the style, materials, color palette, furniture selection, and overall aesthetic mood. Use these as inspiration while creating your unique interpretation.
` : ''}

**THE FINAL IMAGE:**
Generate a high-end, professional architectural interior photograph that looks like it was shot by a luxury design magazine photographer. The image should be photorealistic with attention to realistic textures, natural lighting behavior, and authentic material properties. ${params.renderOutputResolution || "4K"} resolution, ultra-detailed, cinematic lighting, captured from a ${params.cameraAngle} perspective.

${params.negativePrompt ? `**ELEMENTS TO AVOID:** ${params.negativePrompt}` : ''}
${params.artDirection ? `**ARTISTIC DIRECTION:** ${params.artDirection}` : ''}
`.trim();

      console.log("Interior Prompt:", interiorPrompt);

      // Build multimodal parts array following Nano Banana best practices
      // Order is critical for image-to-image editing:
      // 1. Base image (room photo) - establishes the structural foundation
      // 2. Text instructions - describes the decoration to apply
      // 3. Reference images - provide style inspiration (optional)
      const interiorParts: Part[] = [];
      
      // STEP 1: Base room image (if provided) - PRIMARY CONTEXT
      // This image serves as the foundation for decoration. The model will preserve
      // the room structure while adding furniture and decorative elements on top.
      if (roomImageBase64) {
        interiorParts.push({ 
          inlineData: { 
            mimeType: roomImageMimeType, 
            data: roomImageBase64 
          } 
        });
      }
      
      // STEP 2: Text prompt with decoration instructions
      // The narrative prompt guides the model to decorate the room while
      // respecting the existing architecture shown in the base image.
      interiorParts.push({ text: interiorPrompt });
      
      // STEP 3: Style reference images (optional)
      // These provide visual inspiration for furniture style, decorative objects,
      // and overall aesthetic mood. They inform the decoration layer, not the structure.
      for (const refImage of referenceImagesBase64) {
        interiorParts.push({ 
          inlineData: { 
            mimeType: refImage.mimeType, 
            data: refImage.data 
          } 
        });
      }

      const generationResponse = await ai.models.generateContent({
        model: "gemini-3.1-flash-image-preview",
        contents: [{ parts: interiorParts }],
        config: {
          tools: [
            {
              googleSearch: {}
            }
          ],
          imageConfig: {
            aspectRatio: params.renderAspectRatio || "16:9",
            imageSize: params.renderOutputResolution || "4K"
          },
          thinkingConfig: {
            thinkingLevel: params.thinkingLevel === "High" ? ThinkingLevel.HIGH : ThinkingLevel.LOW,
            includeThoughts: true
          }
        }
      });

      const candidates = generationResponse.candidates;
      if (!candidates || candidates.length === 0) throw new Error("No image candidates returned");
      const imagePart = candidates[0]?.content?.parts?.find((part: Part) => part.inlineData);
      if (!imagePart || !imagePart.inlineData) throw new Error("No image data found");

      return NextResponse.json({ 
        imageUrl: `data:${imagePart.inlineData.mimeType || "image/png"};base64,${imagePart.inlineData.data}` 
      });
    }

    // --- Step 4: Construct Enhanced Prompt for Exterior ---
    
    // 1. Core Subject Definition
    const projectType = PROJECT_TYPE_MAP[params.projectType] || params.projectType;
    const locationStr = params.city ? `in ${params.city}` : "";
    const validArchitects = Array.isArray(params.architect) 
      ? params.architect.filter(a => a !== "Sin arquitecto específico")
      : [];
    const architects = validArchitects.join(" and ");
    const archStyle = params.architecturalStyles.join(", ");
    
    // 2. Technical Specifications
    const techSpecs = [
      `${params.size}`,
      `${params.levels} levels`,
      `${params.roofType} roof`
    ].filter(Boolean).join(", ");

    // 3. Materials & Finishes
    const materialsList = params.materials.join(", ");
    const colors = params.colorPalette.join(", ");
    const finish = params.finishLevel;
    const architecturalDetails = params.architecturalDetails && params.architecturalDetails.length > 0 
      ? params.architecturalDetails.join(", ")
      : "";

    // 4. Environment & Context
    const environment = [
        params.environment,
        params.climate,
        params.waterBody !== "Sin agua cercana" ? params.waterBody : null,
        params.weatherCondition
    ].filter(Boolean).join(", ");

    // 5. Landscaping
    const landscaping = [
        ...params.vegetation,
        ...params.exteriorElements
    ].join(", ");

    // 6. Atmosphere & Mood
    const moodDesc = MOOD_MAP[params.mood] || params.mood;
    
    // 7. Photography Settings
    const camera = [
        `Angle: ${params.cameraAngle}`,
        `Composition: ${params.composition}`,
        `Time: ${params.timeOfDay}`,
        `Season: ${params.season}`,
        `Lighting: ${params.lighting}`
    ].join(" | ");

    // Construct the Professional Prompt
    // When images are provided (multimodal), we prioritize them as the structural truth
    const fullPrompt = `
**OBJECTIVE: GENERATE AN AWARD-WINNING EXTERIOR PHOTOGRAPH**
Act as a world-renowned architectural photographer. Your goal is to create a photorealistic exterior view based on the following parameters and attached visual context.

${floorPlanImageBase64 ? `
**CRITICAL: FLOOR PLAN IMAGE PROVIDED (PRIMARY GEOMETRIC REFERENCE - ~80% FIDELITY)**
A FLOOR PLAN IMAGE has been attached as the FIRST image. This floor plan is the PRIMARY GEOMETRIC REFERENCE for the building's exterior form, with approximately 80% fidelity requirement.

**BALANCED INSTRUCTIONS FOR EXTERIOR:**
1. **GENERAL FOOTPRINT MATCH (~80%):** Aim for approximately 80% fidelity to the floor plan's geometry. Follow the general shape, footprint, and perimeter shown in the floor plan. The overall form and spatial organization should be recognizable and faithful to the plan.
2. **SPATIAL ORGANIZATION:** The spatial distribution, room locations, and circulation patterns visible in the floor plan should be reflected in the exterior view. If the floor plan shows specific room arrangements, the exterior should show corresponding volumes, windows, and architectural elements that align with those interior spaces.
3. **CREATIVE FLEXIBILITY (~20%):** You have approximately 20% creative freedom to adapt the perimeter, edges, protrusions, and details where necessary for:
   - Structural logic and 3D architectural coherence
   - Aesthetic refinement and visual impact
   - Smoothing of irregular lines or angles that may not translate well to 3D
   - Enhancing proportions and architectural harmony
4. **EXTERIOR INTERPRETATION:** Translate the 2D floor plan into a 3D exterior view. The building's height, roof lines, window placement, and architectural features should be consistent with the spatial organization shown in the floor plan, while allowing for natural 3D refinements.
5. **PRESERVE CORE SHAPE CHARACTERISTICS:** Maintain the essential angles, curves, protrusions, recesses, and unique geometric features visible in the floor plan. These define the building's character and should be preserved, but can be refined for better 3D architectural form.

The floor plan provides the building's FORM foundation (~80%). Your task is to create a photorealistic EXTERIOR VIEW that respects this form while applying intelligent 3D refinements (~20%) and the specified architectural style, materials, and aesthetic details.
` : ''}

**ARCHITECTURAL STYLE & SPECIFICATIONS (CLIENT PARAMETERS):**
- **Project Type:** ${projectType} ${locationStr}
- **Style:** ${archStyle} ${architects ? `(inspired by ${architects})` : ''}
- **Technical Specs:** ${techSpecs}
- **Materials:** ${materialsList}
- **Color Palette:** ${colors}
- **Finish:** ${finish}
- **Atmosphere:** ${moodDesc}
${architecturalDetails ? `- **Architectural Details:** ${architecturalDetails}` : ''}

**ENVIRONMENT & PHOTOGRAPHY:**
- **Context:** ${environment}
- **Landscaping:** ${landscaping}
${lotImageBase64 ? `- **LOT INTEGRATION:** Use the attached LOT IMAGE as the exact environment and terrain for this project. The building MUST be perfectly integrated into the specific terrain, topography, vegetation, and lighting conditions shown in the lot image.` : ''}
${referenceImagesBase64.length > 0 ? `- **VISUAL REFERENCE IMAGES:** ${referenceImagesBase64.length} reference image(s) are attached. Use these images as the PRIMARY source for architectural style, materials, colors, textures, and overall aesthetic atmosphere. Analyze the attached reference images and incorporate their visual language directly into the final image.` : ''}
- **Camera Configuration:** ${camera}
- **Human Scale:** ${params.humanContext !== "Sin personas" ? params.humanContext : "None"}

**FINAL DIRECTIVE (PRIORITY ORDER):**
1. **FLOOR PLAN IMAGE (HIGHEST PRIORITY - ~80% FIDELITY):** If a FLOOR PLAN IMAGE is attached, it is the PRIMARY GEOMETRIC REFERENCE. Aim for approximately 80% fidelity to the floor plan's geometry - the building's exterior footprint, shape, perimeter, and spatial organization should closely follow the floor plan. You have ~20% creative freedom to refine edges, proportions, and details for superior 3D architectural coherence and aesthetic impact. The exterior view should be a faithful 3D interpretation of the 2D floor plan geometry, with intelligent refinements.
2. **LOT IMAGE (SECOND PRIORITY):** If a LOT IMAGE is attached, the building MUST be perfectly integrated into that specific terrain, matching the topography, vegetation, and environmental conditions shown. The building's shape should respect the floor plan geometry (~80%) while allowing for terrain adaptation within the 20% flexibility.
3. **VISUAL REFERENCE IMAGES (STYLE REFERENCE):** If VISUAL REFERENCE IMAGES are attached, use them as the PRIMARY source for architectural style, material selection, color palette, and aesthetic details. Incorporate their visual language directly into the final image, working within the geometric framework defined by the floor plan (~80% fidelity).
4. **PARAMETERS (AESTHETIC LAYER):** Apply the architectural style and materials specified in the parameters as an aesthetic layer over the structural geometry defined by the floor plan. These parameters inform HOW the building looks, while the floor plan provides the foundational shape (~80%) with room for refinement (~20%).
5. **OUTPUT REQUIREMENT:** Generate ONLY EXTERIOR VIEWS. Photorealistic quality, cinematic lighting. The exterior should be a faithful 3D representation of the floor plan's geometry (~80% fidelity) with intelligent architectural refinements (~20%).

${params.negativePrompt ? `\n**NEGATIVE PROMPT / AVOID:**\nThe following elements MUST NOT appear in the generated image:\n${params.negativePrompt}\n\nStrictly avoid these elements. If any of these are present in the generated image, it will be considered incorrect.` : ''}

${params.artDirection ? `\n**ART DIRECTION:**\n${params.artDirection}` : ''}
`.trim();

    console.log("Generated Multimodal Prompt:", fullPrompt);

    // --- Step 4: Generate Image (Multimodal Call) ---
    const imageGenerationParts: Part[] = [{ text: fullPrompt }];

    // Add floor plan image if available
    if (floorPlanImageBase64) {
      imageGenerationParts.push({
        inlineData: {
          mimeType: floorPlanImageMimeType,
          data: floorPlanImageBase64
        }
      });
    }

    // Add lot image if available
    if (lotImageBase64) {
      imageGenerationParts.push({
        inlineData: {
          mimeType: lotImageMimeType,
          data: lotImageBase64
        }
      });
    }

    // Add reference images if available
    for (const refImage of referenceImagesBase64) {
      imageGenerationParts.push({
        inlineData: {
          mimeType: refImage.mimeType,
          data: refImage.data
        }
      });
    }

    const generationResponse = await ai.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
      contents: [{ parts: imageGenerationParts }],
      config: {
        tools: [
          {
            googleSearch: {}
          }
        ],
        imageConfig: {
          aspectRatio: params.renderAspectRatio || "16:9",
          imageSize: params.renderOutputResolution || "4K"
        },
        thinkingConfig: {
          thinkingLevel: params.thinkingLevel === "High" ? ThinkingLevel.HIGH : ThinkingLevel.LOW,
          includeThoughts: true
        }
      }
    });

    // Extract image data
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
    console.error("API Error:", error);
    
    // Handle specific error types
    if (error instanceof Error) {
      // Timeout errors
      if (error.message.includes('timeout') || error.message.includes('TIMEOUT')) {
        return NextResponse.json(
          { 
            message: 'Request timeout. The generation took too long. Consider using Vercel Pro plan for longer execution times, or reduce image complexity.',
            code: 'TIMEOUT'
          },
          { status: 504 }
        );
      }
      
      // Payload size errors
      if (error.message.includes('payload') || error.message.includes('too large')) {
        return NextResponse.json(
          { 
            message: 'Payload too large. Please reduce image sizes or number of images.',
            code: 'PAYLOAD_TOO_LARGE'
          },
          { status: 413 }
        );
      }
      
      // API key errors
      if (error.message.includes('API_KEY') || error.message.includes('authentication')) {
        return NextResponse.json(
          { 
            message: 'Invalid or missing GEMINI_API_KEY. Please check your Vercel environment variables.',
            code: 'AUTH_ERROR'
          },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { 
          message: error.message,
          code: 'INTERNAL_ERROR'
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        message: 'Internal Server Error',
        code: 'UNKNOWN_ERROR'
      },
      { status: 500 }
    );
  }
}
