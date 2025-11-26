import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { DreamHouseParams } from '@/types';

// Initialize Gemini Client
// We use process.env directly here. Ensure GEMINI_API_KEY is set.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
        // Continue without analysis if it fails, but log it.
      }
    }

    // --- Step 2: Construct Prompt ---
    
    // Base components
    const basePrompt = "Architectural exterior photography of a residential house";
    const context = params.city ? `located in ${params.city}` : "";
    const architect = params.architect !== "Sin arquitecto específico" ? `designed in the style of ${params.architect}` : "";
    
    const styles = params.architecturalStyles.length > 0 ? `Style: ${params.architecturalStyles.join(', ')}` : "";
    const materials = params.materials.length > 0 ? `Materials: ${params.materials.join(', ')}` : "";
    
    const uniqueParams = [
      `Climate: ${params.climate}`,
      `Environment: ${params.environment}`,
      `Size: ${params.size}`,
      `${params.levels} levels`,
      `Roof: ${params.roofType}`,
      `Time: ${params.timeOfDay}`,
      `Season: ${params.season}`,
      `Angle: ${params.cameraAngle}`
    ].join(", ");

    const multiParams = [
      params.exteriorElements.length > 0 ? `Elements: ${params.exteriorElements.join(', ')}` : "",
      params.vegetation.length > 0 ? `Vegetation: ${params.vegetation.join(', ')}` : "",
      params.colorPalette.length > 0 ? `Colors: ${params.colorPalette.join(', ')}` : ""
    ].filter(Boolean).join(". ");

    const refAnalysis = analysisResult ? `\nReference Analysis Influence: ${analysisResult}` : "";
    
    const qualitySuffix = "8K, ultra detailed, photorealistic, professional architectural photography, award-winning design, cinematic lighting, high resolution";

    // Combine everything
    const fullPrompt = `
      ${basePrompt} ${context} ${architect}.
      ${styles}. ${materials}.
      Parameters: ${uniqueParams}.
      Details: ${multiParams}.
      ${refAnalysis}
      ${qualitySuffix}
    `.trim();

    console.log("Generated Prompt:", fullPrompt);

    // --- Step 3: Generate Image ---
    const generationResponse = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: [{ parts: [{ text: fullPrompt }] }],
      config: {
        tools: [{ googleSearch: {} }], // Grounding
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "4K" // As per PRD
        }
      }
    });

    // Extract image data
    // The response structure for image generation usually contains inlineData in parts
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

