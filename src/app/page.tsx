'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import ReferenceUploader from '@/components/ReferenceUploader';
import LotUploader from '@/components/LotUploader';
import ParameterForm from '@/components/ParameterForm';
import ResultDisplay from '@/components/ResultDisplay';
import { DreamHouseParams, DEFAULT_PARAMS } from '@/types';
import { Wand2, AlertCircle, ArrowRight, Zap, Layers, Palette } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Feature cards for hero section
const FEATURES = [
  { icon: Zap, label: 'Ultra fast', desc: '30-60s' },
  { icon: Layers, label: 'High Res', desc: 'Up to 4K' },
  { icon: Palette, label: 'Custom', desc: '100+ Options' },
];

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [lotFile, setLotFile] = useState<File | null>(null);
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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      
      {/* Hero Section - Full Width */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center bg-black">
         {/* Full Background Image */}
         <div className="absolute inset-0 z-0">
             <Image
               src="/images/dreamhouse-render.png"
               alt="Architectural Render of a Modern Home"
               fill
               className="object-cover opacity-60"
               priority
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
         </div>

         {/* Content Overlay */}
         <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-20">
            {/* Left: Main Text */}
            <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-4 mb-4">
                   <span className="text-primary text-7xl md:text-9xl font-bold tracking-tighter leading-none opacity-100 drop-shadow-2xl">01</span>
                   <div className="h-[1px] w-20 bg-primary/50 hidden md:block" />
                   <span className="text-white/80 text-sm font-mono uppercase tracking-widest hidden md:block">AI Generative Studio</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase text-white leading-[0.85]">
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
                     <span className="text-4xl font-bold text-primary-foreground">02</span>
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
        <div id="form" className="max-w-[1400px] mx-auto pt-20 space-y-20">
          
          {/* Reference Uploader Section */}
          <section>
            <div className="flex items-end justify-between mb-10 border-b border-border pb-4">
               <h2 className="text-4xl font-bold uppercase tracking-tight">
                01. References
              </h2>
              <p className="text-sm font-mono text-muted-foreground hidden sm:block">Upload images to guide the AI style</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ReferenceUploader files={files} onFilesChange={setFiles} />
              <LotUploader file={lotFile} onFileChange={setLotFile} />
            </div>
          </section>
          
          {/* Parameters Section */}
          <section>
            <div className="flex items-end justify-between mb-10 border-b border-border pb-4">
              <h2 className="text-4xl font-bold uppercase tracking-tight">
                02. Parameters
              </h2>
              <p className="text-sm font-mono text-muted-foreground hidden sm:block">Configure every detail</p>
            </div>

            <ParameterForm 
              params={params} 
              onChange={setParams} 
              disabled={isLoading}
            />
          </section>

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

          {/* Generate Button */}
          <div className="flex justify-center py-10 border-t border-border">
            <Button
              onClick={handleGenerate}
              isLoading={isLoading}
              size="lg"
              className="w-full md:w-auto px-20 py-8 text-xl uppercase tracking-widest hover:scale-105 transition-transform"
            >
              {isLoading ? 'Processing...' : 'Generate Render'}
              {!isLoading && <Wand2 className="ml-3 w-6 h-6" />}
            </Button>
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
