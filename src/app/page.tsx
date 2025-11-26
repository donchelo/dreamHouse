'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import ReferenceUploader from '@/components/ReferenceUploader';
import ParameterForm from '@/components/ParameterForm';
import ResultDisplay from '@/components/ResultDisplay';
import { DreamHouseParams, DEFAULT_PARAMS } from '@/types';
import { Wand2, AlertCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [params, setParams] = useState<DreamHouseParams>(DEFAULT_PARAMS);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
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
      
      // Scroll to result
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
    <div className="min-h-screen relative">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto pt-12 pb-16 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border text-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground">Potenciado por IA Generativa</span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Diseña tu casa ideal
            <br />
            <span className="text-gradient">con inteligencia artificial</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Define los parámetros arquitectónicos, sube referencias visuales y deja que nuestro 
            arquitecto virtual cree visualizaciones impresionantes de tu proyecto.
          </p>
          
          {/* Quick CTA */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <a 
              href="#form" 
              className="group flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-glow transition-colors"
            >
              Empezar ahora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>

        {/* Main Form Area */}
        <div id="form" className="space-y-10 scroll-mt-8">
          
          {/* Reference Uploader Card */}
          <section className="card-dark p-6 md:p-8">
            <ReferenceUploader files={files} onFilesChange={setFiles} />
          </section>
          
          {/* Parameters Section */}
          <section className="space-y-6">
            <ParameterForm 
              params={params} 
              onChange={setParams} 
              disabled={isLoading}
            />
          </section>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-xl text-sm border border-destructive/20 flex items-center gap-3 animate-fade-in-up">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Generate Button */}
          <div className="flex justify-center py-8">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="group relative flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-full text-lg font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 active:translate-y-0 active:shadow-lg"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              
              {/* Content */}
              <span className="relative flex items-center gap-3">
                <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                {isLoading ? 'Generando Diseño...' : 'Generar Render'}
              </span>
            </button>
          </div>

          {/* Result Display */}
          <div id="result" className="scroll-mt-8">
            <ResultDisplay 
              imageUrl={imageUrl} 
              isLoading={isLoading} 
              onRegenerate={handleGenerate} 
            />
          </div>
          
        </div>
      </main>
      
      {/* Footer subtle */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>DreamHouse AI Architect</p>
            <p className="font-mono text-xs">v0.1.0 MVP</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
