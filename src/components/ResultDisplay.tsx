import React from 'react';
import { Download, RefreshCw, Wand2 } from 'lucide-react';

interface ResultDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  onRegenerate: () => void;
}

export default function ResultDisplay({ imageUrl, isLoading, onRegenerate }: ResultDisplayProps) {
  if (!imageUrl && !isLoading) return null;

  return (
    <div className="mt-12 space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">Resultado Final</h3>
        <span className="text-xs text-gray-400 font-mono uppercase tracking-widest">
          {isLoading ? 'PROCESANDO...' : 'RENDER COMPLETO'}
        </span>
      </div>
      
      <div className="relative aspect-video w-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-gray-900">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-800 border-t-primary rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <Wand2 className="w-6 h-6 text-primary animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
               <p className="text-white font-medium text-lg tracking-wide">Construyendo tu visión...</p>
               <p className="text-gray-500 text-sm">Esto puede tomar unos segundos</p>
            </div>
          </div>
        ) : imageUrl ? (
          <>
            <img 
              src={imageUrl} 
              alt="Generated DreamHouse" 
              className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute bottom-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
               <button
                onClick={onRegenerate}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all hover:scale-105"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerar
              </button>
              <a
                href={imageUrl}
                download="dreamhouse-render.png"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-full hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Download className="w-4 h-4" />
                Descargar HD
              </a>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
