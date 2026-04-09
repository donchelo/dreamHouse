import React from 'react';
import { DreamHouseParams } from '@/types';
import * as VC from '../constants';
import * as SC from '../../shared/constants';
import clsx from 'clsx';
import { Sparkles, MapPin, Layers, Palette, Camera, ImageIcon, PenLine, LayoutGrid } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Select } from '@/components/ui/Select';
import { Chip } from '@/components/ui/Chip';

interface VistasFormProps {
  params: DreamHouseParams;
  onChange: (params: DreamHouseParams) => void;
  disabled?: boolean;
  activeSection: string | null;
  onSectionChange: (id: string) => void;
}

function SectionDescription({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pl-4 py-2 mb-6 border-l-2 border-primary">
      <p className="text-sm text-muted-foreground leading-relaxed font-medium">{children}</p>
    </div>
  );
}

export default function VistasForm({ params, onChange, disabled, activeSection, onSectionChange }: VistasFormProps) {
  const handleChange = <K extends keyof DreamHouseParams>(key: K, value: DreamHouseParams[K]) => {
    onChange({ ...params, [key]: value });
  };

  const toggleMultiSelect = (key: keyof DreamHouseParams, value: string) => {
    const current = Array.isArray(params[key]) ? (params[key] as string[]) : [];
    const newValues = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    handleChange(key, newValues);
  };

  const renderChipsGroup = (label: string, key: keyof DreamHouseParams, options: string[], helpText: string, scrollable: boolean = false) => {
    const current = Array.isArray(params[key]) ? (params[key] as string[]) : [];
    return (
      <fieldset className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 px-1">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{label}</label>
          <p className="text-[11px] text-muted-foreground opacity-60 font-mono tracking-tight">{helpText}</p>
        </div>
        <div className={clsx("flex flex-wrap gap-2 p-1", scrollable && "max-h-56 overflow-y-auto custom-scrollbar border border-border/20 bg-card/30")}>
          {options.map(opt => (
            <Chip key={opt} selected={current.includes(opt)} disabled={disabled} onToggle={() => toggleMultiSelect(key, opt)}>
              {opt}
            </Chip>
          ))}
        </div>
      </fieldset>
    );
  };

  return (
    <div className="space-y-0" role="form" aria-label="Módulo de Generación de Vistas">
      
      {/* ── 01 SELECCIÓN DE VISTAS ────────────────────────────────── */}
      <Section title="Portafolio de Vistas" number="05" icon={<LayoutGrid className="w-5 h-5" />} isOpen={activeSection === 'vistasSelection'} onToggle={() => onSectionChange('vistasSelection')}>
        <SectionDescription>Selecciona las vistas arquitectónicas que deseas generar para tu portafolio basado en la foto subida.</SectionDescription>
        <div className="grid grid-cols-1 gap-6">
          {renderChipsGroup("Vistas a Generar", "selectedVistas", VC.ARCHITECTURAL_VISTAS, "Selecciona múltiples para un set completo.", true)}
        </div>
      </Section>
    </div>
  );
}
