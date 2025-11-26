export interface DreamHouseParams {
  architect: string[];
  city: string;
  climate: string;
  environment: string;
  size: string;
  levels: number;
  roofType: string;
  timeOfDay: string;
  season: string;
  cameraAngle: string;
  materials: string[];
  architecturalStyles: string[];
  exteriorElements: string[];
  vegetation: string[];
  colorPalette: string[];
  additionalNotes: string;
}

export const DEFAULT_PARAMS: DreamHouseParams = {
  architect: [],
  city: "",
  climate: "Mediterráneo",
  environment: "Suburbana",
  size: "Mediana (150-300m²)",
  levels: 2,
  roofType: "Plano",
  timeOfDay: "Mediodía",
  season: "Verano",
  cameraAngle: "3/4 frontal",
  materials: [],
  architecturalStyles: [],
  exteriorElements: [],
  vegetation: [],
  colorPalette: [],
  additionalNotes: ""
};
