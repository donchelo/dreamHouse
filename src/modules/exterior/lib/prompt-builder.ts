import { DreamHouseParams } from '@/types';

const PROJECT_TYPE_MAP: Record<string, string> = {
  "Apartamento/Penthouse": "penthouse apartment",
  "Biblioteca": "library",
  "Casa unifamiliar": "single-family house",
  "Centro cultural": "cultural center",
  "Clínica/Hospital": "medical clinic",
  "Edificio educativo": "educational building",
  "Edificio residencial": "residential building",
  "Hotel boutique": "boutique hotel",
  "Hotel resort": "resort hotel",
  "Mixed-use": "mixed-use building",
  "Museo/Galería": "museum",
  "Oficinas corporativas": "corporate office building",
  "Restaurante/Bar": "restaurant",
  "Retail/Tienda": "retail store",
  "Sauna": "modern sauna and wellness facility",
  "Spa/Wellness": "wellness spa",
  "Teatro/Auditorio": "theater",
  "Villa de lujo": "luxury villa"
};

const VOLUMETRIC_SCALE_MAP: Record<string, string> = {
  "Estate (>1000m²)": "monumental expansive complex",
  "Grande (300-500m²)": "large-scale structure",
  "Mansión (500-1000m²)": "grand-scale extensive massing",
  "Mediana (150-300m²)": "mid-sized architectural volume",
  "Pequeña (50-150m²)": "compact residential-scale structure",
  "Tiny House (<50m²)": "minimal intimate pavilion"
};

const FORM_ORGANIZATION_MAP: Record<string, string> = {
  "Courtyard-centered": "organized around a central contemplative courtyard",
  "Linear/Corridor": "composed of a series of linear, interconnected volumes",
  "Loft-style": "conceived as an expansive open-volume loft with industrial proportions",
  "Open plan": "exhibiting an airy and interconnected spatial organization",
  "Pavilion-style": "designed as a cluster of distinct, site-specific pavilions",
  "Radial/Central": "radiating from a singular central core",
  "Split-level": "distributed across staggered, multi-level volumetric planes",
  "Traditional (zonificado)": "clearly articulated into distinct functional zones",
  "Wing-based": "split into specialized wings for optimized privacy and function"
};

export function buildExteriorPrompt(params: DreamHouseParams): string {
  const projectType = PROJECT_TYPE_MAP[params.projectType] || params.projectType;
  const scaleDesc = VOLUMETRIC_SCALE_MAP[params.size] || "modern structure";
  const organizationDesc = FORM_ORGANIZATION_MAP[params.layoutType] ? `, ${FORM_ORGANIZATION_MAP[params.layoutType]}` : "";

  let prompt = `A photorealistic ${params.cameraAngle || 'eye-level'} architectural photography of a ${scaleDesc} ${projectType}. `;
  
  if (params.city) {
    prompt += `The structure is masterfully integrated into the urban fabric of ${params.city}. `;
  } else {
    prompt += `The project is set within a ${params.environment || 'carefully curated'} environment. `;
  }

  prompt += `The building${organizationDesc}, exhibits a ${params.architecturalStyles.join(' and ')} aesthetic. `;
  
  if (params.levels > 0) {
    prompt += `The massing is articulated across ${params.levels} levels. `;
  }

  if (params.architect.length > 0) {
    prompt += `The composition is inspired by the works of ${params.architect.join(' & ')}. `;
  }

  if (params.materials.length > 0) {
    prompt += `The facade is characterized by ${params.materials.join(', ')}, finished to a ${params.finishLevel} standard. `;
  }

  prompt += `The scene is captured during ${params.timeOfDay} in ${params.season}, with ${params.lighting} lighting. `;
  
  prompt += `Technical: ${params.cameraPreset}, lens ${params.focalLength}, aperture ${params.aperture}, film simulation ${params.filmSimulation}. `;

  if (params.artDirection) {
    prompt += `\nCreative Direction: ${params.artDirection}. `;
  }

  prompt += `\nQuality goal: Architectural masterpiece, 8k resolution, photorealistic, sharp focus.`;

  prompt += `\nCRITICAL COMPOSITION RULE: The building is the SOLE PROTAGONIST of this image. The background must be neutral — open sky, landscape, vegetation, or abstract environment. NEVER include neighboring buildings, adjacent houses, other structures, or visible neighbors in the background. No urban density, no party walls, no competing architecture. The subject must stand alone.`;

  return prompt.trim();
}
