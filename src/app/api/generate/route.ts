import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { DreamHouseParams } from '@/types';
import { generateFloorPlan } from '@/lib/floor-plan-engine';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const paramsJson = formData.get('params') as string;
    const files = formData.getAll('files') as File[];
    const lotImage = formData.get('lotImage') as File | null;
    const floorPlanImage = formData.get('floorPlanImage') as File | null;
    const inspirationImage = formData.get('inspirationImage') as File | null;
    const mode = (formData.get('mode') as string) || 'render'; // 'floor-plan' | 'render'

    if (!paramsJson) {
      return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
    }

    const params: DreamHouseParams = JSON.parse(paramsJson);

    // Process all images to base64 for multimodal generation
    let lotImageBase64 = "";
    let lotImageMimeType = "";
    let floorPlanImageBase64 = "";
    let floorPlanImageMimeType = "";
    const referenceImagesBase64: Array<{ mimeType: string; data: string }> = [];
    const imagePartsForFloorPlan: any[] = [];

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

    // Process floor plan image (only for render mode, not for floor plan generation)
    if (floorPlanImage) {
      const buffer = await floorPlanImage.arrayBuffer();
      floorPlanImageBase64 = Buffer.from(buffer).toString('base64');
      floorPlanImageMimeType = floorPlanImage.type;
    }

    // --- Step 2: Generate Floor Plan Image (if mode is 'floor-plan') ---
    if (mode === 'floor-plan') {
      console.log("Generating floor plan image...");
      const floorPlanImageUrl = await generateFloorPlan(params, imagePartsForFloorPlan);
      
      return NextResponse.json({ 
        imageUrl: floorPlanImageUrl
      });
    }

    // --- Step 3: Construct Enhanced Prompt for Render ---
    
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
Act as a world-renowned architectural photographer. Your goal is to create a photorealistic render of a residential project based on the following parameters and attached visual context.

${floorPlanImageBase64 ? `
**CRITICAL: FLOOR PLAN IMAGE PROVIDED (PRIMARY GEOMETRIC REFERENCE - ~80% FIDELITY)**
A FLOOR PLAN IMAGE has been attached as the FIRST image. This floor plan is the PRIMARY GEOMETRIC REFERENCE for the building's exterior form, with approximately 80% fidelity requirement.

**BALANCED INSTRUCTIONS FOR EXTERIOR RENDERING:**
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
${referenceImagesBase64.length > 0 ? `- **VISUAL REFERENCE IMAGES:** ${referenceImagesBase64.length} reference image(s) are attached. Use these images as the PRIMARY source for architectural style, materials, colors, textures, and overall aesthetic atmosphere. Analyze the attached reference images and incorporate their visual language directly into the render.` : ''}
- **Camera Configuration:** ${camera}
- **Human Scale:** ${params.humanContext !== "Sin personas" ? params.humanContext : "None"}

**FINAL DIRECTIVE (PRIORITY ORDER):**
1. **FLOOR PLAN IMAGE (HIGHEST PRIORITY - ~80% FIDELITY):** If a FLOOR PLAN IMAGE is attached, it is the PRIMARY GEOMETRIC REFERENCE. Aim for approximately 80% fidelity to the floor plan's geometry - the building's exterior footprint, shape, perimeter, and spatial organization should closely follow the floor plan. You have ~20% creative freedom to refine edges, proportions, and details for superior 3D architectural coherence and aesthetic impact. The exterior view should be a faithful 3D interpretation of the 2D floor plan geometry, with intelligent refinements.
2. **LOT IMAGE (SECOND PRIORITY):** If a LOT IMAGE is attached, the building MUST be perfectly integrated into that specific terrain, matching the topography, vegetation, and environmental conditions shown. The building's shape should respect the floor plan geometry (~80%) while allowing for terrain adaptation within the 20% flexibility.
3. **VISUAL REFERENCE IMAGES (STYLE REFERENCE):** If VISUAL REFERENCE IMAGES are attached, use them as the PRIMARY source for architectural style, material selection, color palette, and aesthetic details. Incorporate their visual language directly into the render, working within the geometric framework defined by the floor plan (~80% fidelity).
4. **PARAMETERS (AESTHETIC LAYER):** Apply the architectural style and materials specified in the parameters as an aesthetic layer over the structural geometry defined by the floor plan. These parameters inform HOW the building looks, while the floor plan provides the foundational shape (~80%) with room for refinement (~20%).
5. **OUTPUT REQUIREMENT:** Generate ONLY EXTERIOR VIEWS. Photorealistic quality, cinematic lighting. The exterior should be a faithful 3D representation of the floor plan's geometry (~80% fidelity) with intelligent architectural refinements (~20%).

${params.negativePrompt ? `\n**NEGATIVE PROMPT / AVOID:**\nThe following elements MUST NOT appear in the generated image:\n${params.negativePrompt}\n\nStrictly avoid these elements. If any of these are present in the generated image, it will be considered incorrect.` : ''}

${params.artDirection ? `\n**ART DIRECTION:**\n${params.artDirection}` : ''}
`.trim();

    console.log("Generated Multimodal Prompt:", fullPrompt);

    // --- Step 4: Generate Image (Multimodal Call) ---
    const imageGenerationParts: any[] = [{ text: fullPrompt }];

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
      model: "gemini-3-pro-image-preview",
      contents: [{ parts: imageGenerationParts }],
      config: {
        tools: [{ googleSearch: {} }],
        imageConfig: {
          aspectRatio: params.renderAspectRatio || "16:9",
          imageSize: params.renderOutputResolution || "4K"
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
    const imagePart = parts?.find(part => part.inlineData);
    
    if (!imagePart || !imagePart.inlineData) {
      throw new Error("No image data found in response");
    }

    const imageBase64 = imagePart.inlineData.data;
    const mimeType = imagePart.inlineData.mimeType || "image/png";
    const imageUrl = `data:${mimeType};base64,${imageBase64}`;

    return NextResponse.json({ imageUrl });

  } catch (error: unknown) {
    console.error("API Error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
