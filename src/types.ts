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
  roofType: string;
  materials: string[];
  finishLevel: string;
  
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
  
  // Section 6: Personalization
  additionalNotes: string;
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
  roofType: "Plano",
  materials: [],
  finishLevel: "Premium/Alto",
  
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
  
  // Section 6: Personalization
  additionalNotes: ""
};
