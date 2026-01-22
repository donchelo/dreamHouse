'use client';

import React, { useCallback, useState, useRef } from 'react';
import { Upload, Sofa, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import { validateImageFile, MAX_IMAGE_SIZE, formatFileSize } from '@/lib/image-validation';
import { Select } from './ui/Select';
import * as C from '@/app/constants';

interface RoomUploaderProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  roomType: string;
  onRoomTypeChange: (roomType: string) => void;
}

export default function RoomUploader({ file, onFileChange, roomType, onRoomTypeChange }: RoomUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    setError(null);
    
    const droppedFile = Array.from(e.dataTransfer.files).find(f => 
      f.type.startsWith('image/')
    );
    
    if (droppedFile) {
      const validation = validateImageFile(droppedFile, 'Imagen de la habitación');
      if (!validation.valid) {
        setError(validation.error || 'Error al validar imagen');
        return;
      }
      onFileChange(droppedFile);
    }
  }, [onFileChange]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith('image/')) {
        const validation = validateImageFile(selectedFile, 'Imagen de la habitación');
        if (!validation.valid) {
          setError(validation.error || 'Error al validar imagen');
          return;
        }
        onFileChange(selectedFile);
      }
    }
  }, [onFileChange]);

  const removeFile = useCallback(() => {
    onFileChange(null);
  }, [onFileChange]);

  return (
    <div className="space-y-4 p-5 sm:p-6" role="region" aria-labelledby="room-uploader-title">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl border border-blue-500/20">
            <Sofa className="w-5 h-5 text-blue-500" />
          </div>
        </div>
        <div>
          <h3 id="room-uploader-title" className="text-lg font-semibold text-foreground flex items-center gap-2">
            Foto de Habitación Existente
            <span className="text-xs font-normal text-muted-foreground border border-border px-2 py-0.5 rounded-full">Opcional</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Opcionalmente sube una foto de una habitación real para decorarla. <strong className="text-foreground">Si subes una foto, debes indicar obligatoriamente qué tipo de habitación es.</strong> La IA decorará este espacio manteniendo la estructura original (paredes, suelo, puertas, ventanas) y añadiendo muebles, iluminación y elementos decorativos según tus preferencias de estilo.
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
                ? "border-blue-500 bg-blue-500/10" 
                : "border-border hover:border-blue-500/50 hover:bg-card-elevated"
            )}
          >
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={handleFileInput}
              aria-label="Subir foto de la habitación"
            />
            
            <div className={clsx(
              "p-3 rounded-full mb-2 transition-all duration-300",
              isDragging ? "bg-blue-500/20" : "bg-card group-hover:bg-blue-500/10"
            )}>
              <Upload className={clsx("w-6 h-6", isDragging ? "text-blue-500" : "text-muted-foreground group-hover:text-blue-500")} />
            </div>
            
            <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              <span className="text-blue-500 font-semibold">Haz clic para subir</span> o arrastra la foto aquí
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              Máx. {formatFileSize(MAX_IMAGE_SIZE)}
            </p>
          </div>
        ) : (
          <div className="relative group rounded-2xl overflow-hidden border border-border bg-card h-64 sm:h-80 transition-all hover:border-blue-500/50 hover:shadow-lg">
            <Image
              src={URL.createObjectURL(file)}
              alt="Vista previa de la habitación"
              fill
              className="object-cover"
              unoptimized
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

            <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <CheckCircle2 className="w-3 h-3" />
              Habitación cargada
            </div>
          </div>
        )}
      </div>

      {/* Room Type Selector - Only show when file is uploaded */}
      {file && (
        <div className="mt-4 space-y-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Tipo de Habitación
              <span className="text-destructive ml-1">*</span>
            </label>
            <p className="text-[11px] text-muted-foreground opacity-60 font-mono tracking-tight">
              <strong className="text-destructive">Obligatorio:</strong> Indica qué tipo de habitación es la que subiste
            </p>
          </div>
          <Select 
            label=""
            value={roomType}
            onChange={(e) => onRoomTypeChange(e.target.value)}
            options={C.ROOM_TYPES}
          />
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
}
