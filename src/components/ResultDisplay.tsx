import React from 'react';
import { Download, RefreshCw } from 'lucide-react';

interface ResultDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  onRegenerate: () => void;
}

export default function ResultDisplay({ imageUrl, isLoading, onRegenerate }: ResultDisplayProps) {
  if (!imageUrl && !isLoading) return null;

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-lg font-medium text-gray-700">Resultado</h3>
      
      <div className="relative aspect-video w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 animate-pulse">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Generando tu DreamHouse...</p>
          </div>
        ) : imageUrl ? (
          <img src={imageUrl} alt="Generated DreamHouse" className="w-full h-full object-cover" />
        ) : null}
      </div>

      {imageUrl && !isLoading && (
        <div className="flex justify-end gap-3">
          <button
            onClick={onRegenerate}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Regenerar
          </button>
          <a
            href={imageUrl}
            download="dreamhouse-render.png"
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Descargar
          </a>
        </div>
      )}
    </div>
  );
}

