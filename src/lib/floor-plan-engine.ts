// ============================================
// FLOOR PLAN ENGINE
// ============================================
// Este módulo genera un diseño de planta arquitectónica coherente
// basado en los parámetros del usuario antes de crear el render final.

import { GoogleGenAI } from '@google/genai';
import { DreamHouseParams, FloorPlan } from '@/types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Helper to map project types to English
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

/**
 * Genera un floor plan arquitectónico basado en los parámetros del usuario
 * @param params - Parámetros del proyecto DreamHouse
 * @param visualContextAnalysis - Análisis opcional de imágenes de referencia/lote
 * @returns FloorPlan object con la estructura espacial generada
 */
export async function generateFloorPlan(
  params: DreamHouseParams,
  visualContextAnalysis?: string
): Promise<FloorPlan> {
  try {
    // Construir el prompt para generar el floor plan
    const projectType = PROJECT_TYPE_MAP[params.projectType] || params.projectType;
    const validArchitects = Array.isArray(params.architect) 
      ? params.architect.filter(a => a !== "Sin arquitecto específico")
      : [];
    const architects = validArchitects.length > 0 ? validArchitects.join(" and ") : "";
    const archStyle = params.architecturalStyles.join(", ");
    
    // Extraer tamaño aproximado del string de tamaño
    const sizeMatch = params.size.match(/(\d+)-(\d+)/);
    const minSize = sizeMatch ? parseInt(sizeMatch[1]) : 150;
    const maxSize = sizeMatch ? parseInt(sizeMatch[2]) : 300;
    const avgSize = Math.floor((minSize + maxSize) / 2);
    
    const floorPlanPrompt = `
**ROLE:** Act as a professional architect specializing in residential design. Your task is to create a coherent floor plan design based on the given parameters.

**PROJECT CONTEXT:**
- **Type:** ${projectType}
- **Size:** ${params.size} (approximately ${avgSize}m² total)
- **Levels:** ${params.levels} floor(s)
- **Layout Type:** ${params.layoutType}
- **Bedrooms:** ${params.bedrooms} (must include exactly this number)
- **Bathrooms:** ${params.bathrooms} (must include exactly this number)
- **Parking Spots:** ${params.parkingSpots} ${params.parkingSpots > 0 ? `(include ${params.parkingSpots} parking space(s) in the design)` : '(no parking required)'}
- **Kitchen Type:** ${params.kitchenType}
- **Living Area Type:** ${params.livingAreaType}
- **Social Areas:** ${params.socialAreas.length > 0 ? params.socialAreas.join(", ") : "None specified"}
- **Architectural Style:** ${archStyle}${architects ? ` (inspired by ${architects})` : ''}
- **Materials:** ${params.materials.join(", ") || "Not specified"}
- **Environment:** ${params.environment}, ${params.climate}
${params.city ? `- **Location:** ${params.city}` : ''}
${params.exteriorElements.length > 0 ? `- **Exterior Elements:** ${params.exteriorElements.join(", ")}` : ''}
${params.technicalNotes ? `- **Technical Notes:** ${params.technicalNotes}` : ''}
${visualContextAnalysis ? `- **Visual Context:** ${visualContextAnalysis}` : ''}

**TASK:**
Design a functional and architecturally coherent floor plan following a ${params.layoutType} layout approach. Consider:
1. **Shape:** What is the overall shape? (Rectangular, L-shaped, U-shaped, C-shaped, Organic, etc.) The shape should support the ${params.layoutType} layout type.
2. **Zones:** Organize spaces into:
   - Public zones (living, dining, ${params.kitchenType} kitchen, etc.)
   - Private zones (EXACTLY ${params.bedrooms} bedrooms and EXACTLY ${params.bathrooms} bathrooms - this is mandatory)
   - Service zones (utility, storage, laundry, etc.)
   - Exterior zones (terraces, gardens${params.socialAreas.includes("Pool/Piscina") ? ", pool area" : ""}${params.socialAreas.includes("BBQ/Grill area") ? ", BBQ area" : ""}, etc.)
   ${params.socialAreas.length > 0 ? `- **Social Areas Required:** ${params.socialAreas.join(", ")} - These must be included in the design` : ''}
   ${params.parkingSpots > 0 ? `- **Parking:** Include ${params.parkingSpots} parking space(s) (garage or covered parking)` : ''}
3. **Circulation:** How do people move through the space? (Linear, Radial, Central, Distributed) The circulation should support the ${params.layoutType} layout.
4. **Interior-Exterior Connection:** How does the interior connect with exterior spaces? Consider the ${params.livingAreaType} living area type.
5. **Layout Features:** The design must follow a ${params.layoutType} approach. Include the requested ${params.kitchenType} kitchen and ${params.livingAreaType} living area.

**FUNDAMENTAL DESIGN PRINCIPLES (MANDATORY):**

**A. FENG SHUI PRINCIPLES:**
The floor plan MUST incorporate traditional Feng Shui principles for optimal energy flow and harmony:
- **Chi Flow Optimization:** Design the layout to allow smooth, unobstructed flow of positive energy (Chi) throughout all spaces. Avoid dead-end corridors and sharp angles that create "poison arrows" (sha chi).
- **Strategic Positioning:**
  - Main entrance should be welcoming and well-lit, positioned to receive positive energy.
  - Kitchen (fire element) should not be directly opposite the main entrance or bedroom doors.
  - Master bedroom should be positioned in a commanding position (not directly aligned with entrance or bathroom).
  - Bathrooms should not be placed in the center of the house or directly facing the main entrance.
- **Bagua Map Consideration:** Distribute functions according to the Bagua map when possible:
  - Wealth/Career area (front center): Living room or study
  - Health/Family area (left center): Dining or family room
  - Knowledge area (front left): Library or quiet space
  - Fame area (front): Entry or prominent space
- **Five Elements Balance:** Ensure representation of the five elements (Wood, Fire, Earth, Metal, Water) through spatial organization and material choices.
- **Avoid Negative Energy:** Eliminate sharp corners pointing at key spaces, avoid long straight corridors, and ensure no direct alignment of doors creating energy conflicts.

**B. UNIVERSAL ACCESSIBILITY STANDARDS (CRITICAL):**
The design MUST be fully accessible for people with reduced mobility. This is NON-NEGOTIABLE:
- **NO STAIRS:** Do NOT use stairs or steps. Instead, use ramps with appropriate slopes (maximum 8-10% gradient) for any level changes. If multiple levels are required, integrate elevators or accessible platform lifts.
- **Wheelchair Accessibility:**
  - All corridors must be minimum 90-120cm wide (preferably 120cm+ for comfortable passage).
  - All doorways must be minimum 80cm wide (preferably 90cm+).
  - Provide turning spaces of at least 150cm diameter at key points (entrances, room transitions).
- **Intelligent Space Distribution:**
  - Eliminate obstacles and create clear, unobstructed pathways throughout.
  - Ensure all rooms are accessible without barriers.
  - Design circulation routes that are logical and require minimal maneuvering.
- **Accessible Bathrooms:**
  - Minimum 150cm diameter clear space for wheelchair rotation.
  - Accessible fixtures with appropriate clearances.
  - Grab bars and support structures integrated into the design.
- **Accessible Kitchen:**
  - Countertops at accessible height (76-86cm) with clear space underneath for wheelchair access.
  - Lowered sections for food preparation.
  - Accessible storage and appliances.
- **Multi-Level Considerations:** If the design includes multiple levels, provide accessible vertical circulation (elevator or platform lift) that connects all floors seamlessly.

${params.technicalNotes ? `\n\n**CRITICAL TECHNICAL REQUIREMENTS:**\n${params.technicalNotes}\n\nThese technical notes are MANDATORY and must be strictly followed in the floor plan design.` : ''}

**CRITICAL: EXTERIOR VOLUMETRICS FOR RENDERING**
The floor plan you generate will be the ABSOLUTE FOUNDATION for a photorealistic exterior render. You MUST think about how the 2D plan translates to 3D volumes that will be visible from the outside. Consider:

1. **Massing Description:** How do the different zones (public, private, services) translate to different building heights or volumes? For example:
   - If public zones have double height, describe how this creates a taller volume in that area
   - If private zones are on upper floors, describe how this creates a stepped or layered massing
   - If there are courtyards or patios, describe how they create voids in the massing

2. **Height Variations:** Specify which zones have different heights (single level, double height, mezzanine, etc.) and how this affects the exterior silhouette

3. **Facade Composition:** Based on the interior-exterior connection strategy, describe how the facade will look:
   - Where are large windows/glass (typically in public zones)?
   - Where are more solid walls (typically in private zones)?
   - How does the glazing strategy affect the visual weight and transparency of different parts of the building?

**OUTPUT FORMAT (JSON):**
Return a JSON object with this exact structure:
{
  "shape": "string describing the overall shape",
  "zones": {
    "public": ["list of public spaces"],
    "private": ["list of private spaces"],
    "services": ["list of service spaces"],
    "exterior": ["list of exterior spaces"]
  },
  "circulation": {
    "mainAxis": "Linear|Radial|Central|Distributed",
    "entryPoint": "description of main entry location",
    "flowDescription": "brief description of circulation flow"
  },
  "interiorExterior": {
    "connectionType": "Open|Semi-open|Controlled|Minimal",
    "mainConnections": ["list of main interior-exterior connections"],
    "glazingStrategy": "description of window/glass strategy"
  },
  "dimensions": {
    "approximateWidth": "estimated width range (e.g., '15-20m')",
    "approximateDepth": "estimated depth range (e.g., '10-15m')",
    "footprint": "estimated footprint (e.g., '150-200m²')"
  },
  "layoutFeatures": ["list of key layout features"],
  "exteriorVolumetrics": {
    "massingDescription": "Detailed description of how the 2D plan translates to 3D building massing, including height variations, stepped volumes, and how different zones create different exterior volumes",
    "heightVariations": ["List of height variations by zone, e.g., 'Public zone: double height (6-7m)', 'Private zone: single level (3m)', etc."],
    "facadeComposition": "Description of how the facade will appear based on interior-exterior connections: where glass dominates, where solid walls are, and how the glazing strategy affects the visual composition"
  },
  "description": "A comprehensive narrative description of the floor plan that explains the spatial organization, flow, and key architectural decisions. This should be 3-5 sentences and written in a way that can be directly used in an architectural visualization prompt."
}

**IMPORTANT:**
- The design must be realistic and functional
- Consider the number of levels specified
- The description should be detailed enough to guide exterior visualization
- Return ONLY valid JSON, no markdown formatting or code blocks
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [{ parts: [{ text: floorPlanPrompt }] }],
      config: {
        responseMimeType: "application/json"
      }
    });

    const responseText = response.text || "";
    
    // Limpiar la respuesta si viene con markdown code blocks
    let cleanedText = responseText.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }
    
    const floorPlanData = JSON.parse(cleanedText) as FloorPlan;
    
    // Validar que tenga la estructura mínima requerida
    if (!floorPlanData.shape || !floorPlanData.zones || !floorPlanData.description) {
      throw new Error("Invalid floor plan structure returned from AI");
    }
    
    // Validar y asegurar que exteriorVolumetrics existe
    if (!floorPlanData.exteriorVolumetrics) {
      // Generar volumetría básica si no viene del AI
      floorPlanData.exteriorVolumetrics = {
        massingDescription: `The ${floorPlanData.shape.toLowerCase()} shape creates a ${params.levels}-level structure with ${floorPlanData.interiorExterior.connectionType.toLowerCase()} interior-exterior connections.`,
        heightVariations: params.levels > 1 
          ? [`Ground floor: public zones with ${floorPlanData.interiorExterior.glazingStrategy.toLowerCase()}`, `Upper floor(s): private zones with more controlled openings`]
          : [`Single level structure with ${floorPlanData.interiorExterior.glazingStrategy.toLowerCase()}`],
        facadeComposition: `${floorPlanData.interiorExterior.glazingStrategy} in public zones, more solid walls in private zones`
      };
    }
    
    return floorPlanData;
    
  } catch (error) {
    console.error("Error generating floor plan:", error);
    
    // Fallback a un floor plan básico si falla la generación
    return getDefaultFloorPlan(params);
  }
}

/**
 * Genera una imagen visual del floor plan (estilo arquitectónico técnico)
 * @param floorPlan - Datos del floor plan generado
 * @param params - Parámetros del proyecto para contexto
 * @returns URL de la imagen generada (base64 data URL)
 */
export async function generateFloorPlanImage(
  floorPlan: FloorPlan,
  params: DreamHouseParams
): Promise<string> {
  try {
    const projectType = PROJECT_TYPE_MAP[params.projectType] || params.projectType;
    
    const floorPlanImagePrompt = `
**ROLE:** Act as a professional architectural illustrator specializing in technical floor plan visualizations.

**TASK:** Generate a professional architectural floor plan visualization based on the following design specifications.

**FLOOR PLAN SPECIFICATIONS:**
- **Project Type:** ${projectType}
- **Shape:** ${floorPlan.shape}
- **Footprint:** ${floorPlan.dimensions.footprint} (${floorPlan.dimensions.approximateWidth} × ${floorPlan.dimensions.approximateDepth})
- **Levels:** ${params.levels} floor(s)
- **Rooms:** ${params.bedrooms} Bedrooms, ${params.bathrooms} Bathrooms
- **Kitchen/Living:** ${params.kitchenType} kitchen, ${params.livingAreaType} living
- **Parking:** ${params.parkingSpots} space(s)
- **Social Areas:** ${params.socialAreas.length > 0 ? params.socialAreas.join(", ") : "Standard layout"}

**SPATIAL ORGANIZATION:**
- **Public Zones:** ${floorPlan.zones.public.join(", ")}
- **Private Zones:** ${floorPlan.zones.private.join(", ")}
- **Service Zones:** ${floorPlan.zones.services.join(", ")}
- **Exterior Zones:** ${floorPlan.zones.exterior.join(", ")}

**CIRCULATION:**
- **Flow Type:** ${floorPlan.circulation.mainAxis}
- **Entry Point:** ${floorPlan.circulation.entryPoint}
- **Description:** ${floorPlan.circulation.flowDescription}

**INTERIOR-EXTERIOR CONNECTION:**
- **Type:** ${floorPlan.interiorExterior.connectionType}
- **Main Connections:** ${floorPlan.interiorExterior.mainConnections.join(", ")}
- **Glazing Strategy:** ${floorPlan.interiorExterior.glazingStrategy}

**KEY FEATURES:** ${floorPlan.layoutFeatures.join(", ")}

**DESIGN DESCRIPTION:**
${floorPlan.description}

**VISUALIZATION REQUIREMENTS:**
- Create a professional architectural floor plan visualization
- Style: Modern technical drawing with clean lines, or 3D isometric view showing the layout
- Include room labels, dimensions, and circulation paths
- Show the ${floorPlan.shape.toLowerCase()} shape clearly
- Use architectural drawing conventions (walls, doors, windows, furniture outlines)
- Color scheme: Professional blueprints style (white/light background with dark lines) OR modern 3D visualization with subtle colors
- Include scale reference and north arrow if applicable
- Make it clear and readable, suitable for architectural presentation
- Show all ${params.levels} level(s) if multi-story (use separate views or stacked layout)

**OUTPUT:**
Generate a high-quality architectural floor plan visualization that clearly communicates the spatial organization, circulation flow, and key features described above.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: [{ parts: [{ text: floorPlanImagePrompt }] }],
      config: {
        tools: [{ googleSearch: {} }],
        imageConfig: {
          aspectRatio: params.fpAspectRatio || "16:9",
          imageSize: params.fpOutputResolution || "2K"
        }
      }
    });

    // Extract image data
    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No image candidates returned for floor plan");
    }

    const firstCandidate = candidates[0];
    const parts = firstCandidate?.content?.parts;
    const imagePart = parts?.find(part => part.inlineData);
    
    if (!imagePart || !imagePart.inlineData) {
      throw new Error("No image data found in floor plan response");
    }

    const imageBase64 = imagePart.inlineData.data;
    const mimeType = imagePart.inlineData.mimeType || "image/png";
    const imageUrl = `data:${mimeType};base64,${imageBase64}`;

    return imageUrl;
    
  } catch (error) {
    console.error("Error generating floor plan image:", error);
    throw error;
  }
}

/**
 * Genera un floor plan por defecto como fallback
 */
function getDefaultFloorPlan(params: DreamHouseParams): FloorPlan {
  const sizeMatch = params.size.match(/(\d+)-(\d+)/);
  const minSize = sizeMatch ? parseInt(sizeMatch[1]) : 150;
  const maxSize = sizeMatch ? parseInt(sizeMatch[2]) : 300;
  const avgSize = Math.floor((minSize + maxSize) / 2);
  const footprint = Math.floor(avgSize / (params.levels || 1));
  
  // Generate bedroom list based on actual count
  const bedrooms = [];
  for (let i = 1; i <= params.bedrooms; i++) {
    if (i === 1 && params.levels >= 2) {
      bedrooms.push(`Master bedroom (upper floor)`);
    } else if (params.levels >= 2) {
      bedrooms.push(`Bedroom ${i} (upper floor)`);
    } else {
      bedrooms.push(i === 1 ? "Master bedroom" : `Bedroom ${i}`);
    }
  }
  
  // Generate bathroom list
  const bathrooms = [];
  for (let i = 1; i <= params.bathrooms; i++) {
    bathrooms.push(i === 1 ? "Master bathroom" : `Bathroom ${i}`);
  }
  
  const exteriorZones = params.exteriorElements.length > 0 
    ? params.exteriorElements.slice(0, 3)
    : ["Front terrace", "Back garden"];
  
  if (params.socialAreas.includes("Pool/Piscina")) {
    exteriorZones.push("Pool area");
  }
  
  return {
    shape: "Rectangular",
    zones: {
      public: ["Living room", "Dining area", params.kitchenType],
      private: bedrooms,
      services: [...bathrooms, "Storage", "Laundry"],
      exterior: exteriorZones
    },
    circulation: {
      mainAxis: params.layoutType === "Open plan" ? "Distributed" : "Linear",
      entryPoint: "Front center",
      flowDescription: params.layoutType === "Open plan" 
        ? "Open flow connecting all zones"
        : "Central corridor connecting public and private zones"
    },
    interiorExterior: {
      connectionType: params.livingAreaType.includes("Conexión directa") ? "Open" : "Semi-open",
      mainConnections: ["Living room to terrace", "Kitchen to garden"],
      glazingStrategy: "Large windows and sliding glass doors"
    },
    dimensions: {
      approximateWidth: "12-18m",
      approximateDepth: "8-12m",
      footprint: `${footprint}m²`
    },
    layoutFeatures: [
      params.layoutType,
      params.livingAreaType,
      params.kitchenType,
      ...params.socialAreas
    ],
    exteriorVolumetrics: {
      massingDescription: `A ${params.levels}-level rectangular structure where the ground floor contains public zones with extensive glazing, creating a transparent base. ${params.levels >= 2 ? "The upper floor(s) contain private bedrooms with more controlled openings, creating a more solid upper mass that contrasts with the open ground floor." : "The single-level structure maintains a uniform height with strategic glazing in public areas."}`,
      heightVariations: params.levels > 1
        ? [
            `Ground floor: Public zones with large windows (3-4m height)`,
            `Upper floor(s): Private zones with standard windows (2.5-3m height per level)`
          ]
        : [`Single level structure with varying window heights based on zone function`],
      facadeComposition: `Large windows and sliding glass doors dominate the public zones (living, dining), creating transparency and connection to exterior. Private zones feature more controlled window placement, creating a rhythm of solid and void. The ${params.levels >= 2 ? "upper floors" : "structure"} present a more solid appearance with strategic openings.`
    },
    description: `A ${params.levels}-level ${params.size.toLowerCase()} with a ${params.layoutType.toLowerCase()} layout and rectangular footprint. The design includes exactly ${params.bedrooms} bedrooms and ${params.bathrooms} bathrooms. The ground floor features a ${params.livingAreaType.toLowerCase()} living and dining area connected to a ${params.kitchenType.toLowerCase()} kitchen, with direct access to exterior terraces. ${params.levels >= 2 ? "The private bedrooms are located on the upper floor(s), ensuring separation between public and private zones." : ""} ${params.parkingSpots > 0 ? `The design includes ${params.parkingSpots} parking space(s).` : ""} The design emphasizes natural light through large windows and maintains a clear circulation axis from the main entrance.`
  };
}

