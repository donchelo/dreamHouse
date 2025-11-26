// ============================================
// DREAMHOUSE PRO - CONSTANTS
// Organized by parameter priority and category
// ============================================

// ------------------------------------------
// SECTION 1: PROJECT ESSENCE
// ------------------------------------------

export const PROJECT_TYPES = [
  // Residencial
  "Casa unifamiliar",
  "Villa de lujo",
  "Apartamento/Penthouse",
  "Edificio residencial",
  // Comercial
  "Oficinas corporativas",
  "Retail/Tienda",
  "Restaurante/Bar",
  "Hotel boutique",
  "Hotel resort",
  // Cultural
  "Museo/Galería",
  "Centro cultural",
  "Biblioteca",
  "Teatro/Auditorio",
  // Otros
  "Edificio educativo",
  "Clínica/Hospital",
  "Spa/Wellness",
  "Mixed-use"
];

export const STYLES = [
  // ═══════════════════════════════════════════
  // CONTEMPORÁNEO & VANGUARDIA
  // ═══════════════════════════════════════════
  "Minimalista", "Moderno", "Contemporáneo", "High-Tech", "Deconstructivista",
  "Paramétrico", "Sustentable/Eco", "Brutalista", "Neo-brutalista", "Orgánico",
  "Industrial", "Futurista", "Postmoderno", "Metabolista", "Biofílico",
  "Net-Zero/Passivhaus", "Blob Architecture",
  
  // ═══════════════════════════════════════════
  // CLÁSICO & HISTÓRICO
  // ═══════════════════════════════════════════
  "Colonial", "Victoriano", "Georgian", "Tudor", "Art Deco", "Art Nouveau",
  "Neoclásico", "Gótico Revival", "Bauhaus", "De Stijl", "Beaux-Arts",
  "Palladiano", "Greek Revival", "Antebellum", "Barroco",
  
  // ═══════════════════════════════════════════
  // REGIONAL - EUROPA
  // ═══════════════════════════════════════════
  "Mediterráneo", "Toscano", "Español Colonial", "Andaluz", "Griego isleño",
  "Provenzal", "Alpino/Chalet", "Escandinavo",
  
  // ═══════════════════════════════════════════
  // REGIONAL - ASIA & MEDIO ORIENTE
  // ═══════════════════════════════════════════
  "Japonés tradicional", "Tropical", "Balinés", "Hanok (Coreano)",
  "Árabe contemporáneo", "Marroquí/Morisco", "Persa",
  
  // ═══════════════════════════════════════════
  // REGIONAL - AMÉRICAS
  // ═══════════════════════════════════════════
  "Ranch", "Craftsman/Bungalow", "Cape Cod", "Prairie", "Mid-Century Modern",
  "Farmhouse moderno", "Brownstone", "Pueblo/Adobe", "Pueblo Revival",
  "Shingle Style", "Florida/Miami Deco", "Pacific Northwest",
  "Mexicano contemporáneo", "Hacienda moderna", "Brasileño moderno", "Caribeño",
  
  // ═══════════════════════════════════════════
  // REGIONAL - ÁFRICA & OCEANÍA
  // ═══════════════════════════════════════════
  "Africano vernáculo", "Australiano contemporáneo",
  
  // ═══════════════════════════════════════════
  // TENDENCIAS LIFESTYLE
  // ═══════════════════════════════════════════
  "Japandi", "Wabi-sabi", "California Modern", "Desert Modern",
  "Coastal Modern", "Mountain Modern", "Resort Modern", "Wine Country",
  "Bohemio de lujo",
  
  // ═══════════════════════════════════════════
  // ESPECIAL & EXPERIMENTAL
  // ═══════════════════════════════════════════
  "Floating/Sobre agua", "Underground/Tierra", "Container", "Tiny House", "Loft",
  "Earthship", "Treehouse/Árbol"
];

export const ARCHITECTS = [
  // ═══════════════════════════════════════════
  // MODERNISTAS CLÁSICOS
  // ═══════════════════════════════════════════
  "Frank Lloyd Wright", "Le Corbusier", "Ludwig Mies van der Rohe", "Louis Kahn",
  "Carlo Scarpa",
  
  // ═══════════════════════════════════════════
  // MAESTROS CONTEMPORÁNEOS (Pritzker Winners)
  // ═══════════════════════════════════════════
  "Zaha Hadid", "Frank Gehry", "Tadao Ando", "Norman Foster", "Renzo Piano",
  "Peter Zumthor", "Rem Koolhaas", "Jean Nouvel", "Richard Meier",
  "Rafael Moneo", "Fumihiko Maki", "Glenn Murcutt", "Arata Isozaki",
  
  // ═══════════════════════════════════════════
  // MAESTROS GLOBALES ICÓNICOS
  // ═══════════════════════════════════════════
  "Oscar Niemeyer", "Antoni Gaudí", "I.M. Pei", "Santiago Calatrava",
  "Álvaro Siza", "Eduardo Souto de Moura",
  
  // ═══════════════════════════════════════════
  // ESCUELA JAPONESA
  // ═══════════════════════════════════════════
  "Kengo Kuma", "SANAA (Sejima + Nishizawa)", "Shigeru Ban", "Toyo Ito",
  "Sou Fujimoto", "Junya Ishigami",
  
  // ═══════════════════════════════════════════
  // NUEVA GENERACIÓN GLOBAL
  // ═══════════════════════════════════════════
  "Bjarke Ingels (BIG)", "Daniel Libeskind", "Herzog & de Meuron",
  "David Adjaye", "Diébédo Francis Kéré", "Wang Shu",
  
  // ═══════════════════════════════════════════
  // AMÉRICAS (Norte, Centro, Sur)
  // ═══════════════════════════════════════════
  "Steven Holl", "Thom Mayne (Morphosis)", "Peter Eisenman",
  "Diller Scofidio + Renfro", "Olson Kundig",
  "Alejandro Aravena", "Paulo Mendes da Rocha", "Tatiana Bilbao",
  "Frida Escobedo", "Alberto Campo Baeza",
  
  // ═══════════════════════════════════════════
  // MINIMALISTAS Y FENOMENOLÓGICOS
  // ═══════════════════════════════════════════
  "John Pawson", "Balkrishna Doshi", "Lacaton & Vassal", "Grafton Architects",
  
  // ═══════════════════════════════════════════
  // ESTUDIOS INNOVADORES
  // ═══════════════════════════════════════════
  "Moshe Safdie", "David Chipperfield", "Studio Gang", "MAD Architects",
  "MVRDV", "Snøhetta", "Heatherwick Studio", "OMA", "WOHA",
  "UNStudio", "Coop Himmelb(l)au",
  
  // ═══════════════════════════════════════════
  // SIN PREFERENCIA
  // ═══════════════════════════════════════════
  "Sin arquitecto específico"
];

export const MOODS = [
  "Elegante y sofisticado",
  "Acogedor y cálido",
  "Dramático e impactante",
  "Sereno y zen",
  "Futurista y vanguardista",
  "Rústico y orgánico",
  "Lujoso y opulento",
  "Industrial y raw",
  "Minimalista y puro",
  "Romántico y nostálgico"
];

// ------------------------------------------
// SECTION 2: CONTEXT & LOCATION
// ------------------------------------------

export const CLIMATES = [
  "Tropical", "Mediterráneo", "Desértico", "Árido", "Continental",
  "Oceánico", "Frío/Nórdico", "Montañoso"
];

export const ENVIRONMENTS = [
  "Urbana centro", "Urbana residencial", "Suburbana", "Rural", "Montaña",
  "Playa", "Bosque", "Desierto", "Lago/Río", "Isla"
];

export const WATER_BODIES = [
  "Sin agua cercana",
  "Frente al mar/océano",
  "Junto a lago",
  "Orilla de río",
  "Canal/waterfront urbano",
  "Estanque/laguna"
];

export const WEATHER_CONDITIONS = [
  "Despejado/Soleado",
  "Parcialmente nublado",
  "Nublado dramático",
  "Lluvia ligera",
  "Post-lluvia (mojado)",
  "Niebla/Bruma",
  "Nieve fresca",
  "Atardecer tormentoso"
];

// ------------------------------------------
// SECTION 3: PHYSICAL SPECIFICATIONS
// ------------------------------------------

export const SIZES = [
  "Tiny House (<50m²)", "Pequeña (50-150m²)", "Mediana (150-300m²)",
  "Grande (300-500m²)", "Mansión (500-1000m²)", "Estate (>1000m²)"
];

export const ROOF_TYPES = [
  "Plano", "A dos aguas", "A cuatro aguas", "Mansarda", "Mariposa",
  "Curvo", "Verde/Jardín", "Terraza habitable"
];

export const MATERIALS = [
  "Concreto", "Concreto expuesto", "Madera", "Madera oscura", "Vidrio",
  "Acero", "Acero corten", "Piedra natural", "Ladrillo", "Ladrillo visto",
  "Estuco", "Mármol", "Bambú", "Adobe", "Cobre", "Zinc", "Terracota"
];

export const FINISH_LEVELS = [
  "Económico/Funcional",
  "Estándar/Medio",
  "Premium/Alto",
  "Ultra lujo/Bespoke"
];

// ------------------------------------------
// SECTION 4: AESTHETICS & DETAILS
// ------------------------------------------

export const COLORS = [
  "Blanco puro", "Tonos neutros", "Grises", "Negro/Carbón", "Tonos tierra",
  "Madera natural", "Colores cálidos", "Colores fríos", "Monocromático", "Alto contraste"
];

export const EXTERIOR_ELEMENTS = [
  "Piscina", "Piscina infinity", "Jacuzzi", "Terraza", "Balcones",
  "Pérgola", "Jardín vertical", "Roof garden", "Garaje visible", "Cochera abierta",
  "Muro perimetral", "Cerca viva", "Fuente", "Espejo de agua", "Chimenea exterior",
  "Cocina exterior", "Deck de madera", "Iluminación arquitectónica", "Paneles solares", "Cancha deportiva"
];

export const VEGETATION = [
  "Mínima/Desértica", "Tropical exuberante", "Mediterránea", "Jardín japonés",
  "Bosque/Pinos", "Palmeras", "Césped amplio", "Jardín de rocas",
  "Huerto/Jardín comestible", "Flores silvestres"
];

// ------------------------------------------
// SECTION 5: CAMERA CONFIGURATION
// ------------------------------------------

export const ANGLES = [
  "Frontal", "3/4 frontal", "Lateral", "Aéreo/Drone", "Nivel de calle", "Perspectiva dramática"
];

export const COMPOSITIONS = [
  "Simétrica centrada",
  "Regla de tercios",
  "Líneas guía dramáticas",
  "Encuadre natural (árboles)",
  "Reflejo en agua",
  "Silueta contra cielo"
];

export const TIMES_OF_DAY = [
  "Amanecer (Golden Hour)", "Mañana", "Mediodía", "Atardecer (Golden Hour)",
  "Anochecer (Blue Hour)", "Noche"
];

export const SEASONS = ["Primavera", "Verano", "Otoño", "Invierno"];

export const LIGHTING_TYPES = [
  "Natural suave",
  "Natural dramática (contrastes)",
  "Golden hour cálida",
  "Blue hour fría",
  "Interior visible (noche)",
  "Arquitectónica exterior",
  "Ambiental difusa"
];

export const HUMAN_CONTEXT = [
  "Sin personas",
  "Una persona (escala)",
  "Pareja/2 personas",
  "Familia pequeña",
  "Grupo social",
  "Actividad (caminando, sentados)"
];

// ------------------------------------------
// SECTION 6: OUTPUT CONFIGURATION
// ------------------------------------------

export const OUTPUT_RESOLUTIONS = [
  "1K",   // ~1024px
  "2K",   // ~2048px 
  "4K"    // ~4096px (máxima calidad)
];

export const ASPECT_RATIOS = [
  "16:9",   // Panorámico (ideal para arquitectura)
  "4:3",    // Tradicional
  "1:1",    // Cuadrado
  "9:16",   // Vertical/Portrait
  "3:4"     // Vertical tradicional
];