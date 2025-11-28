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
    const lotImage = formData.get('lotImage') as File | null;

    if (!paramsJson) {
      return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
    }

    const params: DreamHouseParams = JSON.parse(paramsJson);

    // --- Step 1: Analyze References & Lot (if any) ---
    let analysisResult = "";
    
    if (files.length > 0 || lotImage) {
      const parts = [];
      parts.push({ text: "Analiza las siguientes imágenes para preparar un prompt de generación arquitectónica." });

      if (lotImage) {
        const buffer = await lotImage.arrayBuffer();
        const base64Data = Buffer.from(buffer).toString('base64');
        parts.push({ text: "IMAGEN DEL LOTE (Terreno donde construir):" });
        parts.push({
          inlineData: {
            mimeType: lotImage.type,
            data: base64Data
          }
        });
      }

      if (files.length > 0) {
        parts.push({ text: "IMÁGENES DE REFERENCIA (Estilo deseado):" });
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
      }

      parts.push({ text: "INSTRUCCIONES: 1. Si hay imagen del lote, describe detalladamente su topografía, vegetación y entorno para integrar el diseño en él. 2. Si hay referencias, extrae el estilo visual, materiales, colores y atmósfera. 3. Proporciona un resumen conciso combinando ambos aspectos (estilo sobre lote)." });

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
    
    // 1. Core Subject Definition
    const projectType = PROJECT_TYPE_MAP[params.projectType] || params.projectType;
    const locationStr = params.city ? `in ${params.city}` : "";
    const validArchitects = Array.isArray(params.architect) 
      ? params.architect.filter(a => a !== "Sin arquitecto específico")
      : [];
    const architects = validArchitects.join(" and ");
    const archStyle = params.architecturalStyles.join(", ");
    
    // 2. Technical Specifications
    const techSpecs = [
      `${params.size}`,
      `${params.levels} levels`,
      `${params.roofType} roof`
    ].filter(Boolean).join(", ");

    // 3. Materials & Finishes
    const materialsList = params.materials.join(", ");
    const colors = params.colorPalette.join(", ");
    const finish = params.finishLevel;

    // 4. Environment & Context
    const environment = [
        params.environment,
        params.climate,
        params.waterBody !== "Sin agua cercana" ? params.waterBody : null,
        params.weatherCondition
    ].filter(Boolean).join(", ");

    // 5. Landscaping
    const landscaping = [
        ...params.vegetation,
        ...params.exteriorElements
    ].join(", ");

    // 6. Atmosphere & Mood
    const moodDesc = MOOD_MAP[params.mood] || params.mood;
    
    // 7. Photography Settings
    const camera = [
        `Angle: ${params.cameraAngle}`,
        `Composition: ${params.composition}`,
        `Time: ${params.timeOfDay}`,
        `Season: ${params.season}`,
        `Lighting: ${params.lighting}`
    ].join(" | ");

    // Lot specific instruction if present
    const lotInstruction = lotImage 
      ? "CRITICAL: The building MUST be situated in the environment described in the 'Visual Context Analysis' corresponding to the LOT IMAGE. Match the terrain, vegetation, and lighting of the lot exactly."
      : "";

    // Construct the Professional Prompt
    const fullPrompt = `
**ROLE & OBJECTIVE**
Act as a world-renowned architectural photographer (e.g., Iwan Baan, Julius Shulman). 
Generate an AWARD-WINNING EXTERIOR PHOTOGRAPH of a residential project.
**VIEW:** EXTERIOR ONLY. Never generate interior views.

**PROJECT SPECIFICATIONS**
- **Type:** ${projectType} ${locationStr}
- **Architectural Style:** ${archStyle} ${architects ? `(inspired by ${architects})` : ''}
- **Scale/Layout:** ${techSpecs}
- **Materials:** ${materialsList}
- **Palette:** ${colors}
- **Finish Level:** ${finish}

**SITE & ENVIRONMENT**
- **Setting:** ${environment}
- **Landscaping:** ${landscaping}
- **Atmosphere:** ${moodDesc}

**PHOTOGRAPHY CONFIGURATION**
- **Settings:** ${camera}
- **Human Scale:** ${params.humanContext !== "Sin personas" ? params.humanContext : "None, focus on architecture"}
- **Quality:** 8K resolution, photorealistic, highly detailed, cinematic lighting, architectural visualization masterpiece, sharp focus.

**SPECIFIC INSTRUCTIONS**
${params.additionalNotes ? `- User Notes: ${params.additionalNotes}` : ''}
${lotInstruction ? `- LOT INTEGRATION: ${lotInstruction}` : ''}
${analysisResult ? `- REFERENCE STYLE: Incorporate these visual elements: ${analysisResult}` : ''}

**FINAL DIRECTIVE**
Ensure the image is a cohesive, photorealistic exterior shot with perfect perspective correction and lighting. The entire building should be visible within the frame.
    `.trim();

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

    const firstCandidate = candidates[0];
    const parts = firstCandidate?.content?.parts;
    const imagePart = parts?.find(part => part.inlineData);
    
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
