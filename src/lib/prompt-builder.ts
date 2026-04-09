import { DreamHouseParams } from "@/types";

// Helper to map project types to English for better AI understanding
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

const MOOD_MAP: Record<string, string> = {
  "Acogedor y cálido": "cozy and warm atmosphere",
  "Dramático e impactante": "dramatic and striking atmosphere",
  "Elegante y sofisticado": "elegant and sophisticated atmosphere",
  "Futurista y vanguardista": "futuristic and avant-garde atmosphere",
  "Industrial y raw": "industrial and raw atmosphere",
  "Lujoso y opulento": "luxurious and opulent atmosphere",
  "Minimalista y puro": "minimalist and pure atmosphere",
  "Romántico y nostálgico": "romantic and nostalgic atmosphere",
  "Rústico y orgánico": "rustic and organic atmosphere",
  "Sereno y zen": "serene and zen atmosphere"
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

const STRUCTURE_TYPE_MAP: Record<string, string> = {
  "Apartamento/Penthouse": "residence",
  "Biblioteca": "institution",
  "Casa unifamiliar": "residence",
  "Centro cultural": "civic complex",
  "Clínica/Hospital": "medical facility",
  "Edificio educativo": "facility",
  "Edificio residencial": "residential complex",
  "Hotel boutique": "hospitality project",
  "Hotel resort": "resort complex",
  "Mixed-use": "mixed-use complex",
  "Museo/Galería": "gallery complex",
  "Oficinas corporativas": "corporate headquarters",
  "Restaurante/Bar": "venue",
  "Retail/Tienda": "commercial space",
  "Sauna": "wellness pavilion",
  "Spa/Wellness": "wellness sanctuary",
  "Teatro/Auditorio": "performance venue",
  "Villa de lujo": "private estate"
};

const CAMERA_PRESET_MAP: Record<string, { sensor: string; lens: string; character: string; isFujifilm: boolean }> = {
  "Fujifilm X100 VI": {
    sensor: "APS-C 40.2MP X-Trans CMOS 5 HR",
    lens: "Fujinon 23mm f/2 — 35mm equivalent",
    character: "Documentary warmth, organic film grain, Fujifilm color science. Editorial intimacy for architectural photography.",
    isFujifilm: true,
  },
  "Fujifilm GFX 100S II": {
    sensor: "Medium Format 102MP GFX CMOS",
    lens: "GF 32-64mm f/4 LM WR — 25-51mm equiv.",
    character: "Extreme medium-format detail, natural tonal range, luxury editorial for premium architectural projects.",
    isFujifilm: true,
  },
  "Hasselblad X2D 100C": {
    sensor: "Medium Format 100MP BSI CMOS",
    lens: "XCD 21mm f/2.8 — 17mm equiv.",
    character: "Swedish engineering, natural soft bokeh, absolute color precision. The definition of photographic luxury.",
    isFujifilm: false,
  },
  "Phase One IQ4 150MP": {
    sensor: "Medium Format 150MP 16-bit CMOS",
    lens: "Schneider Kreuznach 28mm LS f/4.5",
    character: "Maximum technical detail, 16-bit color depth, studio-grade standard for large-format architectural print.",
    isFujifilm: false,
  },
  "Sony A7R V": {
    sensor: "Full-frame 61MP BSI-CMOS",
    lens: "SEL 16-35mm f/2.8 GM II",
    character: "High dynamic range, natural and neutral color reproduction, versatile for all framing conditions.",
    isFujifilm: false,
  },
  "Leica M11": {
    sensor: "Full-frame 60MP BSI-CMOS",
    lens: "Summicron-M 28mm f/2 ASPH",
    character: "Clinical rangefinder precision, characteristic Leica glass rendering, artistic documentary aesthetic.",
    isFujifilm: false,
  },
  "Canon EOS R5 II": {
    sensor: "Full-frame 45MP CMOS",
    lens: "RF 15-35mm f/2.8 L IS USM",
    character: "Natural Canon color, balanced and reliable, professional solution for commercial and residential architecture.",
    isFujifilm: false,
  },
  "Nikon Z8": {
    sensor: "Full-frame 45.7MP BSI-CMOS Stacked",
    lens: "NIKKOR Z 17-28mm f/2.8",
    character: "Exceptional dynamic range, faithful neutral color, for technically demanding architectural projects.",
    isFujifilm: false,
  },
};

/**
 * Builds a rich, narrative prompt for Nano Banana 2 based on user parameters.
 */
export function buildNarrativePrompt(params: DreamHouseParams): string {
  const projectType = PROJECT_TYPE_MAP[params.projectType] || params.projectType;
  const moodDesc = MOOD_MAP[params.mood] || params.mood;
  const validArchitects = Array.isArray(params.architect)
    ? params.architect.filter(a => a !== "Sin arquitecto específico")
    : [];

  // 1. Core Scene Establishment & Architectural Identity
  const scaleDesc = VOLUMETRIC_SCALE_MAP[params.size] || "modern structure";
  const structureTerm = STRUCTURE_TYPE_MAP[params.projectType] || "building";
  const organizationDesc = FORM_ORGANIZATION_MAP[params.layoutType] ? `, ${FORM_ORGANIZATION_MAP[params.layoutType]}` : "";

  let prompt = `A photorealistic ${params.cameraAngle || 'eye-level'} architectural photography of a ${scaleDesc} ${projectType}. `;
  
  if (params.city) {
    prompt += `The structure is masterfully integrated into the urban and cultural fabric of ${params.city}. `;
  } else {
    prompt += `The project is set within a ${params.environment || 'carefully curated'} environment. `;
  }

  // 2. Volumetry, Form & Style
  prompt += `The ${structureTerm}${organizationDesc}, exhibits a ${params.architecturalStyles.join(' and ')} aesthetic. `;
  
  if (params.levels > 0) {
    prompt += `The massing is articulated across ${params.levels} levels, providing a clear volumetric hierarchy. `;
  }

  if (validArchitects.length > 0) {
    prompt += `The composition draws direct inspiration from the works of ${validArchitects.join(' & ')}, emphasizing their signature approach to geometry and form. `;
  }

  if (params.roofType) {
    prompt += `It features a distinctive ${params.roofType} roof that defines its silhouette. `;
  }

  // 3. Materiality & Texture
  if (params.materials.length > 0) {
    prompt += `The facade is characterized by a sophisticated play of ${params.materials.join(', ')}, `;
    if (params.finishLevel) {
      prompt += `finished to a ${params.finishLevel} standard. `;
    } else {
      prompt += `showing exquisite architectural craftsmanship. `;
    }
  }

  if (params.architecturalDetails.length > 0) {
    prompt += `Key architectural details include ${params.architecturalDetails.join(', ')}, which add depth and rhythm to the composition. `;
  }

  // 4. Color & Landscape
  if (params.colorPalette.length > 0) {
    prompt += `The palette is dominated by ${params.colorPalette.join(' and ')} tones, creating a ${moodDesc}. `;
  }

  if (params.vegetation.length > 0 || params.exteriorElements.length > 0) {
    prompt += `The surrounding landscape is meticulously designed with ${params.vegetation.join(', ')} `;
    if (params.exteriorElements.length > 0) {
      prompt += `and features high-end elements like a ${params.exteriorElements.join(', ')}. `;
    }
    prompt += `. `;
  }

  // 5. Lighting & Atmosphere
  prompt += `The scene is captured during the ${params.timeOfDay || 'golden hour'} of ${params.season || 'a clear day'}, `;
  if (params.weatherCondition) {
    prompt += `under ${params.weatherCondition} conditions. `;
  }
  
  if (params.lighting) {
    prompt += `Atmospheric ${params.lighting} accentuates the building's volumes and textures. `;
  }

  // 6. Photographic Specifications (Leveraging the docs' advice on camera terms)
  const cameraSpec = params.cameraPreset ? CAMERA_PRESET_MAP[params.cameraPreset] : null;
  if (cameraSpec) {
    prompt += `Photographed with a ${params.cameraPreset} (${cameraSpec.sensor}), using a ${params.focalLength || cameraSpec.lens}. `;
    prompt += `The image shows ${cameraSpec.character} `;
    if (params.aperture) prompt += `at ${params.aperture}. `;
    if (params.filmSimulation) prompt += `Film simulation applied: ${params.filmSimulation}. `;
  } else if (params.focalLength || params.aperture) {
    prompt += `Shot with a professional camera system at ${params.focalLength || '35mm'} and ${params.aperture || 'f/8'}. `;
  }

  if (params.composition) {
    prompt += `The composition follows a ${params.composition} rule, `;
  }
  prompt += `resulting in an award-winning architectural visual. `;

  // 7. Human Context
  if (params.humanContext) {
    prompt += `Subtle ${params.humanContext} is visible to provide scale and a sense of life to the architecture. `;
  }

  // 8. Technical Directives
  if (params.technicalNotes || params.artDirection) {
    prompt += `\nCreative Direction: ${[params.technicalNotes, params.artDirection].filter(Boolean).join('. ')}. `;
  }

  // 9. Negative Constraints (Implicitly handled by model, but we can add subtle emphasis)
  if (params.negativePrompt) {
    prompt += `\nStrictly avoid: ${params.negativePrompt}. `;
  }

  // 10. Summary & Quality Hooks
  prompt += `\nQuality goal: Architectural masterpiece, 8k resolution, photorealistic, cinematic lighting, sharp focus on materials and structural lines.`;

  return prompt.trim();
}
