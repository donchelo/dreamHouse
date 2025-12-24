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
  
  // Section 7: Render Output Configuration
  renderOutputResolution: string;
  renderAspectRatio: string;
  
  // Section 8: Technical Notes (for Floor Plan)
  technicalNotes: string;
  
  // Section 9: Art Direction (for Rendering)
  artDirection: string;
}

// ============================================
// FLOOR PLAN TYPE DEFINITIONS
// ============================================

export interface FloorPlan {
  // Forma general de la planta
  shape: string; // "Rectangular", "L-shaped", "U-shaped", "C-shaped", "Organic", etc.
  
  // Configuración de zonas
  zones: {
    public: string[]; // ["Living room", "Dining room", "Kitchen", etc.]
    private: string[]; // ["Master bedroom", "Bedroom 2", "Bedroom 3", etc.]
    services: string[]; // ["Bathroom", "Laundry", "Storage", etc.]
    exterior: string[]; // ["Terrace", "Garden", "Pool area", etc.]
  };
  
  // Flujo de circulación
  circulation: {
    mainAxis: string; // "Linear", "Radial", "Central", "Distributed"
    entryPoint: string; // "Front center", "Side", "Corner", etc.
    flowDescription: string; // Descripción textual del flujo
  };
  
  // Relación interior-exterior
  interiorExterior: {
    connectionType: string; // "Open", "Semi-open", "Controlled", "Minimal"
    mainConnections: string[]; // ["Living to terrace", "Kitchen to garden", etc.]
    glazingStrategy: string; // "Large windows", "Sliding doors", "Glass walls", etc.
  };
  
  // Dimensiones aproximadas (para contexto)
  dimensions: {
    approximateWidth: string; // "15-20m"
    approximateDepth: string; // "10-15m"
    footprint: string; // "150-200m²"
  };
  
  // Características arquitectónicas del layout
  layoutFeatures: string[]; // ["Open plan", "Double height", "Courtyard", etc.]
  
  // Volumetría exterior: traducción de la planta 2D a volúmenes 3D
  exteriorVolumetrics: {
    // Descripción de cómo la distribución de zonas afecta la altura y masa del edificio
    massingDescription: string; // "El ala norte es de doble altura mientras el ala sur es de un solo nivel"
    // Alturas por zona (si aplica)
    heightVariations: string[]; // ["Public zone: double height", "Private zone: single level", etc.]
    // Relación de llenos y vacíos en fachada
    facadeComposition: string; // "Grandes ventanales en zona pública, muros más cerrados en zona privada"
  };
  
  // Descripción textual completa para el prompt
  description: string; // Descripción narrativa del floor plan
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
  
  // Section 7: Render Output Configuration
  renderOutputResolution: "4K",
  renderAspectRatio: "16:9",
  
  // Section 8: Technical Notes (for Floor Plan)
  technicalNotes: "",
  
  // Section 9: Art Direction (for Rendering)
  artDirection: ""
};
