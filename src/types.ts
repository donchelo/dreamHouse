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
  projectType: "",
  architecturalStyles: [],
  architect: [],
  mood: "",

  // Section 2: Context & Location
  city: "",
  climate: "",
  environment: "",
  waterBody: "",
  weatherCondition: "",

  // Section 3: Physical Specifications
  size: "",
  levels: 0,
  bedrooms: 0,
  bathrooms: 0,
  parkingSpots: 0,
  kitchenType: "",
  livingAreaType: "",
  layoutType: "",
  socialAreas: [],
  roofType: "",
  materials: [],
  finishLevel: "",
  architecturalDetails: [],

  // Section 4: Aesthetics & Details
  colorPalette: [],
  exteriorElements: [],
  vegetation: [],

  // Section 5: Camera Configuration
  cameraAngle: "",
  composition: "",
  timeOfDay: "",
  season: "",
  lighting: "",
  humanContext: "",

  // Section 6: Floor Plan Output Configuration
  fpOutputResolution: "",
  fpAspectRatio: "",

  // Section 7: Exterior Output Configuration
  renderOutputResolution: "",
  renderAspectRatio: "",

  // Section 8: Technical Notes (for Floor Plan)
  technicalNotes: "",

  // Section 9: Art Direction (for Exterior)
  artDirection: "",
  negativePrompt: "",
  thinkingLevel: "Minimal",

  // Section 10: Interior Design
  roomType: "",
  interiorStyle: [],
  interiorDesigner: [],
  furnitureStyle: "",
  interiorLighting: "",
  wallMaterial: [],
  floorMaterial: ""
};
