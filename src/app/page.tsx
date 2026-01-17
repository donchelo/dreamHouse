'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import ReferenceUploader from '@/components/ReferenceUploader';
import LotUploader from '@/components/LotUploader';
import FloorPlanUploader from '@/components/FloorPlanUploader';
import InspirationCanvas from '@/components/InspirationCanvas';
import ParameterForm from '@/components/ParameterForm';
import ResultDisplay from '@/components/ResultDisplay';
import PromptPreview from '@/components/PromptPreview';
import { DreamHouseParams, DEFAULT_PARAMS } from '@/types';
import { Wand2, AlertCircle, ArrowRight, RotateCcw, Dices, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import * as C from '@/app/constants';
import clsx from 'clsx';

// Hero images for slideshow
const HERO_IMAGES = [
  "/images/dreamhouse-render.png",
  "/images/dreamhouse-render (1).png"
];

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [lotFile, setLotFile] = useState<File | null>(null);
  const [inspirationFile, setInspirationFile] = useState<File | null>(null);
  const [floorPlanFile, setFloorPlanFile] = useState<File | null>(null);
  const [params, setParams] = useState<DreamHouseParams>(DEFAULT_PARAMS);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [floorPlanImageUrl, setFloorPlanImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Tab state
  const [currentTab, setCurrentTab] = useState<'basics' | 'rendering'>('basics');
  
  const handleTabChange = (tab: 'basics' | 'rendering') => {
    setCurrentTab(tab);
    setActiveSection(null); // Reset active accordion section when switching tabs
  };
  
  // Accordion state - null means all closed by default
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSection = (id: string) => {
    setActiveSection(prev => prev === id ? null : id);
  };

  const handleReset = () => {
    setParams({ ...DEFAULT_PARAMS, city: "", technicalNotes: "", artDirection: "" });
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
      fpOutputResolution: pick(C.OUTPUT_RESOLUTIONS),
      fpAspectRatio: pick(C.ASPECT_RATIOS),
      renderOutputResolution: pick(C.OUTPUT_RESOLUTIONS),
      renderAspectRatio: pick(C.ASPECT_RATIOS),
      city: params.city,
      technicalNotes: params.technicalNotes,
      artDirection: params.artDirection
    };

    setParams(randomParams);
    showToast("Random design generated!");
  };

  const handleGenerateFloorPlan = async () => {
    setIsLoading(true);
    setError(null);
    setFloorPlanImageUrl(null);

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
      if (inspirationFile) {
        formData.append('inspirationImage', inspirationFile);
      }
      formData.append('params', JSON.stringify(params));
      formData.append('mode', 'floor-plan');

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error generating floor plan');
      }

      const data = await response.json();
      setFloorPlanImageUrl(data.imageUrl);
      showToast("Floor plan generated successfully!");
      
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

  const handleGenerateRender = async () => {
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
      if (inspirationFile) {
        formData.append('inspirationImage', inspirationFile);
      }
      // Priority: uploaded floor plan file > generated floor plan image
      if (floorPlanFile) {
        formData.append('floorPlanImage', floorPlanFile);
      } else if (floorPlanImageUrl) {
        // Convert data URL to blob and append as file
        const response = await fetch(floorPlanImageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'floor-plan.png', { type: blob.type });
        formData.append('floorPlanImage', file);
      }
      formData.append('params', JSON.stringify(params));
      formData.append('mode', 'render');

      const apiResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
        },
        body: formData,
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.message || 'Error generating render');
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
      
      {/* Hero Section - Full Width */}
      <section className="relative h-[70svh] md:h-[85vh] w-full overflow-hidden flex items-center justify-center bg-black">
         {/* Full Background Image */}
         <div className="absolute inset-0 z-0">
             {HERO_IMAGES.map((src, index) => (
               <Image
                 key={src}
                 src={src}
                 alt={`Architectural Render ${index + 1}`}
                 fill
                 className={`object-cover object-center transition-opacity duration-1000 ${
                   index === currentImageIndex ? 'opacity-60' : 'opacity-0'
                 }`}
                 priority={index === 0}
               />
             ))}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
         </div>

         {/* Content Overlay */}
         <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 md:pb-20">
            {/* Left: Main Text */}
            <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-4 mb-4">
                   <div className="h-[1px] w-20 bg-primary/50 hidden md:block" />
                   <span className="text-white/80 text-sm font-mono uppercase tracking-widest hidden md:block">AI Generative Studio</span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter uppercase text-white leading-[0.85]">
                   Dream<br />
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">House</span>
                </h1>
                <p className="text-white/70 max-w-xl text-lg font-light leading-relaxed pl-2 border-l border-primary/50">
                  Transform your sketches into photorealistic architectural renders in seconds. Powered by advanced AI.
                </p>
            </div>

            {/* Right: Actions & Badge */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end gap-8">
               <div className="bg-primary p-8 w-full max-w-sm hover:bg-primary/90 transition-colors cursor-pointer group" onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}>
                  <div className="flex items-center justify-between mb-4">
                     <ArrowRight className="w-6 h-6 text-primary-foreground group-hover:translate-x-2 transition-transform" />
                  </div>
                  <p className="text-primary-foreground/90 text-sm uppercase tracking-widest font-bold mb-6">
                     Start New Project
                  </p>
                  <Button 
                     className="w-full bg-black text-white hover:bg-white hover:text-black border-0 font-bold uppercase tracking-widest py-6"
                   >
                     Create Now
                  </Button>
               </div>
            </div>
         </div>
      </section>

      <main className="relative px-6 sm:px-8 lg:px-12 pb-32">
        {/* Main Form Area */}
        <div id="form" className="max-w-[1400px] mx-auto pt-20 space-y-12">
          
           {/* Global Actions - Reset & Randomize - Now at the top */}
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

          {/* Tab Switcher */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-border pb-6">
            <div className="flex bg-card border border-border p-1 rounded-none w-full md:w-auto">
              <button
                onClick={() => handleTabChange('basics')}
                className={clsx(
                  "flex-1 md:flex-none px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all",
                  currentTab === 'basics' 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                01. Floor Plan
              </button>
              <button
                onClick={() => handleTabChange('rendering')}
                className={clsx(
                  "flex-1 md:flex-none px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all",
                  currentTab === 'rendering' 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                02. Rendering
              </button>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-tighter">
              Current Step: <span className="text-foreground font-bold">{currentTab === 'basics' ? 'Architecture & Layout' : 'Visuals & Photography'}</span>
            </p>
          </div>
          
          {/* Inspiration Canvas Section - Only in Basics */}
          {currentTab === 'basics' && (
            <Section 
              title="Inspiración de Forma" 
              number="01" 
              isOpen={activeSection === 'inspiration'}
              onToggle={() => toggleSection('inspiration')}
            >
              <InspirationCanvas file={inspirationFile} onFileChange={setInspirationFile} />
            </Section>
          )}

          {/* Lot Uploader Section - Only in Basics */}
          {currentTab === 'basics' && (
            <Section 
              title="Lote" 
              number="02" 
              isOpen={activeSection === 'lot'}
              onToggle={() => toggleSection('lot')}
            >
              <LotUploader file={lotFile} onFileChange={setLotFile} />
            </Section>
          )}

          {/* Reference Uploader Section - Only in Rendering */}
          {currentTab === 'rendering' && (
            <Section 
              title="Referentes Visuales" 
              number="01" 
              isOpen={activeSection === 'references'}
              onToggle={() => toggleSection('references')}
            >
              <ReferenceUploader files={files} onFilesChange={setFiles} />
            </Section>
          )}

          {/* Floor Plan Uploader Section - Only in Rendering */}
          {currentTab === 'rendering' && (
            <Section 
              title="Plano de Planta" 
              number="02" 
              isOpen={activeSection === 'floorplan'}
              onToggle={() => toggleSection('floorplan')}
            >
              <FloorPlanUploader file={floorPlanFile} onFileChange={setFloorPlanFile} />
            </Section>
          )}
          
          {/* Parameters Section */}
          <ParameterForm 
            params={params} 
            onChange={setParams} 
            disabled={isLoading}
            activeSection={activeSection}
            onSectionChange={toggleSection}
            currentTab={currentTab}
          />

          {/* Tab Navigation Button */}
          {currentTab === 'basics' && floorPlanImageUrl && (
            <div className="flex justify-center pt-8">
              <button
                onClick={() => {
                  handleTabChange('rendering');
                  window.scrollTo({ top: document.getElementById('form')?.offsetTop || 0, behavior: 'smooth' });
                }}
                className="group flex items-center gap-3 px-10 py-5 bg-card border border-border hover:border-primary transition-all text-sm font-bold uppercase tracking-widest"
              >
                Continue to Rendering
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

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

          {/* Floating Generate Button (FAB Style) */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
            {currentTab === 'basics' ? (
              <Button
                onClick={handleGenerateFloorPlan}
                isLoading={isLoading}
                size="lg"
                className="rounded-full shadow-2xl hover:shadow-primary/40 active:scale-95 transition-all text-base font-bold uppercase tracking-widest px-10 py-8 bg-primary text-primary-foreground border-4 border-background focus:ring-4 focus:ring-primary/30 outline-none"
                aria-label="Generate floor plan"
              >
                {isLoading ? 'Generating Plan...' : 'Generate Floor Plan'}
                {!isLoading && <Wand2 className="ml-3 w-5 h-5" />}
              </Button>
            ) : (
              <Button
                onClick={handleGenerateRender}
                isLoading={isLoading}
                size="lg"
                className="rounded-full shadow-2xl hover:shadow-primary/40 active:scale-95 transition-all text-base font-bold uppercase tracking-widest px-10 py-8 bg-primary text-primary-foreground border-4 border-background focus:ring-4 focus:ring-primary/30 outline-none"
                aria-label="Generate architectural render"
              >
                {isLoading ? 'Rendering...' : 'Generate Render'}
                {!isLoading && <Wand2 className="ml-3 w-5 h-5" />}
              </Button>
            )}
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
                {currentTab === 'basics' ? (
                  <ResultDisplay 
                    imageUrl={floorPlanImageUrl} 
                    isLoading={isLoading} 
                    onRegenerate={handleGenerateFloorPlan}
                    title="Floor Plan"
                    subtitle="Architectural layout visualization"
                  />
                ) : (
                  <ResultDisplay 
                    imageUrl={imageUrl} 
                    isLoading={isLoading} 
                    onRegenerate={handleGenerateRender}
                    title="Final Render"
                    subtitle="Photorealistic architectural visualization"
                  />
                )}
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
