# DreamHouse

**Product Requirements Document | MVP**

| Campo | Valor |
|-------|-------|
| Versión | 1.1 - MVP |
| Fecha | Noviembre 2025 |
| Estado | Draft |

---

## 1. Visión del Producto

DreamHouse es una aplicación web que permite a usuarios y arquitectos generar visualizaciones fotorrealistas de casas personalizadas mediante inteligencia artificial. A través de una interfaz única y parámetros configurables, el usuario puede crear el render exterior de su casa ideal en segundos.

---

## 2. Problema a Resolver

Diseñar una casa requiere conocimientos técnicos, tiempo y recursos costosos. Los renders arquitectónicos tradicionales pueden costar cientos o miles de dólares y tomar días o semanas. DreamHouse democratiza este proceso permitiendo a cualquier persona visualizar conceptos arquitectónicos de alta calidad instantáneamente.

---

## 3. Usuarios Target

**Usuarios Primarios:** Arquitectos, diseñadores de interiores, estudiantes de arquitectura

**Usuarios Secundarios:** Personas interesadas en construir o renovar, agentes inmobiliarios, desarrolladores

---

## 4. Propuesta de Valor

- Generación instantánea de renders arquitectónicos fotorrealistas
- Interfaz simple: una sola pantalla con parámetros claros
- Personalización basada en estilos de arquitectos reconocidos mundialmente
- Soporte para imágenes de referencia (materiales, formas, estilos)

---

## 5. Funcionalidades del MVP

### 5.1 Interfaz de Usuario (Single Page)

La aplicación consiste en una única interfaz que contiene todos los elementos necesarios para la generación de imágenes. No hay navegación, no hay páginas adicionales. Todo ocurre en un solo viewport.

### 5.2 Upload de Referentes

El usuario puede subir una o múltiples imágenes de referencia:

- **Formatos soportados:** JPG, PNG, WEBP
- **Tamaño máximo por imagen:** 10MB
- **Cantidad máxima:** 5 referentes
- **Tipos de referente:** materiales, formas arquitectónicas, estilos, paisajes, colores

### 5.3 Panel de Parámetros

Los parámetros se dividen en dos tipos según su modo de selección:

---

#### 5.3.1 Parámetros de Selección Única

Solo se puede elegir una opción por parámetro.

| Parámetro | Tipo | Valores |
|-----------|------|---------|
| **Arquitecto de Referencia** | Dropdown | Ver sección 5.4 |
| **Ciudad** | Input de texto | El usuario escribe libremente (ej: "Tokyo", "Barcelona", "Dubai") |
| **Clima** | Dropdown | Tropical, Mediterráneo, Desértico, Árido, Continental, Oceánico, Frío/Nórdico, Montañoso |
| **Entorno/Ubicación** | Dropdown | Urbana centro, Urbana residencial, Suburbana, Rural, Montaña, Playa, Bosque, Desierto, Lago/Río, Isla |
| **Tamaño** | Dropdown | Tiny House (<50m²), Pequeña (50-150m²), Mediana (150-300m²), Grande (300-500m²), Mansión (500-1000m²), Estate (>1000m²) |
| **Niveles** | Selector | 1, 2, 3, 4, 5+ |
| **Tipo de Techo** | Dropdown | Plano, A dos aguas, A cuatro aguas, Mansarda, Mariposa, Curvo, Verde/Jardín, Terraza habitable |
| **Hora del día** | Dropdown | Amanecer (Golden Hour), Mañana, Mediodía, Atardecer (Golden Hour), Anochecer (Blue Hour), Noche |
| **Estación del año** | Dropdown | Primavera, Verano, Otoño, Invierno |
| **Ángulo de cámara** | Dropdown | Frontal, 3/4 frontal, Lateral, Aéreo/Drone, Nivel de calle, Perspectiva dramática |

---

#### 5.3.2 Parámetros de Selección Múltiple

El usuario puede seleccionar varias opciones (con límites recomendados para coherencia visual).

| Parámetro | Tipo | Máx. Sugerido | Valores |
|-----------|------|---------------|---------|
| **Materiales** | Multi-select chips | 3 | Concreto, Concreto expuesto, Madera, Madera oscura, Vidrio, Acero, Acero corten, Piedra natural, Ladrillo, Ladrillo visto, Estuco, Mármol, Bambú, Adobe, Cobre, Zinc, Terracota |
| **Estilos Arquitectónicos** | Multi-select chips | 2 | Ver sección 5.5 |
| **Elementos Exteriores** | Multi-select chips | 5 | Piscina, Piscina infinity, Jacuzzi, Terraza, Balcones, Pérgola, Jardín vertical, Roof garden, Garaje visible, Cochera abierta, Muro perimetral, Cerca viva, Fuente, Espejo de agua, Chimenea exterior, Cocina exterior, Deck de madera, Iluminación arquitectónica, Paneles solares, Cancha deportiva |
| **Vegetación** | Multi-select chips | 3 | Mínima/Desértica, Tropical exuberante, Mediterránea, Jardín japonés, Bosque/Pinos, Palmeras, Césped amplio, Jardín de rocas, Huerto/Jardín comestible, Flores silvestres |
| **Paleta de Color** | Multi-select chips | 2 | Blanco puro, Tonos neutros, Grises, Negro/Carbón, Tonos tierra, Madera natural, Colores cálidos, Colores fríos, Monocromático, Alto contraste |

---

### 5.4 Lista de Arquitectos de Referencia

Dropdown con los siguientes arquitectos reconocidos mundialmente. El estilo del arquitecto influye en la estética general del render.

| Arquitecto | Estilo Característico |
|------------|----------------------|
| Frank Lloyd Wright | Arquitectura orgánica, Prairie Style, integración con naturaleza |
| Le Corbusier | Modernismo, pilotis, planta libre, ventanas horizontales |
| Zaha Hadid | Neo-futurismo, formas fluidas, geometría paramétrica |
| Frank Gehry | Deconstructivismo, formas escultóricas, titanio curvo |
| Tadao Ando | Minimalismo, concreto expuesto, luz natural dramática |
| Ludwig Mies van der Rohe | "Less is more", vidrio y acero, proporciones perfectas |
| Norman Foster | High-tech, sostenibilidad, estructuras innovadoras |
| Renzo Piano | Ligereza estructural, transparencia, detalles refinados |
| Peter Zumthor | Materialidad, experiencia sensorial, atmósfera |
| Rem Koolhaas | Vanguardia, urbanismo radical, volúmenes audaces |
| Oscar Niemeyer | Curvas sensuales, modernismo brasileño, concreto blanco |
| Antoni Gaudí | Modernismo catalán, formas orgánicas, mosaicos |
| I.M. Pei | Geometría, modernismo refinado, pirámides y triángulos |
| Santiago Calatrava | Estructuras escultóricas, blanco, formas de huesos |
| Álvaro Siza | Minimalismo poético, luz natural, blanco mediterráneo |
| Louis Kahn | Monumentalidad, geometría pura, luz cenital |
| Richard Meier | Blanco absoluto, pureza formal, grids |
| Kengo Kuma | Materiales naturales, ligereza, transparencia japonesa |
| Bjarke Ingels (BIG) | Pragmatismo utópico, sostenibilidad, formas lúdicas |
| Daniel Libeskind | Deconstructivismo, ángulos agudos, memoria |
| Jean Nouvel | Contextualismo, fachadas innovadoras, luz filtrada |
| Herzog & de Meuron | Materialidad experimental, texturas, fachadas icónicas |
| SANAA (Sejima + Nishizawa) | Minimalismo etéreo, transparencia, curvas suaves |
| Shigeru Ban | Materiales no convencionales, papel, sostenibilidad |
| Toyo Ito | Arquitectura fluida, naturaleza digital, ligereza |
| **Sin arquitecto específico** | Estilo neutro basado solo en parámetros seleccionados |

---

### 5.5 Lista de Estilos Arquitectónicos

Multi-select con máximo 2 estilos para mantener coherencia visual.

| Categoría | Estilos |
|-----------|---------|
| **Contemporáneos** | Minimalista, Moderno, Contemporáneo, High-Tech, Deconstructivista, Paramétrico, Sustentable/Eco |
| **Clásicos/Históricos** | Colonial, Victoriano, Georgian, Tudor, Art Deco, Art Nouveau, Neoclásico, Gótico Revival |
| **Regionales** | Mediterráneo, Toscano, Español Colonial, Pueblo/Adobe, Japonés tradicional, Escandinavo, Tropical, Balinés |
| **Americanos** | Ranch, Craftsman/Bungalow, Cape Cod, Prairie, Mid-Century Modern, Farmhouse moderno, Brownstone |
| **Conceptuales** | Brutalista, Orgánico, Industrial, Loft, Futurista, Floating/Sobre agua, Underground/Tierra, Container, Tiny House |

---

### 5.6 Generación de Imagen

- **Output:** Una única imagen de fotografía arquitectónica exterior
- **Calidad:** Fotorrealista, alta resolución
- **Aspecto:** 16:9 horizontal
- **Sin iteración:** El usuario ajusta parámetros y regenera si desea cambios

---

## 6. Flujo de Usuario (MVP)

1. Usuario accede a la aplicación (single page)
2. Opcionalmente sube 1-5 imágenes de referencia
3. Configura parámetros de selección única (arquitecto, ciudad, clima, etc.)
4. Configura parámetros de selección múltiple (materiales, estilos, elementos)
5. Hace clic en "Generar"
6. El sistema construye el prompt combinando parámetros + análisis de referentes
7. Se envía request a la API de generación de imagen
8. Se muestra la imagen generada
9. Usuario puede descargar la imagen o ajustar parámetros y regenerar

---

## 7. Stack Técnico

| Componente | Tecnología |
|------------|------------|
| Generación de imagen | **Nano Banana Pro** |
| Análisis de referentes | **Gemini Pro 3** (visión multimodal) |
| Frontend | React / Next.js (recomendado) |
| Backend/API | Node.js / Serverless Functions |

---

## 8. Arquitectura del Prompt

El prompt final se construye dinámicamente combinando:

1. **Base fija:** "Architectural exterior photography of a residential house..."

2. **Ciudad y contexto:** Integra la ciudad ingresada para reflejar estética local

3. **Estilo del arquitecto:** Descripción del estilo según arquitecto seleccionado (si aplica)

4. **Estilos arquitectónicos:** Fusiona los estilos seleccionados (máx. 2)

5. **Parámetros únicos:** Clima, entorno, tamaño, niveles, techo, hora, estación, ángulo

6. **Parámetros múltiples:** Lista de materiales, elementos exteriores, vegetación, paleta

7. **Análisis de referentes:** Gemini Pro 3 analiza las imágenes subidas y extrae:
   - Colores dominantes
   - Materiales visibles
   - Formas arquitectónicas
   - Texturas
   - Ambiente y mood

8. **Sufijo de calidad:** "8K, ultra detailed, professional architectural photography, [hora] lighting, award-winning design"

---

## 9. Criterios de Éxito del MVP

- Tiempo de generación < 30 segundos
- Imágenes reconocibles según el estilo del arquitecto seleccionado
- Parámetros reflejados visualmente en el output (materiales, clima, ubicación)
- Ciudad influye en el contexto visual (ej: Tokyo = estética urbana densa)
- Combinación de estilos arquitectónicos coherente
- Referentes influyen de manera perceptible en el resultado
- UI funcional en desktop (mobile secundario para MVP)

---

## 10. Limitaciones del MVP

- Sin iteración sobre imágenes generadas
- Sin guardado de proyectos o historial
- Sin autenticación de usuarios
- Sin planos ni documentación técnica
- Sin estimación de costos
- Solo vistas exteriores (no interiores)
- Máximo 2 estilos arquitectónicos simultáneos
- Máximo 3 materiales simultáneos

---

## 11. Roadmap Post-MVP

### Fase 2 — Iteración y Refinamiento
- Chat para iterar sobre imágenes ("más minimalista", "cambia el material")
- Variaciones múltiples por generación (4 opciones)
- Historial de generaciones
- Presets de combinaciones populares

### Fase 3 — Profesionalización
- Generación de planos básicos
- Vistas interiores
- Estimación de costos por región
- Export a formatos CAD
- Múltiples ángulos de la misma casa

### Fase 4 — Escala
- Modelo de suscripción / créditos
- API para terceros
- Marketplace de estilos personalizados
- Colaboración en tiempo real
- Integración con renders 3D

---

## 12. Resumen de Parámetros

### Selección Única (10 parámetros)
| # | Parámetro | Tipo Input |
|---|-----------|------------|
| 1 | Arquitecto de Referencia | Dropdown |
| 2 | Ciudad | Text input libre |
| 3 | Clima | Dropdown |
| 4 | Entorno/Ubicación | Dropdown |
| 5 | Tamaño | Dropdown |
| 6 | Niveles | Selector numérico |
| 7 | Tipo de Techo | Dropdown |
| 8 | Hora del día | Dropdown |
| 9 | Estación del año | Dropdown |
| 10 | Ángulo de cámara | Dropdown |

### Selección Múltiple (5 parámetros)
| # | Parámetro | Tipo Input | Máx. Sugerido |
|---|-----------|------------|---------------|
| 1 | Materiales | Multi-select chips | 3 |
| 2 | Estilos Arquitectónicos | Multi-select chips | 2 |
| 3 | Elementos Exteriores | Multi-select chips | 5 |
| 4 | Vegetación | Multi-select chips | 3 |
| 5 | Paleta de Color | Multi-select chips | 2 |

**Total: 15 parámetros configurables + upload de referentes**
