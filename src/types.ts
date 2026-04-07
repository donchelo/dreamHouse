// ============================================
// DREAMHOUSE PRO - TYPE DEFINITIONS
// ============================================

export interface DreamHouseParams {
  // Section 04: Identidad del Proyecto
  projectType: string;
  architecturalStyles: string[];
  architect: string[];
  mood: string;

  // Section 05: Ubicación y Entorno
  city: string;
  climate: string;
  environment: string;
  waterBody: string;
  weatherCondition: string;

  // Section 06: Volumetría y Forma
  size: string;
  levels: number;
  roofType: string;
  layoutType: string;

  // Section 07: Programa Arquitectónico
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  parkingType: string;
  kitchenType: string;
  livingAreaType: string;
  socialAreas: string[];

  // Section 08: Materialidad y Textura
  materials: string[];
  finishLevel: string;
  architecturalDetails: string[];

  // Section 09: Color y Paisaje
  colorPalette: string[];
  exteriorElements: string[];
  vegetation: string[];

  // Section 10: Fotografía
  cameraAngle: string;
  composition: string;
  timeOfDay: string;
  season: string;
  lighting: string;
  humanContext: string;

  // Section 11: Configuración de Salida
  renderStyle: string;
  renderAspectRatio: string;
  renderOutputResolution: string;
  thinkingLevel: "Minimal" | "High";

  // Section 12: Dirección Creativa
  technicalNotes: string;
  artDirection: string;
  negativePrompt: string;
}

export const DEFAULT_PARAMS: DreamHouseParams = {
  // Section 04: Identidad del Proyecto
  projectType: "",
  architecturalStyles: [],
  architect: [],
  mood: "",

  // Section 05: Ubicación y Entorno
  city: "",
  climate: "",
  environment: "",
  waterBody: "",
  weatherCondition: "",

  // Section 06: Volumetría y Forma
  size: "",
  levels: 0,
  roofType: "",
  layoutType: "",

  // Section 07: Programa Arquitectónico
  bedrooms: 0,
  bathrooms: 0,
  parkingSpots: 0,
  parkingType: "",
  kitchenType: "",
  livingAreaType: "",
  socialAreas: [],

  // Section 08: Materialidad y Textura
  materials: [],
  finishLevel: "",
  architecturalDetails: [],

  // Section 09: Color y Paisaje
  colorPalette: [],
  exteriorElements: [],
  vegetation: [],

  // Section 10: Fotografía
  cameraAngle: "",
  composition: "",
  timeOfDay: "",
  season: "",
  lighting: "",
  humanContext: "",

  // Section 11: Configuración de Salida
  renderStyle: "",
  renderAspectRatio: "",
  renderOutputResolution: "",
  thinkingLevel: "Minimal",

  // Section 12: Dirección Creativa
  technicalNotes: "",
  artDirection: "",
  negativePrompt: "",
};
