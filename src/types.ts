// ============================================
// DREAMHOUSE PRO - TYPE DEFINITIONS
// ============================================

export interface DreamHouseParams {
  // Section 1: Project Essence
  projectType: string;
  architecturalStyles: string[];
  architect: string[];
  mood: string;
  
  // Section 2: Context & Location
  city: string;
  climate: string;
  environment: string;
  waterBody: string;
  weatherCondition: string;
  
  // Section 3: Physical Specifications
  size: string;
  levels: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  kitchenType: string;
  livingAreaType: string;
  layoutType: string;
  socialAreas: string[];
  roofType: string;
  materials: string[];
  finishLevel: string;
  architecturalDetails: string[];
  
  // Section 4: Aesthetics & Details
  colorPalette: string[];
  exteriorElements: string[];
  vegetation: string[];
  
  // Section 5: Camera Configuration
  cameraAngle: string;
  composition: string;
  timeOfDay: string;
  season: string;
  lighting: string;
  humanContext: string;
  
  // Section 6: Floor Plan Output Configuration
  fpOutputResolution: string;
  fpAspectRatio: string;
  
  // Section 7: Exterior Output Configuration
  renderOutputResolution: string;
  renderAspectRatio: string;
  
  // Section 8: Technical Notes (for Floor Plan)
  technicalNotes: string;
  
  // Section 9: Art Direction (for Exterior)
  artDirection: string;
  negativePrompt: string;
  thinkingLevel: "Minimal" | "High";

  // Section 10: Interior Design
  roomType: string;
  interiorStyle: string[];
  interiorDesigner: string[];
  furnitureStyle: string;
  interiorLighting: string;
  wallMaterial: string[];
  floorMaterial: string;
}

export const DEFAULT_PARAMS: DreamHouseParams = {
  // Section 1: Project Essence
  projectType: "Casa unifamiliar",
  architecturalStyles: [],
  architect: [],
  mood: "Elegante y sofisticado",
  
  // Section 2: Context & Location
  city: "",
  climate: "Mediterráneo",
  environment: "Suburbana",
  waterBody: "Sin agua cercana",
  weatherCondition: "Despejado/Soleado",
  
  // Section 3: Physical Specifications
  size: "Mediana (150-300m²)",
  levels: 2,
  bedrooms: 3,
  bathrooms: 2,
  parkingSpots: 2,
  kitchenType: "Abierta (Americana)",
  livingAreaType: "Concepto abierto",
  layoutType: "Open plan",
  socialAreas: [],
  roofType: "Plano",
  materials: [],
  finishLevel: "Premium/Alto",
  architecturalDetails: [],
  
  // Section 4: Aesthetics & Details
  colorPalette: [],
  exteriorElements: [],
  vegetation: [],
  
  // Section 5: Camera Configuration
  cameraAngle: "3/4 frontal",
  composition: "Regla de tercios",
  timeOfDay: "Atardecer (Golden Hour)",
  season: "Verano",
  lighting: "Golden hour cálida",
  humanContext: "Sin personas",
  
  // Section 6: Floor Plan Output Configuration
  fpOutputResolution: "2K",
  fpAspectRatio: "16:9",
  
  // Section 7: Exterior Output Configuration
  renderOutputResolution: "4K",
  renderAspectRatio: "16:9",
  
  // Section 8: Technical Notes (for Floor Plan)
  technicalNotes: "",
  
  // Section 9: Art Direction (for Exterior)
  artDirection: "",
  negativePrompt: "",
  thinkingLevel: "Minimal",

  // Section 10: Interior Design
  roomType: "Sala de estar (Living Room)",
  interiorStyle: [],
  interiorDesigner: [],
  furnitureStyle: "Moderno",
  interiorLighting: "Natural suave",
  wallMaterial: [],
  floorMaterial: "Madera de roble"
};
