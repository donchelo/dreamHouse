import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { DreamHouseParams } from '@/types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Helper to map project types to English for better AI understanding
const PROJECT_TYPE_MAP: Record<string, string> = {
  "Casa unifamiliar": "single-family house",
  "Villa de lujo": "luxury villa",
  "Apartamento/Penthouse": "penthouse apartment",
  "Edificio residencial": "residential building",
  "Oficinas corporativas": "corporate office building",
  "Retail/Tienda": "retail store",
  "Restaurante/Bar": "restaurant",
  "Hotel boutique": "boutique hotel",
  "Hotel resort": "resort hotel",
  "Museo/Galería": "museum",
  "Centro cultural": "cultural center",
  "Biblioteca": "library",
  "Teatro/Auditorio": "theater",
  "Edificio educativo": "educational building",
  "Clínica/Hospital": "medical clinic",
  "Spa/Wellness": "wellness spa",
  "Mixed-use": "mixed-use building"
};

// Helper to map mood to English descriptors
const MOOD_MAP: Record<string, string> = {
  "Elegante y sofisticado": "elegant and sophisticated atmosphere",
  "Acogedor y cálido": "cozy and warm atmosphere",
  "Dramático e impactante": "dramatic and striking atmosphere",
  "Sereno y zen": "serene and zen atmosphere",
  "Futurista y vanguardista": "futuristic and avant-garde atmosphere",
  "Rústico y orgánico": "rustic and organic atmosphere",
  "Lujoso y opulento": "luxurious and opulent atmosphere",
  "Industrial y raw": "industrial and raw atmosphere",
  "Minimalista y puro": "minimalist and pure atmosphere",
  "Romántico y nostálgico": "romantic and nostalgic atmosphere"
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const paramsJson = formData.get('params') as string;
    const files = formData.getAll('files') as File[];

    if (!paramsJson) {
      return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
    }

    const params: DreamHouseParams = JSON.parse(paramsJson);

    // --- Step 1: Analyze References (if any) ---
    let analysisResult = "";
    
    if (files.length > 0) {
      const parts = [];
      parts.push({ text: "Analiza estas imágenes de referencia arquitectónica. Identifica y lista brevemente: 1. Estilo visual dominante. 2. Materiales principales. 3. Paleta de colores. 4. Elementos arquitectónicos distintivos. 5. 'Mood' o atmósfera." });

      for (const file of files) {
        const buffer = await file.arrayBuffer();
        const base64Data = Buffer.from(buffer).toString('base64');
        parts.push({
          inlineData: {
            mimeType: file.type,
            data: base64Data
          }
        });
      }

      try {
        const analysisResponse = await ai.models.generateContent({
          model: "gemini-3-pro-preview",
          contents: [{ parts }]
        });
        analysisResult = analysisResponse.text || "";
      } catch (error) {
        console.error("Error analyzing images:", error);
      }
    }

    // --- Step 2: Construct Enhanced Prompt ---
    
    // Project type
    const projectType = PROJECT_TYPE_MAP[params.projectType] || "architectural building";
    
    // Location context
    const location = params.city ? `located in ${params.city}` : "";
    
    // Architect influence
    const validArchitects = Array.isArray(params.architect) 
      ? params.architect.filter(a => a !== "Sin arquitecto específico")
      : [];
    const architectInfluence = validArchitects.length > 0 
      ? `designed in the style of ${validArchitects.join(' and ')}` 
      : "";
    
    // Mood/Atmosphere
    const mood = MOOD_MAP[params.mood] || "";
    
    // Styles
    const styles = params.architecturalStyles.length > 0 
      ? `Architectural style: ${params.architecturalStyles.join(', ')}` 
      : "";
    
    // Materials
    const materials = params.materials.length > 0 
      ? `Primary materials: ${params.materials.join(', ')}` 
      : "";
    
    // Physical specifications
    const physicalSpecs = [
      `${params.size}`,
      `${params.levels} level${params.levels > 1 ? 's' : ''}`,
      `${params.roofType} roof`,
      params.finishLevel !== "Estándar/Medio" ? `${params.finishLevel} finish level` : ""
    ].filter(Boolean).join(", ");
    
    // Context & Environment
    const environmentContext = [
      `Climate: ${params.climate}`,
      `Environment: ${params.environment}`,
      params.waterBody !== "Sin agua cercana" ? `Water feature: ${params.waterBody}` : "",
      params.weatherCondition !== "Despejado/Soleado" ? `Weather: ${params.weatherCondition}` : ""
    ].filter(Boolean).join(". ");
    
    // Aesthetics
    const aesthetics = [
      params.colorPalette.length > 0 ? `Color palette: ${params.colorPalette.join(', ')}` : "",
      params.exteriorElements.length > 0 ? `Exterior elements: ${params.exteriorElements.join(', ')}` : "",
      params.vegetation.length > 0 ? `Landscaping: ${params.vegetation.join(', ')}` : ""
    ].filter(Boolean).join(". ");
    
    // Camera & Photography
    const cameraSettings = [
      `Camera angle: ${params.cameraAngle}`,
      `Composition: ${params.composition}`,
      `Time of day: ${params.timeOfDay}`,
      `Season: ${params.season}`,
      `Lighting: ${params.lighting}`,
      params.humanContext !== "Sin personas" ? `Human presence: ${params.humanContext}` : ""
    ].filter(Boolean).join(". ");
    
    // Additional notes
    const additionalInfo = params.additionalNotes 
      ? `Special instructions: ${params.additionalNotes}` 
      : "";
    
    // Reference analysis
    const refAnalysis = analysisResult 
      ? `Reference analysis influence: ${analysisResult}` 
      : "";
    
    // Quality suffix - Enhanced for professional photography
    const qualitySuffix = `
      Ultra high resolution 8K, photorealistic architectural photography, 
      professional DSLR quality, award-winning architectural visualization,
      cinematic lighting, sharp details, depth of field, 
      magazine-quality render, ArchDaily featured quality
    `.trim();

    // Combine everything into a structured prompt
    const fullPrompt = `
Professional architectural exterior photography of a ${projectType} ${location} ${architectInfluence}.

MOOD & ATMOSPHERE: ${mood}

ARCHITECTURAL DETAILS:
${styles}
${materials}
Physical specifications: ${physicalSpecs}

ENVIRONMENT & CONTEXT:
${environmentContext}

AESTHETICS & DETAILS:
${aesthetics}

PHOTOGRAPHY SETTINGS:
${cameraSettings}

${additionalInfo}
${refAnalysis}

RENDER QUALITY: ${qualitySuffix}
    `.trim().replace(/\n{3,}/g, '\n\n');

    console.log("Generated Prompt:", fullPrompt);

    // --- Step 3: Generate Image ---
    const generationResponse = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: [{ parts: [{ text: fullPrompt }] }],
      config: {
        tools: [{ googleSearch: {} }],
        imageConfig: {
          aspectRatio: params.aspectRatio || "16:9",
          imageSize: params.outputResolution || "4K"
        }
      }
    });

    // Extract image data
    const candidates = generationResponse.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No image candidates returned");
    }

    const imagePart = candidates[0].content.parts.find(part => part.inlineData);
    
    if (!imagePart || !imagePart.inlineData) {
      throw new Error("No image data found in response");
    }

    const imageBase64 = imagePart.inlineData.data;
    const mimeType = imagePart.inlineData.mimeType || "image/png";
    const imageUrl = `data:${mimeType};base64,${imageBase64}`;

    return NextResponse.json({ imageUrl });

  } catch (error: unknown) {
    console.error("API Error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
