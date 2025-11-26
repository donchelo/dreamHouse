'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import ReferenceUploader from '@/components/ReferenceUploader';
import ParameterForm from '@/components/ParameterForm';
import ResultDisplay from '@/components/ResultDisplay';
import { DreamHouseParams, DEFAULT_PARAMS } from '@/types';
import { Wand2 } from 'lucide-react';

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
      // Create FormData to send files and params
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
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4">
        <Header />
        
        <main className="space-y-8 bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-100">
          
          <ReferenceUploader files={files} onFilesChange={setFiles} />
          
          <ParameterForm 
            params={params} 
            onChange={setParams} 
            disabled={isLoading}
          />

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-md text-sm border border-red-200">
              {error}
            </div>
          )}

          <div className="flex justify-center pt-4">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="group flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full text-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg"
            >
              <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {isLoading ? 'Generando...' : 'Generar DreamHouse'}
            </button>
          </div>

          <ResultDisplay 
            imageUrl={imageUrl} 
            isLoading={isLoading} 
            onRegenerate={handleGenerate} 
          />
          
        </main>
      </div>
    </div>
  );
}
