'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import ReferenceUploader from '@/components/ReferenceUploader';
import ParameterForm from '@/components/ParameterForm';
import ResultDisplay from '@/components/ResultDisplay';
import { DreamHouseParams, DEFAULT_PARAMS } from '@/types';
import { Wand2, AlertCircle } from 'lucide-react';

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
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
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
    <div className="min-h-screen pb-32">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Form Area */}
          <div className="lg:col-span-12 space-y-10">
            
            <div className="space-y-2 text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Diseña tu casa ideal con IA
              </h2>
              <p className="text-lg text-gray-500">
                Define los parámetros, sube referencias y deja que nuestro arquitecto virtual cree visualizaciones impresionantes.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 space-y-10">
              <ReferenceUploader files={files} onFilesChange={setFiles} />
              
              <div className="border-t border-gray-100 pt-10">
                 <ParameterForm 
                  params={params} 
                  onChange={setParams} 
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            <div className="flex justify-center pt-8 pb-12">
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="group relative flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none active:scale-95"
              >
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                {isLoading ? 'Generando Diseño...' : 'Generar Render'}
              </button>
            </div>

            <ResultDisplay 
              imageUrl={imageUrl} 
              isLoading={isLoading} 
              onRegenerate={handleGenerate} 
            />
            
          </div>
        </div>
      </main>
    </div>
  );
}
