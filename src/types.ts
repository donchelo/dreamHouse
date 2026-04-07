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
  parkingType: string;
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

  // Section 6: Output Configuration
  renderOutputResolution: string;
  renderAspectRatio: string;
  renderStyle: string;

  // Section 7: Technical Notes
  technicalNotes: string;

  // Section 8: Creative Direction
  artDirection: string;
  negativePrompt: string;
  thinkingLevel: "Minimal" | "High";
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
  parkingType: "",
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

  // Section 6: Output Configuration
  renderOutputResolution: "",
  renderAspectRatio: "",
  renderStyle: "",

  // Section 7: Technical Notes
  technicalNotes: "",

  // Section 8: Creative Direction
  artDirection: "",
  negativePrompt: "",
  thinkingLevel: "Minimal",
};
