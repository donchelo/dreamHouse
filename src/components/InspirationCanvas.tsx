'use client';

import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Upload, Pencil, Trash2, CheckCircle2, Download, RotateCcw, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { validateImageFile, MAX_IMAGE_SIZE, formatFileSize } from '@/lib/image-validation';

interface InspirationCanvasProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

type Mode = 'upload' | 'draw';

export default function InspirationCanvas({ file, onFileChange }: InspirationCanvasProps) {
  const [mode, setMode] = useState<Mode>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Canvas drawing state
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Set drawing style
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, [mode]);

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
      const validation = validateImageFile(droppedFile, 'Imagen de inspiración');
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
        const validation = validateImageFile(selectedFile, 'Imagen de inspiración');
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
    setMode('upload');
  }, [onFileChange]);

  // Drawing functions
  const getPointFromEvent = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (mode !== 'draw') return;
    e.preventDefault();
    setIsDrawing(true);
    
    const point = getPointFromEvent(e);
    if (!point) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  }, [mode, getPointFromEvent]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || mode !== 'draw') return;
    e.preventDefault();

    const point = getPointFromEvent(e);
    if (!point) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  }, [isDrawing, mode, getPointFromEvent]);

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
  }, [isDrawing]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, []);

  const exportCanvasAsFile = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      
      const file = new File([blob], 'inspiration-shape.png', { type: 'image/png' });
      onFileChange(file);
      setMode('upload');
    }, 'image/png');
  }, [onFileChange]);

  const handleModeChange = useCallback((newMode: Mode) => {
    setMode(newMode);
    if (newMode === 'draw' && file) {
      // Clear file when switching to draw mode
      onFileChange(null);
    }
  }, [file, onFileChange]);

  return (
    <div className="space-y-4 p-5 sm:p-6" role="region" aria-labelledby="inspiration-canvas-title">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-xl border border-purple-500/20">
            <Pencil className="w-5 h-5 text-purple-500" />
          </div>
        </div>
        <div>
          <h3 id="inspiration-canvas-title" className="text-lg font-semibold text-foreground flex items-center gap-2">
            Inspiración de Forma
            <span className="text-xs font-normal text-muted-foreground border border-border px-2 py-0.5 rounded-full">Opcional</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Dibuja o sube una imagen con la forma básica de la casa. La IA usará esto como inspiración para la estructura.
          </p>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 bg-card border border-border p-1 rounded-xl">
        <button
          onClick={() => handleModeChange('upload')}
          className={clsx(
            "flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all",
            mode === 'upload'
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Upload className="w-4 h-4 inline mr-2" />
          Subir Imagen
        </button>
        <button
          onClick={() => handleModeChange('draw')}
          className={clsx(
            "flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all",
            mode === 'draw'
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Pencil className="w-4 h-4 inline mr-2" />
          Dibujar
        </button>
      </div>

      {/* Upload Mode */}
      {mode === 'upload' && (
        <div className="mt-4">
          {!file ? (
            <div
              ref={dropZoneRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={clsx(
                "relative h-64 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden group cursor-pointer bg-card/50",
                isDragging 
                  ? "border-purple-500 bg-purple-500/10" 
                  : "border-border hover:border-purple-500/50 hover:bg-card-elevated"
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleFileInput}
                aria-label="Subir imagen de inspiración"
              />
              
              <div className={clsx(
                "p-3 rounded-full mb-2 transition-all duration-300",
                isDragging ? "bg-purple-500/20" : "bg-card group-hover:bg-purple-500/10"
              )}>
                <Upload className={clsx("w-6 h-6", isDragging ? "text-purple-500" : "text-muted-foreground group-hover:text-purple-500")} />
              </div>
              
              <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                <span className="text-purple-500 font-semibold">Haz clic para subir</span> o arrastra la imagen aquí
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Puede ser un boceto, una foto o cualquier imagen con la forma que te inspire
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">
                Máx. {formatFileSize(MAX_IMAGE_SIZE)}
              </p>
            </div>
          ) : (
            <div className="relative group rounded-2xl overflow-hidden border border-border bg-card h-64 sm:h-80 transition-all hover:border-purple-500/50 hover:shadow-lg">
              <img
                src={URL.createObjectURL(file)}
                alt="Vista previa de inspiración"
                className="w-full h-full object-contain bg-muted/20"
              />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={removeFile}
                  className="flex items-center gap-2 px-4 py-2 bg-destructive text-white rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              </div>

              <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <CheckCircle2 className="w-3 h-3" />
                Inspiración cargada
              </div>
            </div>
          )}
        </div>
      )}

      {/* Draw Mode */}
      {mode === 'draw' && (
        <div className="mt-4 space-y-3">
          <div className="relative rounded-2xl border border-border bg-white overflow-hidden">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-96 cursor-crosshair touch-none"
              style={{ display: 'block' }}
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <button
              onClick={clearCanvas}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-card border border-border rounded-lg hover:bg-card-elevated transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Limpiar
            </button>
            <button
              onClick={exportCanvasAsFile}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-all"
            >
              <Download className="w-4 h-4" />
              Guardar y Usar
            </button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            Dibuja la forma básica de la casa. No tiene que ser perfecto, solo una guía para la inspiración.
          </p>
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

