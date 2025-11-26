import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon, Plus } from 'lucide-react';
import clsx from 'clsx';

interface ReferenceUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export default function ReferenceUploader({ files, onFilesChange }: ReferenceUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

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
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2.5">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <ImageIcon className="w-4 h-4 text-primary" />
            </div>
            Referentes Visuales
          </h3>
          <p className="text-sm text-muted-foreground mt-1.5">
            Sube imágenes para guiar el estilo arquitectónico
          </p>
        </div>
        <span className="text-xs font-mono font-medium px-3 py-1.5 bg-card-elevated rounded-lg text-muted-foreground border border-border">
          {files.length}/5
        </span>
      </div>
      
      {/* Upload Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {/* Uploaded Files */}
        {files.map((file, index) => (
          <div 
            key={index} 
            className="relative group aspect-square rounded-xl overflow-hidden border border-border bg-card hover:border-border-hover transition-all duration-300"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <img
              src={URL.createObjectURL(file)}
              alt={`Referencia ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <button
                onClick={() => removeFile(index)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all"
              >
                <X className="w-3.5 h-3.5" />
                Eliminar
              </button>
            </div>
            {/* Index Badge */}
            <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold text-white border border-white/10">
              {index + 1}
            </div>
          </div>
        ))}
        
        {/* Upload Zone */}
        {files.length < 5 && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={clsx(
              "relative aspect-square rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden group",
              isDragging 
                ? "border-primary bg-primary/5 scale-[1.02]" 
                : "border-border hover:border-border-hover hover:bg-card-elevated"
            )}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={handleFileInput}
            />
            
            {/* Icon */}
            <div className={clsx(
              "p-3 rounded-xl mb-3 transition-all duration-300",
              isDragging 
                ? "bg-primary/20" 
                : "bg-card group-hover:bg-card-elevated"
            )}>
              {isDragging ? (
                <Plus className="w-5 h-5 text-primary" />
              ) : (
                <Upload className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              )}
            </div>
            
            {/* Text */}
            <span className={clsx(
              "text-xs font-medium transition-colors",
              isDragging 
                ? "text-primary" 
                : "text-muted-foreground group-hover:text-foreground"
            )}>
              {isDragging ? 'Suelta aquí' : 'Añadir'}
            </span>
          </div>
        )}
      </div>
      
      {/* Tip */}
      {files.length === 0 && (
        <p className="text-xs text-muted text-center py-2">
          Arrastra imágenes o haz clic para subir referencias de estilo
        </p>
      )}
    </div>
  );
}
