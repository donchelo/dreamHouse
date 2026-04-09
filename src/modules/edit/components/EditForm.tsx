import React from 'react';
import { DreamHouseParams } from '@/types';
import * as SC from '../../shared/constants';
import { Section } from '@/components/ui/Section';
import { Select } from '@/components/ui/Select';
import { PenLine, ImageIcon, Sparkles } from 'lucide-react';
import SketchCanvas from '@/components/SketchCanvas';

interface EditFormProps {
  params: DreamHouseParams;
  onChange: (params: DreamHouseParams) => void;
  disabled?: boolean;
  activeSection: string | null;
  onSectionChange: (id: string) => void;
  baseImage: File | null;
  onCompositeImageUpdate: (file: File | null) => void;
}

function SectionDescription({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pl-4 py-2 mb-6 border-l-2 border-primary">
      <p className="text-sm text-muted-foreground leading-relaxed font-medium">{children}</p>
    </div>
  );
}

export default function EditForm({ 
  params, 
  onChange, 
  disabled, 
  activeSection, 
  onSectionChange,
  baseImage,
  onCompositeImageUpdate
}: EditFormProps) {
  const handleChange = (key: keyof DreamHouseParams, value: any) => {
    onChange({ ...params, [key]: value });
  };

  return (
    <div className="space-y-0" role="form" aria-label="Módulo de Edición de Imagen">

      {/* ── 04 SKETCH CANVAS ─────────────────────────────────────── */}
      <Section title="Modo Sketch / Edición Visual" number="04" icon={<PenLine className="w-5 h-5" />} isOpen={activeSection === 'sketch'} onToggle={() => onSectionChange('sketch')}>
        <SectionDescription>Dibuja sobre la imagen base para indicar las zonas que deseas modificar y escribe tu instrucción de edición.</SectionDescription>
        
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest pl-1">Instrucción Principal (Prompt de Edición)</label>
            <textarea 
              value={params.editPrompt} 
              onChange={(e) => handleChange("editPrompt", e.target.value)} 
              placeholder="Ej: Make the tree smaller, add a modern pool, change the wall color to white..." 
              className="w-full h-24 bg-card border border-border p-4 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
              disabled={disabled}
            />
          </div>

          <SketchCanvas baseImage={baseImage} onCompositeImageUpdate={onCompositeImageUpdate} />
        </div>
      </Section>

      {/* ── 05 PROCESO ─────────────────────────────────────────── */}
      <Section title="Configuración de Salida" number="05" icon={<ImageIcon className="w-5 h-5" />} isOpen={activeSection === 'output'} onToggle={() => onSectionChange('output')}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Select label="Estilo Render" value={params.renderStyle} onChange={(e) => handleChange("renderStyle", e.target.value)} options={SC.RENDER_STYLES} disabled={disabled} />
          <Select label="Ratio de Aspecto" value={params.renderAspectRatio} onChange={(e) => handleChange("renderAspectRatio", e.target.value)} options={SC.ASPECT_RATIOS} disabled={disabled} />
        </div>
      </Section>

    </div>
  );
}
