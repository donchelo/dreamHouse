import React, { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
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
      <h3 className="text-lg font-medium text-gray-700">Referentes (Opcional)</h3>
      <p className="text-sm text-gray-500">Sube hasta 5 imágenes para inspirar el diseño (materiales, estilo, ambiente).</p>
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={clsx(
          "border-2 border-dashed rounded-lg p-8 transition-colors flex flex-col items-center justify-center text-center cursor-pointer",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
        )}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          id="file-upload"
          onChange={handleFileInput}
        />
        <label htmlFor="file-upload" className="cursor-pointer w-full h-full flex flex-col items-center">
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-gray-600 font-medium">Arrastra imágenes o haz clic para subir</span>
          <span className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP (Max 10MB)</span>
        </label>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          {files.map((file, index) => (
            <div key={index} className="relative group aspect-square rounded-md overflow-hidden bg-gray-100 border border-gray-200">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

