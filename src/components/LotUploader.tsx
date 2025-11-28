'use client';

import React, { useCallback, useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Map, Trash2, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

interface LotUploaderProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export default function LotUploader({ file, onFileChange }: LotUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = Array.from(e.dataTransfer.files).find(f => 
      f.type.startsWith('image/')
    );
    
    if (droppedFile) {
      onFileChange(droppedFile);
    }
  }, [onFileChange]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith('image/')) {
        onFileChange(selectedFile);
      }
    }
  }, [onFileChange]);

  const removeFile = useCallback(() => {
    onFileChange(null);
  }, [onFileChange]);

  return (
    <div className="space-y-4 p-5 sm:p-6" role="region" aria-labelledby="lot-uploader-title">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl border border-green-500/20">
            <Map className="w-5 h-5 text-green-500" />
          </div>
        </div>
        <div>
          <h3 id="lot-uploader-title" className="text-lg font-semibold text-foreground flex items-center gap-2">
            Foto del Lote / Terreno
            <span className="text-xs font-normal text-muted-foreground border border-border px-2 py-0.5 rounded-full">Opcional</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Sube una foto real del lugar donde se construirá. La IA adaptará el diseño al entorno.
          </p>
        </div>
      </div>

      <div className="mt-4">
        {!file ? (
          <div
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={clsx(
              "relative h-40 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden group cursor-pointer bg-card/50",
              isDragging 
                ? "border-green-500 bg-green-500/10" 
                : "border-border hover:border-green-500/50 hover:bg-card-elevated"
            )}
          >
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={handleFileInput}
              aria-label="Subir foto del lote"
            />
            
            <div className={clsx(
              "p-3 rounded-full mb-2 transition-all duration-300",
              isDragging ? "bg-green-500/20" : "bg-card group-hover:bg-green-500/10"
            )}>
              <Upload className={clsx("w-6 h-6", isDragging ? "text-green-500" : "text-muted-foreground group-hover:text-green-500")} />
            </div>
            
            <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              <span className="text-green-500 font-semibold">Haz clic para subir</span> o arrastra la foto aquí
            </p>
          </div>
        ) : (
          <div className="relative group rounded-2xl overflow-hidden border border-border bg-card h-64 sm:h-80 transition-all hover:border-green-500/50 hover:shadow-lg">
            <img
              src={URL.createObjectURL(file)}
              alt="Vista previa del lote"
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button
                onClick={removeFile}
                className="flex items-center gap-2 px-4 py-2 bg-destructive text-white rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar foto
              </button>
            </div>

            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <CheckCircle2 className="w-3 h-3" />
              Lote cargado
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

