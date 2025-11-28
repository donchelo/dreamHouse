'use client';

import React, { useCallback, useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Plus, Sparkles, Trash2 } from 'lucide-react';
import clsx from 'clsx';

interface ReferenceUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export default function ReferenceUploader({ files, onFilesChange }: ReferenceUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (droppedFiles.length > 0) {
      const newFiles = [...files, ...droppedFiles].slice(0, 5);
      onFilesChange(newFiles);
    }
  }, [files, onFilesChange]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(file => 
        file.type.startsWith('image/')
      );
      const newFiles = [...files, ...selectedFiles].slice(0, 5);
      onFilesChange(newFiles);
    }
  }, [files, onFilesChange]);

  const removeFile = useCallback((index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  }, [files, onFilesChange]);

  return (
    <div className="space-y-6 p-5 sm:p-6" role="region" aria-labelledby="uploader-title">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative" aria-hidden="true">
            <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/20">
              <ImageIcon className="w-5 h-5 text-primary" />
            </div>
            {/* Pulse ring */}
            {files.length === 0 && (
              <div className="absolute inset-0 rounded-xl border-2 border-primary/30 animate-[pulse-ring_2s_ease-out_infinite]" />
            )}
          </div>
          <div>
            <h3 id="uploader-title" className="text-lg font-semibold text-foreground flex items-center gap-2">
              Referentes Visuales
              {files.length > 0 && (
                <Sparkles className="w-4 h-4 text-primary animate-pulse" aria-hidden="true" />
              )}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              Sube imágenes de casas o estilos que te inspiren. La IA las usará como referencia visual para tu diseño.
            </p>
          </div>
        </div>
        
        {/* Counter */}
        <div className={clsx(
          "relative px-4 py-2 rounded-full border text-sm font-mono font-medium transition-all duration-300",
          files.length === 5 
            ? "bg-primary/10 border-primary/30 text-primary" 
            : "bg-card-elevated border-border text-muted-foreground"
        )}>
          <span className="text-foreground font-bold">{files.length}</span>
          <span className="text-muted-foreground">/5</span>
          {files.length === 5 && (
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-md -z-10" />
          )}
        </div>
      </div>
      
      {/* Upload Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {/* Uploaded Files */}
        {files.map((file, index) => (
          <div 
            key={index} 
            className={clsx(
              "relative group aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-500 cursor-pointer",
              "bg-card hover:border-primary/50",
              hoveredIndex === index ? "border-primary scale-[1.02] shadow-lg shadow-primary/10" : "border-border"
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ 
              animationDelay: `${index * 80}ms`,
              animation: 'fade-in-up 0.5s ease-out forwards'
            }}
          >
            <img
              src={URL.createObjectURL(file)}
              alt={`Referencia ${index + 1}`}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            
            {/* Actions */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={() => removeFile(index)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-destructive/80 backdrop-blur-sm rounded-full hover:bg-destructive transition-all transform hover:scale-105 active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </div>
            
            {/* Index Badge */}
            <div className={clsx(
              "absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300",
              hoveredIndex === index 
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30" 
                : "bg-black/70 backdrop-blur-sm text-white border-white/20"
            )}>
              {index + 1}
            </div>

            {/* Corner glow */}
            {hoveredIndex === index && (
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/30 rounded-full blur-2xl" />
            )}
          </div>
        ))}
        
        {/* Upload Zone */}
        {files.length < 5 && (
          <div
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={clsx(
              "relative aspect-square rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden group cursor-pointer",
              isDragging 
                ? "border-primary bg-primary/10 scale-[1.02] shadow-lg shadow-primary/20" 
                : "border-border hover:border-primary/50 hover:bg-card-elevated"
            )}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={handleFileInput}
            />
            
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, var(--border) 1px, transparent 0)`,
                backgroundSize: '20px 20px',
              }} />
            </div>
            
            {/* Icon */}
            <div className={clsx(
              "relative p-4 rounded-2xl mb-3 transition-all duration-300",
              isDragging 
                ? "bg-primary/20 scale-110" 
                : "bg-card group-hover:bg-primary/10 group-hover:scale-105"
            )}>
              {isDragging ? (
                <Plus className="w-6 h-6 text-primary animate-pulse" />
              ) : (
                <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
              
              {/* Glow */}
              {isDragging && (
                <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl -z-10" />
              )}
            </div>
            
            {/* Text */}
            <span className={clsx(
              "relative text-sm font-medium transition-colors",
              isDragging 
                ? "text-primary" 
                : "text-muted-foreground group-hover:text-foreground"
            )}>
              {isDragging ? 'Suelta aquí' : 'Añadir imagen'}
            </span>
            
            {/* Subtle hint */}
            <span className="text-[10px] text-muted mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              JPG, PNG, WebP
            </span>
          </div>
        )}
      </div>
      
      {/* Empty State Tip */}
      {files.length === 0 && (
        <div className="flex items-center justify-center gap-3 py-4 px-6 bg-card-elevated/50 rounded-xl border border-border">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Pro tip:</span> Sube fotos de casas que te inspiren para mejores resultados
          </p>
        </div>
      )}
    </div>
  );
}
