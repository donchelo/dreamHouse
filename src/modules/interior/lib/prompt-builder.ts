import { DreamHouseParams } from '@/types';

const ROOM_MAP: Record<string, string> = {
  "Baño principal": "a luxurious master bathroom sanctuary",
  "Biblioteca/Estudio": "a sophisticated private library and study",
  "Cocina gourmet": "a state-of-the-art gourmet kitchen",
  "Comedor formal": "an elegant formal dining room",
  "Cuarto de juegos": "a vibrant and spacious playroom",
  "Dormitorio principal": "a serene master bedroom suite",
  "Gimnasio privado": "a high-end private home gym",
  "Home Cinema": "a professional-grade home cinema",
  "Pasillo/Galería": "a dramatic architectural gallery hallway",
  "Recibidor/Entryway": "a grand and welcoming entryway",
  "Sala de estar/Living room": "a breathtaking expansive living room",
  "Terraza/Deck interior": "a seamless indoor-outdoor terrace",
  "Vestidor/Walk-in closet": "a bespoke luxury walk-in closet"
};

const FURNITURE_MAP: Record<string, string> = {
  "Bespoke / Hecho a medida": "bespoke custom-crafted furniture",
  "Bohemio": "eclectic bohemian furnishings",
  "Clásico/Tradicional": "timeless classical furniture pieces",
  "Diseño de autor (Iconic Designers)": "iconic designer furniture and high-end curated pieces",
  "Escandinavo": "clean-lined Scandinavian furniture",
  "Industrial": "raw industrial-style furnishings",
  "Maximalista": "bold maximalist interior decor",
  "Mid-Century Modern": "authentic mid-century modern furniture",
  "Minimalista": "restrained minimalist furniture",
  "Rústico moderno": "warm modern rustic furnishings"
};

const INTERIOR_LIGHTING_MAP: Record<string, string> = {
  "Candelabro/Lámpara colgante": "a dramatic statement chandelier",
  "Iluminación de riel (Track lighting)": "discreet architectural track lighting",
  "Iluminación indirecta (Cove lighting)": "soft atmospheric cove lighting",
  "Lámparas de pie/diseño": "curated designer floor lamps",
  "LED empotrados (Recessed)": "precision recessed LED spots",
  "Luz natural cenital (Skylight)": "abundant natural light from a monumental skylight",
  "Luz natural lateral (Grandes ventanales)": "flooded with natural light through floor-to-ceiling windows"
};

function getRoomScaleDesc(m2: number): string {
  if (!m2 || m2 <= 0) return "";
  if (m2 < 10) return `an intimate ${m2}m² micro-space`;
  if (m2 < 20) return `a compact ${m2}m² room`;
  if (m2 < 35) return `a well-proportioned ${m2}m² room`;
  if (m2 < 60) return `a generous ${m2}m² space`;
  if (m2 < 100) return `a spacious ${m2}m² living area`;
  return `a grand ${m2}m² expansive space`;
}

export function buildInteriorPrompt(params: DreamHouseParams): string {
  const roomDesc = ROOM_MAP[params.roomType] || "a beautifully designed interior space";
  const scaleDesc = getRoomScaleDesc(params.roomSizeM2);

  // Narrative opening — position the viewer inside the space
  let prompt = `An architectural interior photograph taken inside ${roomDesc}${scaleDesc ? ` — ${scaleDesc}` : ""}. `;

  prompt += `The space carries a ${params.architecturalStyles.join(' and ')} character`;
  if (params.architect.length > 0) {
    prompt += `, shaped by the design principles of ${params.architect.join(' & ')}`;
  }
  prompt += `. `;

  if (params.furnitureStyle.length > 0) {
    prompt += `Every object in the room is ${params.furnitureStyle.map(s => FURNITURE_MAP[s] || s).join(' and ')} — `;
    prompt += `each piece sits with the physical weight of a real object: surfaces show natural material variation, `;
    prompt += `subtle wear at edges and contact points, and the honest craft marks that separate handmade from digital. `;
  }

  if (params.interiorLighting.length > 0) {
    prompt += `The room is illuminated by ${params.interiorLighting.map(l => INTERIOR_LIGHTING_MAP[l] || l).join(', complemented by ')}. `;
    prompt += `Light falls with natural gradient and fall-off — bright at source, dissolving into soft shadow — `;
    prompt += `revealing surface depth, material texture, and the three-dimensional volume of every form. `;
  }

  // Materials with physical specificity
  prompt += `The floor is ${params.flooringMaterial} — its grain, joint lines, and surface sheen are physically convincing. `;
  prompt += `The ceiling is ${params.ceilingDetail}, its material presence confirmed by subtle shadow and texture. `;

  if (params.materials.length > 0) {
    prompt += `Throughout the space: ${params.materials.join(', ')} — each rendered with honest texture, `;
    prompt += `natural color variation across the surface, and the controlled micro-imperfections `;
    prompt += `(pore structure, grain direction, slight tonal shifts) that distinguish real material from a smooth CGI simulation. `;
  }

  prompt += `Color palette: ${params.colorPalette.join(' and ')}, rendered as pigment and light interact physically — `;
  prompt += `colors shift subtly across planes as light angle changes. `;

  // Camera integrated naturally into the scene
  prompt += `Shot with ${params.cameraPreset}, ${params.focalLength} lens at ${params.aperture}, ${params.filmSimulation} — `;
  prompt += `depth of field separates foreground objects from a naturally softened background. `;

  if (params.artDirection) {
    prompt += `\nCreative Direction: ${params.artDirection}. `;
  }

  // Quality instruction: specific realism criteria, not generic tags
  prompt += `\nThe image must feel like a photograph, not a render: imperfect enough to be believed, `;
  prompt += `lit well enough to be aspirational. No plastic surfaces, no over-sharpened edges, `;
  prompt += `no uniform smoothness on any material. Shadows have soft gradient fall-off. `;
  prompt += `Every surface has physical weight and tactile presence.`;

  return prompt.trim();
}
