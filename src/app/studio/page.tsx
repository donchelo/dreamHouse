'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import ReferenceUploader from '@/components/ReferenceUploader';
import LotUploader from '@/components/LotUploader';
import FloorPlanUploader from '@/components/FloorPlanUploader';
import ParameterForm from '@/components/ParameterForm';
import ResultDisplay from '@/components/ResultDisplay';
import PromptPreview from '@/components/PromptPreview';
import { DreamHouseParams, DEFAULT_PARAMS } from '@/types';
import { Wand2, AlertCircle, RotateCcw, Dices, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import * as C from '@/app/constants';

export default function StudioPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [lotFile, setLotFile] = useState<File | null>(null);
  const [floorPlanFile, setFloorPlanFile] = useState<File | null>(null);
  const [params, setParams] = useState<DreamHouseParams>(DEFAULT_PARAMS);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Accordion state - null means all closed by default
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSection = (id: string) => {
    setActiveSection(prev => prev === id ? null : id);
  };

  const handleReset = () => {
    setParams({
      ...DEFAULT_PARAMS,
      city: "",
      technicalNotes: "",
      artDirection: "",
      negativePrompt: ""
    });
    showToast("Parameters reset to default");
  };

  const handleRandomize = () => {
    const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    const pickMulti = (arr: string[], maxRandom: number = 3): string[] => {
      const count = Math.floor(Math.random() * maxRandom) + 1;
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const randomParams: DreamHouseParams = {
      ...params,
      projectType: pick(C.PROJECT_TYPES),
      architecturalStyles: pickMulti(C.STYLES, 3),
      architect: pickMulti(C.ARCHITECTS, 2),
      mood: pick(C.MOODS),
      climate: pick(C.CLIMATES),
      environment: pick(C.ENVIRONMENTS),
      waterBody: pick(C.WATER_BODIES),
      weatherCondition: pick(C.WEATHER_CONDITIONS),
      size: pick(C.SIZES),
      levels: Math.floor(Math.random() * 3) + 1,
      bedrooms: Math.floor(Math.random() * 5) + 2,
      bathrooms: Math.floor(Math.random() * 4) + 1,
      parkingSpots: Math.floor(Math.random() * 3),
      kitchenType: pick(C.KITCHEN_TYPES),
      livingAreaType: pick(C.LIVING_AREA_TYPES),
      layoutType: pick(C.LAYOUT_TYPES),
      socialAreas: pickMulti(C.SOCIAL_AREAS, 3),
      roofType: pick(C.ROOF_TYPES),
      materials: pickMulti(C.MATERIALS, 4),
      finishLevel: pick(C.FINISH_LEVELS),
      colorPalette: pickMulti(C.COLORS, 3),
      exteriorElements: pickMulti(C.EXTERIOR_ELEMENTS, 5),
      vegetation: pickMulti(C.VEGETATION, 3),
      cameraAngle: pick(C.ANGLES),
      composition: pick(C.COMPOSITIONS),
      timeOfDay: pick(C.TIMES_OF_DAY),
      season: pick(C.SEASONS),
      lighting: pick(C.LIGHTING_TYPES),
      humanContext: pick(C.HUMAN_CONTEXT),
      renderOutputResolution: pick(C.OUTPUT_RESOLUTIONS),
      renderAspectRatio: pick(C.ASPECT_RATIOS),
      city: params.city,
      technicalNotes: params.technicalNotes,
      artDirection: params.artDirection,
    };

    setParams(randomParams);
    showToast("Random design generated!");
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const apiKey = localStorage.getItem('GEMINI_API_KEY');
      if (!apiKey) {
        throw new Error('Por favor, configura tu GEMINI_API_KEY en el encabezado.');
      }

      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      if (lotFile) {
        formData.append('lotImage', lotFile);
      }
      if (floorPlanFile) {
        formData.append('floorPlanImage', floorPlanFile);
      }
      formData.append('params', JSON.stringify(params));

      const apiResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
        },
        body: formData,
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.message || 'Error generating exterior');
      }

      const data = await apiResponse.json();
      setImageUrl(data.imageUrl);
      showToast("Render generated successfully!");

      setTimeout(() => {
        document.getElementById('result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />

      <main id="studio" className="relative px-6 sm:px-8 lg:px-12 pb-32 bg-background">
        {/* Main Form Area */}
        <div id="form" className="max-w-[1400px] mx-auto pt-32 space-y-12">
            <div className="flex flex-col gap-4 mb-12">
                <h2 className="text-sm font-mono text-primary uppercase tracking-[0.4em] font-bold">El Estudio</h2>
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Diseña tu <span className="text-outline">Propia</span> Obra Maestra.</h3>
            </div>
           {/* Global Actions - Reset & Randomize */}
           <div className="flex justify-end gap-3 sticky top-20 z-20 pointer-events-none mb-8">
            <div className="pointer-events-auto flex gap-0 border border-border bg-background shadow-lg">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isLoading}
                  className="group flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider text-muted-foreground bg-transparent hover:bg-foreground hover:text-background transition-colors"
                  aria-label="Restablecer todos los parámetros a sus valores predeterminados"
                  title="Restablecer formulario"
                >
                  <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" aria-hidden="true" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
                <div className="w-px bg-border" aria-hidden="true" />
                <button
                  type="button"
                  onClick={handleRandomize}
                  disabled={isLoading}
                  className="group flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Generar una combinación aleatoria de parámetros para inspiración"
                  title="Generar diseño aleatorio"
                >
                  <Dices className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" aria-hidden="true" />
                  <span>Surprise Me</span>
                </button>
            </div>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed top-24 right-6 z-50 animate-fade-in-up">
              <div className="bg-foreground text-background px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold uppercase tracking-wide">{toastMessage}</span>
              </div>
            </div>
          )}

          {/* Reference Images */}
          <Section
            title="Referentes Visuales"
            number="01"
            isOpen={activeSection === 'references'}
            onToggle={() => toggleSection('references')}
          >
            <ReferenceUploader files={files} onFilesChange={setFiles} />
          </Section>

          {/* Lot */}
          <Section
            title="Lote"
            number="02"
            isOpen={activeSection === 'lot'}
            onToggle={() => toggleSection('lot')}
          >
            <LotUploader file={lotFile} onFileChange={setLotFile} />
          </Section>

          {/* Floor Plan */}
          <Section
            title="Plano de Planta"
            number="03"
            isOpen={activeSection === 'floorplan'}
            onToggle={() => toggleSection('floorplan')}
          >
            <FloorPlanUploader file={floorPlanFile} onFileChange={setFloorPlanFile} />
          </Section>

          {/* Parameters */}
          <ParameterForm
            params={params}
            onChange={setParams}
            disabled={isLoading}
            activeSection={activeSection}
            onSectionChange={toggleSection}
          />

          {/* Error Message */}
          {error && (
            <div className="p-6 bg-destructive text-destructive-foreground flex items-center gap-4">
              <AlertCircle className="w-6 h-6" />
              <div>
                <p className="font-bold uppercase">Generation Error</p>
                <p className="opacity-90">{error}</p>
              </div>
            </div>
          )}

          {/* Floating Generate Button */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
            <Button
              onClick={handleGenerate}
              isLoading={isLoading}
              size="lg"
              className="rounded-full shadow-2xl hover:shadow-primary/40 active:scale-95 transition-all text-base font-bold uppercase tracking-widest px-10 py-8 bg-primary text-primary-foreground border-4 border-background focus:ring-4 focus:ring-primary/30 outline-none"
              aria-label="Generate exterior render"
            >
              {isLoading ? 'Generating...' : 'Generate Exterior'}
              {!isLoading && <Wand2 className="ml-3 w-5 h-5" />}
            </Button>
          </div>

          {/* Result Section with Prompt Preview */}
          <div id="result" className="scroll-mt-24 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Prompt DNA (Tags) */}
              <div className="lg:col-span-3 lg:order-1 order-2">
                <div className="bg-card border border-border rounded-xl p-4 h-full max-h-[600px] overflow-hidden sticky top-24">
                  <PromptPreview params={params} />
                </div>
              </div>

              {/* Right Column: Result Image */}
              <div className="lg:col-span-9 lg:order-2 order-1">
                <ResultDisplay
                  imageUrl={imageUrl}
                  isLoading={isLoading}
                  onRegenerate={handleGenerate}
                  title="Final Exterior"
                  subtitle="Photorealistic architectural visualization"
                />
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-20 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <h2 className="text-4xl font-bold uppercase tracking-tighter mb-6">DreamHouse AI</h2>
            <div className="flex gap-8 text-sm font-medium uppercase tracking-wide opacity-80">
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          <div className="text-right">
            <p className="text-primary font-bold mb-2">Architecture Studio</p>
            <p className="text-sm opacity-50 font-mono">© 2025 DreamHouse Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
