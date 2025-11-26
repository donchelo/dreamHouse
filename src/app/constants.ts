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
  // Contemporáneo
  "Minimalista", "Moderno", "Contemporáneo", "High-Tech", "Deconstructivista",
  "Paramétrico", "Sustentable/Eco", "Brutalista", "Orgánico", "Industrial",
  "Futurista",
  // Clásico/Tradicional
  "Colonial", "Victoriano", "Georgian", "Tudor", "Art Deco", "Art Nouveau",
  "Neoclásico", "Gótico Revival",
  // Regional
  "Mediterráneo", "Toscano", "Español Colonial", "Pueblo/Adobe", 
  "Japonés tradicional", "Escandinavo", "Tropical", "Balinés",
  // Americano
  "Ranch", "Craftsman/Bungalow", "Cape Cod", "Prairie", "Mid-Century Modern",
  "Farmhouse moderno", "Brownstone",
  // Especial
  "Floating/Sobre agua", "Underground/Tierra", "Container", "Tiny House", "Loft"
];

export const ARCHITECTS = [
  // Modernistas
  "Frank Lloyd Wright", "Le Corbusier", "Ludwig Mies van der Rohe", "Louis Kahn",
  // Contemporáneos Icónicos
  "Zaha Hadid", "Frank Gehry", "Tadao Ando", "Norman Foster", "Renzo Piano",
  "Peter Zumthor", "Rem Koolhaas", "Jean Nouvel",
  // Maestros Globales
  "Oscar Niemeyer", "Antoni Gaudí", "I.M. Pei", "Santiago Calatrava",
  "Álvaro Siza", "Richard Meier",
  // Japoneses
  "Kengo Kuma", "SANAA (Sejima + Nishizawa)", "Shigeru Ban", "Toyo Ito",
  // Nueva Generación
  "Bjarke Ingels (BIG)", "Daniel Libeskind", "Herzog & de Meuron",
  // Comercial/Cultural (nuevos)
  "Moshe Safdie", "David Chipperfield", "Studio Gang", "MAD Architects",
  "MVRDV", "Snøhetta", "Heatherwick Studio",
  // Sin preferencia
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
