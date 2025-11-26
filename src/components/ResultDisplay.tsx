import React, { useState, useEffect, useCallback } from 'react';
import { Download, RefreshCw, Sparkles, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react';

// Mensajes divertidos para el estado de carga
const LOADING_MESSAGES = [
  { main: "Analizando tu visión...", sub: "Interpretando cada detalle arquitectónico" },
  { main: "Dibujando los primeros trazos...", sub: "Como Le Corbusier con su lápiz" },
  { main: "Calculando proporciones áureas...", sub: "La matemática de la belleza" },
  { main: "Eligiendo los mejores materiales...", sub: "Concreto, vidrio, madera... ¡perfecto!" },
  { main: "Jugando con la luz y las sombras...", sub: "Tadao Ando estaría orgulloso" },
  { main: "Colocando cada ventana estratégicamente...", sub: "Las vistas importan" },
  { main: "Diseñando espacios que respiran...", sub: "El aire también necesita su lugar" },
  { main: "Integrando arquitectura y naturaleza...", sub: "Frank Lloyd Wright lo aprobaría" },
  { main: "Perfeccionando las líneas del techo...", sub: "Cada ángulo cuenta" },
  { main: "Añadiendo ese toque de magia...", sub: "Lo que hace único tu diseño" },
  { main: "Renderizando sombras cinematográficas...", sub: "Digno de una portada de ArchDaily" },
  { main: "Plantando el jardín virtual...", sub: "Verde que te quiero verde" },
  { main: "Ajustando la paleta de colores...", sub: "Armonía cromática en proceso" },
  { main: "Capturando el golden hour perfecto...", sub: "La luz dorada lo cambia todo" },
  { main: "Refinando cada pixel...", sub: "Los detalles hacen la diferencia" },
  { main: "Consultando con la IA arquitecta...", sub: "Ella sabe lo que hace" },
  { main: "Imaginando quién vivirá aquí...", sub: "Cada casa cuenta una historia" },
  { main: "Verificando que Zaha estaría impresionada...", sub: "El listón está alto" },
  { main: "Casi listo...", sub: "Tu sueño arquitectónico está tomando forma" },
  { main: "Últimos retoques maestros...", sub: "La perfección está en los detalles" },
];

interface ResultDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  onRegenerate: () => void;
}

// Lightbox Modal Component
function ImageLightbox({ 
  imageUrl, 
  onClose 
}: { 
  imageUrl: string; 
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setZoom(z => Math.min(z + 0.25, 3));
      if (e.key === '-') setZoom(z => Math.max(z - 0.25, 0.5));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fade-in-up"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
        title="Cerrar (Esc)"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Zoom controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
        <button
          onClick={(e) => { e.stopPropagation(); setZoom(z => Math.max(z - 0.25, 0.5)); }}
          className="p-2 text-white/70 hover:text-white transition-colors"
          title="Alejar (-)"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <span className="text-white/70 text-sm font-mono min-w-[4ch] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); setZoom(z => Math.min(z + 0.25, 3)); }}
          className="p-2 text-white/70 hover:text-white transition-colors"
          title="Acercar (+)"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>

      {/* Image container */}
      <div 
        className="max-w-[95vw] max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt="DreamHouse Render - Pantalla Completa"
          className="transition-transform duration-200 cursor-move"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          draggable={false}
        />
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 right-6 text-white/40 text-xs font-mono">
        ESC para cerrar · +/- para zoom
      </div>
    </div>
  );
}

export default function ResultDisplay({ imageUrl, isLoading, onRegenerate }: ResultDisplayProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  // Rotate messages while loading
  useEffect(() => {
    if (!isLoading) {
      setMessageIndex(0);
      return;
    }

    // Start with a random message
    setMessageIndex(Math.floor(Math.random() * LOADING_MESSAGES.length));

    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval);
  }, [isLoading]);

  const openLightbox = useCallback(() => {
    setShowLightbox(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setShowLightbox(false);
  }, []);

  if (!imageUrl && !isLoading) return null;

  const currentMessage = LOADING_MESSAGES[messageIndex];

  return (
    <>
      {/* Lightbox Modal */}
      {showLightbox && imageUrl && (
        <ImageLightbox imageUrl={imageUrl} onClose={closeLightbox} />
      )}

      <div className="space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground tracking-tight">
                Resultado Final
              </h3>
              <p className="text-xs text-muted-foreground">
                Renderizado con inteligencia artificial
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground px-3 py-1.5 bg-card rounded-full border border-border">
            {isLoading ? 'Generando...' : 'Completado'}
          </span>
        </div>
        
        {/* Image Container with gradient border */}
        <div className="relative gradient-border p-[1px] rounded-2xl">
          <div className="relative aspect-video w-full bg-card rounded-2xl overflow-hidden group">
            {isLoading ? (
              /* Loading State */
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-card">
                {/* Animated Loader */}
                <div className="relative">
                  {/* Outer ring */}
                  <div className="w-20 h-20 rounded-full border-2 border-border" />
                  {/* Spinning gradient ring */}
                  <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-transparent border-t-primary border-r-primary/50 animate-spin" />
                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                    </div>
                  </div>
                </div>
                
                {/* Loading Messages - Animated */}
                <div className="flex flex-col items-center gap-2 min-h-[60px] text-center px-4">
                  <p 
                    key={messageIndex} 
                    className="text-foreground font-medium text-lg animate-fade-in-up"
                  >
                    {currentMessage.main}
                  </p>
                  <p 
                    className="text-muted-foreground text-sm max-w-md"
                  >
                    {currentMessage.sub}
                  </p>
                </div>
                
                {/* Progress bar shimmer */}
                <div className="w-48 h-1 bg-border rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent shimmer" />
                </div>
                
                {/* Tip */}
                <p className="text-[10px] text-muted uppercase tracking-wider mt-2">
                  Esto puede tomar 30-60 segundos
                </p>
              </div>
            ) : imageUrl ? (
              /* Result Image */
              <>
                <img 
                  src={imageUrl} 
                  alt="DreamHouse Render" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] cursor-pointer" 
                  onClick={openLightbox}
                />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Click to expand hint */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-medium text-white/80 flex items-center gap-1.5">
                    <Maximize2 className="w-3 h-3" />
                    Clic para ampliar
                  </span>
                </div>
                
                {/* Action buttons */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {/* Left: Regenerate */}
                  <button
                    onClick={onRegenerate}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all hover:scale-105"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerar
                  </button>
                  
                  {/* Right: Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={openLightbox}
                      className="flex items-center justify-center w-10 h-10 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all hover:scale-105"
                      title="Ver a pantalla completa"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <a
                      href={imageUrl}
                      download="dreamhouse-render.png"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary-foreground bg-primary rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105"
                    >
                      <Download className="w-4 h-4" />
                      Descargar
                    </a>
                  </div>
                </div>
                
                {/* Corner badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/80">
                    AI Generated
                  </span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
