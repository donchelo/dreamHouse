'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import ReferenceUploader from '@/components/ReferenceUploader';
import LotUploader from '@/components/LotUploader';
import ParameterForm from '@/components/ParameterForm';
import ResultDisplay from '@/components/ResultDisplay';
import { DreamHouseParams, DEFAULT_PARAMS } from '@/types';
import { Wand2, AlertCircle, ArrowRight, Sparkles, Zap, Layers, Palette } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Feature cards for hero section
const FEATURES = [
  { icon: Zap, label: 'Ultra rápido', desc: '30-60 segundos' },
  { icon: Layers, label: 'Alta resolución', desc: 'Hasta 4K' },
  { icon: Palette, label: 'Personalizable', desc: '100+ opciones' },
];

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [lotFile, setLotFile] = useState<File | null>(null);
  const [params, setParams] = useState<DreamHouseParams>(DEFAULT_PARAMS);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Track mouse for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      if (lotFile) {
        formData.append('lotImage', lotFile);
      }
      formData.append('params', JSON.stringify(params));

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error generating image');
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
      
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
    <div className="min-h-screen relative bg-immersive overflow-x-hidden">
      
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/8 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-secondary/6 rounded-full blur-[120px] animate-float float-delayed" />
        <div className="absolute top-[40%] right-[10%] w-[25%] h-[25%] bg-primary/4 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <Header />
      
      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        
        {/* Hero Section with Spotlight */}
        <section 
          ref={heroRef}
          className="relative text-center max-w-5xl mx-auto py-16 sm:py-24 lg:py-32 space-y-10 overflow-hidden"
        >
          {/* Spotlight effect */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 107, 44, 0.15), transparent 40%)`,
            }}
          />

          {/* Badge */}
          <div className="relative inline-flex items-center gap-2.5 px-4 py-2 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full text-sm font-medium text-primary animate-fade-in-down">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>AI Powered Architecture</span>
            <span className="px-2 py-0.5 bg-primary/20 rounded-full text-xs">v2.0</span>
          </div>
          
          {/* Title */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
              <span className="text-foreground">Diseña tu</span>
              <br />
              <span className="text-gradient-animated">casa ideal</span>
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl font-light text-muted-foreground tracking-tight">
              con inteligencia artificial
            </p>
          </div>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Transforma tus ideas en visualizaciones fotorrealistas. <strong className="text-foreground/80">Paso 1:</strong> Sube imágenes de referencia. <strong className="text-foreground/80">Paso 2:</strong> Configura los parámetros. <strong className="text-foreground/80">Paso 3:</strong> Genera tu render con IA.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {FEATURES.map((feature, i) => (
              <div 
                key={i}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-card/50 backdrop-blur-sm border border-border rounded-full hover:border-primary/30 hover:bg-card transition-all duration-300 group cursor-default"
              >
                <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{feature.label}</p>
                  <p className="text-[10px] text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="flex items-center justify-center gap-6 pt-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <a 
              href="#form" 
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-bold text-primary-foreground bg-gradient-to-r from-primary via-primary-glow to-primary rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_-10px_var(--primary)] active:scale-100"
            >
              {/* Animated gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-glow to-primary bg-[length:200%_100%] animate-gradient-shift" />
              
              {/* Shine sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Comenzar a diseñar
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
          </div>
        </section>

        {/* Main Form Area */}
        <div id="form" className="space-y-16 scroll-mt-24">
          
          {/* Reference Uploader Card */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-gradient hover-lift">
                <div className="relative z-10 bg-card rounded-2xl overflow-hidden h-full">
                  <ReferenceUploader files={files} onFilesChange={setFiles} />
                </div>
              </div>
              <div className="border-gradient hover-lift">
                <div className="relative z-10 bg-card rounded-2xl overflow-hidden h-full">
                  <LotUploader file={lotFile} onFileChange={setLotFile} />
                </div>
              </div>
            </div>
          </section>
          
          {/* Parameters Section */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Section Header */}
            <div className="flex items-center gap-6 mb-10">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-border" aria-hidden="true" />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg border border-primary/20" aria-hidden="true">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground tracking-tight">
                    Parámetros de Diseño
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Configura cada aspecto de tu casa ideal. Expande las secciones para ver más opciones.
                  </p>
                </div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border to-border" aria-hidden="true" />
            </div>

            <ParameterForm 
              params={params} 
              onChange={setParams} 
              disabled={isLoading}
            />
          </section>

          {/* Error Message */}
          {error && (
            <div 
              className="p-5 bg-destructive/10 text-destructive rounded-2xl text-sm border border-destructive/20 flex items-center gap-4 animate-scale-up"
              role="alert"
              aria-live="assertive"
            >
              <div className="p-2 bg-destructive/20 rounded-lg" aria-hidden="true">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Error al generar</p>
                <p className="text-destructive/80">{error}</p>
              </div>
            </div>
          )}

          {/* Generate Button - Sticky */}
          <div className="sticky bottom-6 z-30 flex justify-center py-4 pointer-events-none">
            <div className="pointer-events-auto relative">
              {/* Glow backdrop */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 opacity-50" />
              
              <Button
                onClick={handleGenerate}
                isLoading={isLoading}
                size="lg"
                className="relative px-14 py-8 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 hover:scale-105 active:scale-100 border border-white/10 bg-gradient-to-r from-primary via-primary-glow to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] group"
                aria-label={isLoading ? 'Generando render, por favor espera...' : 'Generar render arquitectónico con los parámetros configurados'}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-white/10 pointer-events-none" />
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-3">
                  <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  {isLoading ? 'Generando Diseño...' : 'Generar Render'}
                </span>

                {/* Pulse ring when idle */}
                {!isLoading && (
                  <span className="absolute inset-0 rounded-full border-2 border-primary animate-[pulse-ring_2s_ease-out_infinite]" />
                )}
              </Button>
            </div>
          </div>

          {/* Result Display */}
          <div id="result" className="scroll-mt-24 pb-20">
            <ResultDisplay 
              imageUrl={imageUrl} 
              isLoading={isLoading} 
              onRegenerate={handleGenerate} 
            />
          </div>
          
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative border-t border-border/30 py-16 mt-20 bg-gradient-to-t from-card/50 to-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-primary-dark rounded-lg">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <p className="font-bold text-foreground">DreamHouse AI</p>
                <p className="text-xs text-muted-foreground">Arquitectura del futuro</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors cursor-pointer">Términos</a>
              <a href="#" className="hover:text-foreground transition-colors cursor-pointer">Privacidad</a>
              <a href="#" className="hover:text-foreground transition-colors cursor-pointer">Contacto</a>
            </div>
            
            <p className="font-mono text-xs text-muted opacity-50">v0.2.0 • Built with AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
