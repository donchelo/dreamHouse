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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-gray-500" />
            Referentes Visuales
          </h3>
          <p className="text-sm text-gray-500 mt-1">Sube imágenes para guiar el estilo (Max 5)</p>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 rounded-full text-gray-600">
          {files.length}/5
        </span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {files.map((file, index) => (
          <div key={index} className="relative group aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white">
            <img
              src={URL.createObjectURL(file)}
              alt={`Ref ${index}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => removeFile(index)}
                className="bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-colors transform hover:scale-110 hover:rotate-90 duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        
        {files.length < 5 && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={clsx(
              "relative aspect-square rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden group",
              isDragging 
                ? "border-primary bg-primary/5 scale-[1.02]" 
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            )}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={handleFileInput}
            />
            <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:shadow-md transition-shadow">
              {isDragging ? (
                <Plus className="w-6 h-6 text-primary animate-pulse" />
              ) : (
                <Upload className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
              )}
            </div>
            <span className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
              {isDragging ? 'Suelta aquí' : 'Añadir imagen'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
