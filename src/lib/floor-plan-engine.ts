// ============================================
// FLOOR PLAN ENGINE
// ============================================
// Este módulo genera una imagen de planta arquitectónica
// basado en los parámetros del usuario e imágenes de referencia.

import { GoogleGenAI, Part, ThinkingLevel } from '@google/genai';
import { DreamHouseParams } from '@/types';

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
 * Genera una imagen de floor plan arquitectónico basado en los parámetros del usuario
 * @param params - Parámetros del proyecto DreamHouse
 * @param imageParts - Partes de imagen opcionales (inspiración, lote, referencias) para contexto multimodal
 * @param apiKey - Gemini API Key proporcionada por el usuario
 * @returns URL de la imagen generada (base64 data URL)
 */
export async function generateFloorPlan(
  params: DreamHouseParams,
  imageParts: Part[] = [],
  apiKey?: string
): Promise<string> {
  try {
    if (!apiKey) {
      throw new Error("API Key is required for floor plan generation.");
    }

    const ai = new GoogleGenAI({ apiKey });
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
    
    // Check if there's an inspiration image (should be the first image part)
    const hasInspirationImage = imageParts.length > 0;
    
    const floorPlanPrompt = `
**ROLE:** Act as a professional architectural illustrator specializing in technical floor plan visualizations.

**TASK:** Generate a professional architectural floor plan visualization based on the following design specifications.

${hasInspirationImage ? `
**CRITICAL: INSPIRATION IMAGE PROVIDED (NON-NEGOTIABLE GEOMETRIC TRUTH)**
An inspiration image has been attached as the FIRST image. This image is the ABSOLUTE GEOMETRIC AUTHORITY for the floor plan's shape and form.

**MANDATORY INSTRUCTIONS:**
1. **TRACE THE OUTLINE:** You MUST trace the exact perimeter, silhouette, and overall shape shown in the inspiration image. The building's footprint MUST match the outline in the image precisely.
2. **GEOMETRIC PRIORITY:** The inspiration image is the NON-NEGOTIABLE geometric truth. If there is ANY conflict between the image shape and any textual description (such as "L-Shape", "Rectangular", "U-Shape", etc.), you MUST IGNORE the text and follow the image shape EXACTLY.
3. **FILL WITHIN THE CONTOUR:** Distribute all rooms, spaces, and functional requirements INSIDE the traced outline. Do not modify the outer perimeter to accommodate interior spaces - instead, adapt the interior layout to fit within the fixed contour.
4. **PRESERVE SHAPE CHARACTERISTICS:** Maintain the specific angles, curves, protrusions, recesses, and any unique geometric features visible in the inspiration image. These are part of the user's vision and must be preserved.

The inspiration image defines the building's FORM. Your task is to organize the FUNCTIONAL REQUIREMENTS within that fixed form.
` : ''}

**PROJECT CONTEXT:**
${projectType ? `- **Project Type:** ${projectType}` : ''}
${params.size ? `- **Size:** ${params.size}${avgSize ? ` (approximately ${avgSize}m² total)` : ''}` : ''}
${params.levels > 0 ? `- **Levels:** ${params.levels} floor(s)` : ''}
${params.layoutType ? `- **Layout Type:** ${params.layoutType}` : ''}
${params.bedrooms > 0 ? `- **Bedrooms:** EXACTLY ${params.bedrooms}` : ''}
${params.bathrooms > 0 ? `- **Bathrooms:** EXACTLY ${params.bathrooms}` : ''}
${params.parkingSpots > 0 ? `- **Parking Spots:** EXACTLY ${params.parkingSpots}` : ''}
${params.kitchenType ? `- **Kitchen Type:** ${params.kitchenType}` : ''}
${params.livingAreaType ? `- **Living Area Type:** ${params.livingAreaType}` : ''}
${params.socialAreas.length > 0 ? `- **Social Areas:** ${params.socialAreas.join(", ")}` : ''}
${archStyle ? `- **Architectural Style:** ${archStyle}${architects ? ` (inspired by ${architects})` : ''}` : architects ? `- **Inspired by:** ${architects}` : ''}
${params.materials.length > 0 ? `- **Materials:** ${params.materials.join(", ")}` : ''}
${[params.environment, params.climate].filter(Boolean).join(", ") ? `- **Environment:** ${[params.environment, params.climate].filter(Boolean).join(", ")}` : ''}
${params.city ? `- **Location:** ${params.city}` : ''}
${params.exteriorElements.length > 0 ? `- **Exterior Elements:** ${params.exteriorElements.join(", ")}` : ''}
${params.architecturalDetails && params.architecturalDetails.length > 0 ? `- **Architectural Details:** ${params.architecturalDetails.join(", ")}` : ''}
${params.technicalNotes ? `- **Technical Notes:** ${params.technicalNotes}` : ''}
${imageParts.length > 1 ? `- **Additional Visual Context:** Additional reference images and lot images are attached. Use these to inform material choices, context, and architectural style details.` : ''}
${imageParts.length === 1 && !hasInspirationImage ? `- **Visual Context:** Reference images are attached. Use these images to inform the design: analyze the terrain, context, and architectural style references to create a floor plan that integrates with the site and follows the visual language of the reference images.` : ''}

**DESIGN REQUIREMENTS:**

${(params.bedrooms > 0 || params.bathrooms > 0 || params.parkingSpots > 0 || params.levels > 0) ? `
**ROOM COUNT (NON-NEGOTIABLE — READ BEFORE DRAWING):**
The following counts are ABSOLUTE. The final floor plan MUST contain EXACTLY these numbers — not one more, not one fewer:
${params.levels > 0 ? `- FLOORS: **${params.levels}** — show each floor as a separate labeled plan view` : ''}
${params.bedrooms > 0 ? `- BEDROOMS: **${params.bedrooms}** — label each one ("Bedroom 1", "Bedroom 2", ...)` : ''}
${params.bathrooms > 0 ? `- BATHROOMS: **${params.bathrooms}** — label each one ("Bathroom 1", "Bathroom 2", ...)` : ''}
${params.parkingSpots > 0 ? `- PARKING SPACES: **${params.parkingSpots}** — clearly shown and labeled in the plan` : ''}

Before generating, count your rooms: if the total does not match exactly, redesign the layout until it does.
` : ''}
${hasInspirationImage ? `
**GEOMETRIC CONSTRAINT (HIGHEST PRIORITY):**
The inspiration image attached as the FIRST image defines the EXACT shape and footprint of the building. This is NON-NEGOTIABLE.

**WORKFLOW:**
1. First, trace the exact outline from the inspiration image - this becomes the fixed perimeter.
2. Then, distribute all functional requirements (bedrooms, bathrooms, kitchen, living areas, etc.) INSIDE this fixed perimeter.
3. If the specified layout type (${params.layoutType}) conflicts with the image shape, IGNORE the layout type text and follow the image shape. The image shape takes absolute precedence.
4. Adapt room sizes and arrangements to fit within the traced contour while maintaining functionality and accessibility standards.

The floor plan MUST match the inspiration image's shape exactly. All interior spaces must be organized within that fixed geometric boundary.
` : params.layoutType ? `Design a functional and architecturally coherent floor plan following a ${params.layoutType} layout approach.` : 'Design a functional and architecturally coherent floor plan.'}

**FUNDAMENTAL DESIGN PRINCIPLES (MANDATORY):**

**A. FENG SHUI PRINCIPLES:**
The floor plan MUST incorporate traditional Feng Shui principles for optimal energy flow and harmony:
- **Chi Flow Optimization:** Design the layout to allow smooth, unobstructed flow of positive energy (Chi) throughout all spaces. Avoid dead-end corridors and sharp angles that create "poison arrows" (sha chi).
- **Strategic Positioning:**
  - Main entrance should be welcoming and well-lit, positioned to receive positive energy.
  - Kitchen (fire element) should not be directly opposite the main entrance or bedroom doors.
  - Master bedroom should be positioned in a commanding position (not directly aligned with entrance or bathroom).
  - Bathrooms should not be placed in the center of the house or directly facing the main entrance.
- **Bagua Map Consideration:** Distribute functions according to the Bagua map when possible.
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

**VISUALIZATION REQUIREMENTS:**
- Create a professional architectural floor plan visualization
- Style: Modern technical drawing with clean lines, or 3D isometric view showing the layout
- Include room labels, dimensions, and circulation paths
- Use architectural drawing conventions (walls, doors, windows, furniture outlines)
- Color scheme: Professional blueprints style (white/light background with dark lines) OR modern 3D visualization with subtle colors
- Include scale reference and north arrow if applicable
- Make it clear and readable, suitable for architectural presentation
${params.levels > 0 ? `- Show all ${params.levels} floor(s) as separate labeled plan views` : ''}
- The floor plan should clearly show the spatial organization, circulation flow, and key features

${(params.bedrooms > 0 || params.bathrooms > 0 || params.parkingSpots > 0 || params.levels > 0) ? `
**FINAL VERIFICATION (BEFORE RENDERING):**
Count every labeled room in your plan. The image is only correct if it shows:
${params.levels > 0 ? `- Exactly ${params.levels} floor plan view(s)` : ''}
${params.bedrooms > 0 ? `- Exactly ${params.bedrooms} labeled bedroom(s)` : ''}
${params.bathrooms > 0 ? `- Exactly ${params.bathrooms} labeled bathroom(s)` : ''}
${params.parkingSpots > 0 ? `- Exactly ${params.parkingSpots} labeled parking space(s)` : ''}
If any count is off, adjust the layout — do not generate an incorrect plan.
` : ''}

**OUTPUT:**
Generate a high-quality architectural floor plan visualization that clearly communicates the spatial organization, circulation flow, and key features described above.
`;

    // Build parts array with text prompt and any image parts
    const parts: Part[] = [{ text: floorPlanPrompt }];
    parts.push(...imageParts);

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
      contents: [{ parts }],
      config: {
        tools: [
          {
            googleSearch: {}
          }
        ],
        imageConfig: {
          ...(params.fpAspectRatio ? { aspectRatio: params.fpAspectRatio } : {}),
          ...(params.fpOutputResolution ? { imageSize: params.fpOutputResolution } : {})
        },
        ...(params.thinkingLevel === "High" ? {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
            includeThoughts: true
          }
        } : {})
      }
    });

    // Extract image data
    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No image candidates returned for floor plan");
    }

    const firstCandidate = candidates[0];
    const responseParts = firstCandidate?.content?.parts;
    const imagePart = responseParts?.find((part: Part) => part.inlineData);
    
    if (!imagePart || !imagePart.inlineData) {
      throw new Error("No image data found in floor plan response");
    }

    const imageBase64 = imagePart.inlineData.data;
    const mimeType = imagePart.inlineData.mimeType || "image/png";
    const imageUrl = `data:${mimeType};base64,${imageBase64}`;

    return imageUrl;
    
  } catch (error) {
    console.error("Error generating floor plan:", error);
    throw error;
  }
}


