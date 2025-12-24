import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { DreamHouseParams, FloorPlan } from '@/types';
import { generateFloorPlan, generateFloorPlanImage } from '@/lib/floor-plan-engine';

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
    const mode = (formData.get('mode') as string) || 'render'; // 'floor-plan' | 'render'
    const floorPlanDataJson = formData.get('floorPlanData') as string | null;

    if (!paramsJson) {
      return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
    }

    const params: DreamHouseParams = JSON.parse(paramsJson);
    
    // Parse floor plan data if provided (for render mode)
    let floorPlanData: FloorPlan | null = null;
    if (floorPlanDataJson) {
      try {
        floorPlanData = JSON.parse(floorPlanDataJson);
      } catch (e) {
        console.error("Error parsing floorPlanData:", e);
      }
    }

    // --- Step 1: Analyze References, Lot & Floor Plan (if any) ---
    let analysisResult = "";
    let floorPlanAnalysis = "";
    
    if (files.length > 0 || lotImage || floorPlanImage) {
      const parts = [];
      parts.push({ text: "Analiza las siguientes imágenes para preparar un prompt de generación arquitectónica." });

      if (lotImage) {
        const buffer = await lotImage.arrayBuffer();
        const base64Data = Buffer.from(buffer).toString('base64');
        parts.push({ text: "IMAGEN DEL LOTE (Terreno donde construir):" });
        parts.push({
          inlineData: {
            mimeType: lotImage.type,
            data: base64Data
          }
        });
      }

      if (floorPlanImage) {
        const buffer = await floorPlanImage.arrayBuffer();
        const base64Data = Buffer.from(buffer).toString('base64');
        parts.push({ text: "IMAGEN DEL PLANO DE PLANTA (Distribución espacial):" });
        parts.push({
          inlineData: {
            mimeType: floorPlanImage.type,
            data: base64Data
          }
        });
      }

      if (files.length > 0) {
        parts.push({ text: "IMÁGENES DE REFERENCIA (Estilo deseado):" });
        for (const file of files) {
          const buffer = await file.arrayBuffer();
          const base64Data = Buffer.from(buffer).toString('base64');
          parts.push({
            inlineData: {
              mimeType: file.type,
              data: base64Data
            }
          });
        }
      }

      parts.push({ text: "INSTRUCCIONES: 1. Si hay imagen del lote, describe detalladamente su topografía, vegetación y entorno para integrar el diseño en él. 2. Si hay imagen del plano de planta, describe detalladamente la distribución, forma de la casa, zonas y flujo. 3. Si hay referencias, extrae el estilo visual, materiales, colores y atmósfera. 4. Proporciona un resumen conciso combinando estos aspectos (estilo sobre lote siguiendo el plano)." });

      try {
        const analysisResponse = await ai.models.generateContent({
          model: "gemini-3-pro-preview",
          contents: [{ parts }]
        });
        analysisResult = analysisResponse.text || "";
        
        // If floor plan image was provided, extract a specific technical description for the prompt
        if (floorPlanImage) {
            const fpParts = [
                { text: "Eres un experto arquitecto analizando un plano de planta para un renderista 3D. Describe con PRECISIÓN MATEMÁTICA Y ESPACIAL: 1. La huella exacta del edificio (forma geométrica precisa, retranqueos, patios internos, extensiones). 2. La volumetría sugerida (dónde hay dobles alturas según el plano, niveles). 3. La relación de llenos y vacíos (ventanales vs muros ciegos, ubicación exacta de aberturas). 4. Ejes estructurales y muros de carga visibles. 5. Puntos de entrada y circulación principal. Este análisis será el COMANDO PRINCIPAL Y OBLIGATORIO para el motor de render. Sé extremadamente técnico, detallado y específico. La geometría que describes es un LÍMITE ABSOLUTO que no puede ser violado." },
                {
                    inlineData: {
                        mimeType: floorPlanImage.type,
                        data: Buffer.from(await floorPlanImage.arrayBuffer()).toString('base64')
                    }
                }
            ];
            const fpResponse = await ai.models.generateContent({
                model: "gemini-3-pro-preview",
                contents: [{ parts: fpParts }]
            });
            floorPlanAnalysis = fpResponse.text || "";
        }
      } catch (error) {
        console.error("Error analyzing images:", error);
      }
    }

    // --- Step 2: Generate Floor Plan (if not provided) ---
    let floorPlan: FloorPlan;
    
    if (mode === 'floor-plan') {
      // Generate floor plan data
      console.log("Generating floor plan...");
      floorPlan = await generateFloorPlan(params, analysisResult || undefined);
      console.log("Floor plan generated:", {
        shape: floorPlan.shape,
        zones: Object.keys(floorPlan.zones).length,
        description: floorPlan.description.substring(0, 100) + "..."
      });

      // Generate floor plan image
      console.log("Generating floor plan image...");
      const floorPlanImageUrl = await generateFloorPlanImage(floorPlan, params);
      
      return NextResponse.json({ 
        imageUrl: floorPlanImageUrl,
        floorPlanData: floorPlan
      });
    } else {
      // Render mode: use provided floor plan or generate new one
      if (floorPlanData) {
        floorPlan = floorPlanData;
        console.log("Using provided floor plan data");
      } else if (floorPlanImage && floorPlanAnalysis) {
          // If we have an image but no structured data, we create a basic structure
          // so the rest of the prompt construction doesn't fail
          floorPlan = {
              shape: "Custom (from uploaded image)",
              dimensions: { footprint: "Varies", approximateWidth: 0, approximateDepth: 0 },
              description: floorPlanAnalysis,
              zones: { public: [], private: [], exterior: [] },
              circulation: { mainAxis: "Defined by plan", entryPoint: "Defined by plan" },
              interiorExterior: { connectionType: "Direct", glazingStrategy: "Optimized" },
              layoutFeatures: ["Uploaded floor plan"]
          };
          console.log("Using uploaded floor plan image analysis");
      } else {
        console.log("Generating floor plan for render...");
        floorPlan = await generateFloorPlan(params, analysisResult || undefined);
        console.log("Floor plan generated for render");
      }
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

    // Lot specific instruction if present
    const lotInstruction = lotImage 
      ? "CRITICAL: The building MUST be situated in the environment described in the 'Visual Context Analysis' corresponding to the LOT IMAGE. Match the terrain, vegetation, and lighting of the lot exactly."
      : "";

    // Construct the Professional Prompt with Floor Plan - STRICT GEOMETRIC ADHERENCE
    const fullPrompt = `
**ABSOLUTE GEOMETRIC CONSTRAINT - FLOOR PLAN IS THE FOUNDATION**
${floorPlanImage ? `
**MANDATORY: UPLOADED FLOOR PLAN IMAGE IS THE ABSOLUTE LIMIT**
The building you generate MUST be constructed EXACTLY according to the spatial geometry described below. This is NOT a suggestion - it is a structural requirement that cannot be violated.

**FLOOR PLAN GEOMETRY (FROM UPLOADED IMAGE):**
${floorPlanAnalysis}

**STRICT REQUIREMENTS:**
1. The building's footprint MUST match the exact shape and dimensions described in the floor plan analysis.
2. Window and door placements MUST correspond to the openings shown in the plan.
3. The volumetric massing (where walls are, where spaces extend) MUST follow the plan's spatial organization.
4. Any deviations from this geometry are FORBIDDEN. The architectural style is secondary to this geometric constraint.
` : `
**MANDATORY: GENERATED FLOOR PLAN IS THE ABSOLUTE LIMIT**
The building you generate MUST be constructed EXACTLY according to the spatial geometry described below. This is NOT a suggestion - it is a structural requirement that cannot be violated.

**FLOOR PLAN GEOMETRY:**
- **Shape:** ${floorPlan.shape} - This exact shape MUST be visible in the exterior view
- **Footprint:** ${floorPlan.dimensions.footprint} (${floorPlan.dimensions.approximateWidth} × ${floorPlan.dimensions.approximateDepth})
- **Spatial Organization:** ${floorPlan.description}
- **Zones Distribution:** 
  * Public: ${floorPlan.zones.public.join(", ")}
  * Private: ${floorPlan.zones.private.join(", ")}
  * Exterior: ${floorPlan.zones.exterior.join(", ")}
- **Circulation Pattern:** ${floorPlan.circulation.mainAxis} flow with entry at ${floorPlan.circulation.entryPoint}
- **Interior-Exterior Connection:** ${floorPlan.interiorExterior.connectionType} - ${floorPlan.interiorExterior.glazingStrategy}
- **Key Architectural Features:** ${floorPlan.layoutFeatures.join(", ")}

**STRICT REQUIREMENTS:**
1. The building's exterior form MUST reflect the ${floorPlan.shape.toLowerCase()} shape described above.
2. Window and opening placements MUST align with the ${floorPlan.interiorExterior.glazingStrategy.toLowerCase()} strategy.
3. The volumetric massing MUST correspond to the zones and circulation described.
4. The entry point MUST be at ${floorPlan.circulation.entryPoint} as specified.
5. Any deviations from this geometry are FORBIDDEN. The architectural style is secondary to this geometric constraint.
`}

**ROLE & OBJECTIVE**
Act as a world-renowned architectural photographer (e.g., Iwan Baan, Julius Shulman). 
Generate an AWARD-WINNING EXTERIOR PHOTOGRAPH of a residential project.
**VIEW:** EXTERIOR ONLY. Never generate interior views.

**VISUAL & ARTISTIC OVERLAY (SECONDARY TO GEOMETRY)**
- **Project Type:** ${projectType} ${locationStr}
- **Architectural Style:** ${archStyle} ${architects ? `(inspired by ${architects})` : ''}
- **Scale/Layout:** ${techSpecs}
- **Materials:** ${materialsList}
- **Color Palette:** ${colors}
- **Finish Level:** ${finish}
- **Atmosphere/Mood:** ${moodDesc}

**SITE & ENVIRONMENT**
- **Setting:** ${environment}
- **Landscaping:** ${landscaping}
${lotInstruction ? `- **LOT INTEGRATION:** ${lotInstruction}` : ''}
${analysisResult ? `- **REFERENCE STYLE:** Incorporate these visual elements: ${analysisResult}` : ''}

**PHOTOGRAPHY CONFIGURATION**
- **Camera Settings:** ${camera}
- **Human Scale:** ${params.humanContext !== "Sin personas" ? params.humanContext : "None, focus on architecture"}
- **Quality:** Photorealistic, highly detailed, cinematic lighting, architectural visualization masterpiece, sharp focus.

**ART DIRECTION & VISUAL STYLE (APPLIED WITHIN GEOMETRIC CONSTRAINTS)**
${params.artDirection ? `\n**ART DIRECTION:**\n${params.artDirection}\n\nThis art direction should be applied while strictly maintaining the floor plan geometry described above.` : ''}

**FINAL DIRECTIVE - PRIORITY ORDER**
1. **PRIMARY (MANDATORY):** The building MUST exactly match the floor plan geometry described above. The ${floorPlanImage ? 'uploaded floor plan' : floorPlan.shape.toLowerCase() + ' shape'} is the foundation that cannot be altered.
2. **SECONDARY:** Apply the architectural style, materials, and visual elements within the geometric constraints.
3. **TERTIARY:** Integrate with the site environment and apply photography settings.

The final image must be a cohesive, photorealistic exterior shot with perfect perspective correction and lighting. The entire building should be visible within the frame. The exterior MUST clearly and accurately reflect the floor plan geometry as the absolute structural limit.
    `.trim();

    console.log("Generated Prompt:", fullPrompt);

    // --- Step 4: Generate Image ---
    const generationResponse = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: [{ parts: [{ text: fullPrompt }] }],
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
