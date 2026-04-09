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

export function buildInteriorPrompt(params: DreamHouseParams): string {
  const roomDesc = ROOM_MAP[params.roomType] || "a beautifully designed interior space";
  
  let prompt = `A professional architectural interior photography of ${roomDesc}. `;

  prompt += `The space exhibits a ${params.architecturalStyles.join(' and ')} aesthetic, `;
  
  if (params.architect.length > 0) {
    prompt += `with a design language inspired by ${params.architect.join(' & ')}. `;
  }

  if (params.furnitureStyle.length > 0) {
    prompt += `The room is furnished with ${params.furnitureStyle.map(s => FURNITURE_MAP[s] || s).join(', ')}. `;
  }

  if (params.interiorLighting.length > 0) {
    prompt += `Lighting: ${params.interiorLighting.map(l => INTERIOR_LIGHTING_MAP[l] || l).join(' and ')}. `;
  }

  prompt += `The floor is finished in ${params.flooringMaterial}, complemented by a ${params.ceilingDetail} ceiling. `;
  
  if (params.materials.length > 0) {
    prompt += `Materials include a mix of ${params.materials.join(', ')}. `;
  }

  prompt += `Palette: ${params.colorPalette.join(' and ')}. `;
  
  prompt += `Technical: ${params.cameraPreset}, lens ${params.focalLength}, aperture ${params.aperture}, film simulation ${params.filmSimulation}. `;

  if (params.artDirection) {
    prompt += `\nCreative Direction: ${params.artDirection}. `;
  }

  prompt += `\nQuality goal: Interior design masterpiece, 8k resolution, photorealistic.`;

  return prompt.trim();
}
