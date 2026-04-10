import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from './ui/Button';
import { Undo, Trash2, Pencil, ImagePlus } from 'lucide-react';

interface SketchCanvasProps {
  baseImage: File | null;
  onCompositeImageUpdate: (file: File | null) => void;
}

interface Point {
  x: number;
  y: number;
}

interface Line {
  points: Point[];
  color: string;
  size: number;
}

export default function SketchCanvas({ baseImage, onCompositeImageUpdate }: SketchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [lines, setLines] = useState<Line[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#EF4444'); // Red by default for notes
  const [brushSize, setBrushSize] = useState(3);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);

  // Load the image object when baseImage changes
  useEffect(() => {
    if (baseImage) {
      const url = URL.createObjectURL(baseImage);
      const img = new window.Image();
      img.src = url;
      img.onload = () => {
        setImageObj(img);
        setLines([]); // Reset lines on new image
      };
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setImageObj(null);
      setLines([]);
    }
  }, [baseImage]);

  // Redraw canvas whenever lines, image, or container size changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageObj) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Adjust canvas size to match image aspect ratio but fit in container
    const container = containerRef.current;
    if (container) {
      const maxWidth = container.clientWidth;
      const maxHeight = 600; // fixed max height for edit view
      
      let newWidth = imageObj.width;
      let newHeight = imageObj.height;
      const ratio = Math.min(maxWidth / newWidth, maxHeight / newHeight);
      
      if (ratio < 1) {
        newWidth *= ratio;
        newHeight *= ratio;
      }
      
      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth;
        canvas.height = newHeight;
      }
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw base image
    ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);

    // Draw all lines
    lines.forEach((line) => {
      if (line.points.length === 0) return;
      ctx.beginPath();
      ctx.moveTo(line.points[0].x, line.points[0].y);
      for (let i = 1; i < line.points.length; i++) {
        ctx.lineTo(line.points[i].x, line.points[i].y);
      }
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    });
  }, [lines, imageObj]);

  const generateCompositeFile = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !baseImage) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'edited_image.png', { type: 'image/png' });
        onCompositeImageUpdate(file);
      }
    }, 'image/png', 0.95);
  }, [baseImage, onCompositeImageUpdate]);

  // Export the composite only when the user finishes a stroke or changes lines
  // while not drawing (undo, clear). Never during active drawing.
  useEffect(() => {
    if (!isDrawing) {
      generateCompositeFile();
    }
  }, [lines, isDrawing, generateCompositeFile]);

  // Drawing event handlers
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!imageObj) return;
    setIsDrawing(true);
    const coords = getCoordinates(e);
    if (coords) {
      setLines([...lines, { points: [coords], color, size: brushSize }]);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !imageObj) return;
    e.preventDefault(); // Prevent scrolling on touch
    const coords = getCoordinates(e);
    if (coords) {
      setLines((prev) => {
        const newLines = [...prev];
        const currentLine = newLines[newLines.length - 1];
        if (currentLine) {
          currentLine.points.push(coords);
        }
        return newLines;
      });
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleUndo = () => {
    setLines((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setLines([]);
  };

  if (!baseImage) {
    return (
      <div className="w-full min-h-[300px] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center p-8 text-center bg-card">
        <ImagePlus className="w-12 h-12 text-muted-foreground mb-4" />
        <h4 className="text-lg font-bold uppercase tracking-wider mb-2">No Image Selected</h4>
        <p className="text-sm text-muted-foreground max-w-sm">
          Please upload a base image to start editing and drawing your notes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 bg-card p-4 rounded-xl border border-border">
        <div className="flex items-center gap-2 pr-4 border-r border-border">
          <Pencil className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Herramientas</span>
        </div>
        
        {/* Colors */}
        <div className="flex items-center gap-2">
          {['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#000000', '#FFFFFF'].map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full cursor-pointer transition-transform ${color === c ? 'scale-125 ring-2 ring-primary ring-offset-2 ring-offset-background' : 'hover:scale-110'}`}
              style={{ backgroundColor: c, border: c === '#FFFFFF' ? '1px solid #ccc' : 'none' }}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>

        <div className="h-6 w-px bg-border" />

        {/* Brush Size */}
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-medium mt-0.5">Size:</span>
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={brushSize} 
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-24 accent-primary"
          />
        </div>

        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleUndo} disabled={lines.length === 0} className="h-8 px-3">
            <Undo className="w-4 h-4 mr-2" />
            <span className="text-xs">Undo</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleClear} disabled={lines.length === 0} className="h-8 px-3 text-destructive hover:text-destructive hover:bg-destructive/10">
            <Trash2 className="w-4 h-4 mr-2" />
            <span className="text-xs">Clear</span>
          </Button>
        </div>
      </div>

      {/* Canvas Container */}
      <div 
        ref={containerRef} 
        className="relative w-full bg-black/5 rounded-xl border border-border overflow-hidden flex items-center justify-center min-h-[400px]"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{ touchAction: 'none', cursor: 'crosshair' }}
          className="max-w-full outline-none"
        />
      </div>
      <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-2">
        <Pencil className="w-3 h-3" />
        Dibuja sobre la imagen para señalar exactamente qué quieres modificar.
      </p>
    </div>
  );
}
