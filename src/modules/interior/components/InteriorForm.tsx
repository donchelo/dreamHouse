import React from 'react';
import { DreamHouseParams } from '@/types';
import * as IC from '../constants';
import * as EC from '../../exterior/constants';
import * as SC from '../../shared/constants';
import clsx from 'clsx';
import { Sparkles, Armchair, LayoutGrid, Layers, Palette, Camera, ImageIcon, PenLine, ScanSearch } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Select } from '@/components/ui/Select';
import { Chip } from '@/components/ui/Chip';
import ObjectUploader from '@/components/ObjectUploader';

interface InteriorFormProps {
  params: DreamHouseParams;
  onChange: (params: DreamHouseParams) => void;
  disabled?: boolean;
  activeSection: string | null;
  onSectionChange: (id: string) => void;
  objectFiles: File[];
  onObjectFilesChange: (files: File[]) => void;
}

function SectionDescription({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pl-4 py-2 mb-6 border-l-2 border-primary">
      <p className="text-sm text-muted-foreground leading-relaxed font-medium">{children}</p>
    </div>
  );
}

export default function InteriorForm({ params, onChange, disabled, activeSection, onSectionChange, objectFiles, onObjectFilesChange }: InteriorFormProps) {
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

  // const selectedCamera = SC.CAMERA_PRESETS.find(c => c.name === params.cameraPreset) ?? null;
  // const filmSims = selectedCamera?.isFujifilm ? SC.FUJIFILM_FILM_SIMULATIONS : SC.UNIVERSAL_FILM_LOOKS;

  return (
    <div className="space-y-0" role="form" aria-label="Módulo de Diseño Interior">
      {/* ── 01 ESPACIO ─────────────────────────────────────────── */}
      <Section title="Espacio y Propósito" number="05" icon={<Sparkles className="w-5 h-5" />} isOpen={activeSection === 'identity'} onToggle={() => onSectionChange('identity')}>
        <SectionDescription>Define el uso, el estilo y la influencia de autor de la estancia interior.</SectionDescription>
        <div className="space-y-8">
          {renderChipsGroup("Influencia de Autor (Arquitecto)", "architect", SC.ARCHITECTS, "Busca la sensibilidad espacial de un maestro específico.", true)}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select label="Espacio / Habitación" value={params.roomType} onChange={(e) => handleChange("roomType", e.target.value)} options={IC.ROOM_TYPES} disabled={disabled} />
            <Select label="Atmósfera / Mood" value={params.mood} onChange={(e) => handleChange("mood", e.target.value)} options={SC.MOODS} disabled={disabled} />
          </div>
          {renderChipsGroup("Estilo Decorativo", "architecturalStyles", SC.STYLES, "Lenguaje estético interior.", true)}
        </div>
      </Section>

      {/* ── 02 EQUIPAMIENTO ─────────────────────────────────────── */}
      <Section title="Equipamiento y Luz" number="06" icon={<Armchair className="w-5 h-5" />} isOpen={activeSection === 'interior-design'} onToggle={() => onSectionChange('interior-design')}>
        <SectionDescription>Configura los muebles y la iluminación ambiental.</SectionDescription>
        <div className="space-y-8">
          {renderChipsGroup("Mobiliario", "furnitureStyle", IC.FURNITURE_STYLES, "Piezas y acabados de muebles.", true)}
          {renderChipsGroup("Iluminación Interior", "interiorLighting", IC.INTERIOR_LIGHTING_TYPES, "Fuentes de luz artificial y natural.", true)}
        </div>
      </Section>

      {/* ── 03 OBJETOS ──────────────────────────────────────────── */}
      <Section title="Piezas & Objetos" number="07" icon={<ScanSearch className="w-5 h-5" />} isOpen={activeSection === 'interior-objects'} onToggle={() => onSectionChange('interior-objects')}>
        <SectionDescription>Sube fotos de muebles u objetos específicos que quieres incluir: sillas, camas, lámparas, mesas… Gemini los integrará fielmente en la escena.</SectionDescription>
        <ObjectUploader files={objectFiles} onFilesChange={onObjectFilesChange} disabled={disabled} />
      </Section>

      {/* ── 04 PROGRAMA ─────────────────────────────────────────── */}
      <Section title="Detalle Funcional" number="08" icon={<LayoutGrid className="w-5 h-5" />} isOpen={activeSection === 'program'} onToggle={() => onSectionChange('program')}>
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select label="Tipo de Cocina" value={params.kitchenType} onChange={(e) => handleChange("kitchenType", e.target.value)} options={IC.KITCHEN_TYPES} disabled={disabled} />
            <Select label="Área Social" value={params.livingAreaType} onChange={(e) => handleChange("livingAreaType", e.target.value)} options={IC.LIVING_AREA_TYPES} disabled={disabled} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Dormitorios</label>
              <input type="number" value={params.bedrooms} onChange={(e) => handleChange("bedrooms", parseInt(e.target.value) || 1)} disabled={disabled} className="w-full bg-card border border-border py-3 px-4" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Baños</label>
              <input type="number" value={params.bathrooms} onChange={(e) => handleChange("bathrooms", parseInt(e.target.value) || 1)} disabled={disabled} className="w-full bg-card border border-border py-3 px-4" />
            </div>
          </div>
        </div>
      </Section>

      {/* ── 05 ACABADOS ─────────────────────────────────────────── */}
      <Section title="Materialidad y Superficies" number="09" icon={<Layers className="w-5 h-5" />} isOpen={activeSection === 'materials'} onToggle={() => onSectionChange('materials')}>
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select label="Suelo / Pavimento" value={params.flooringMaterial} onChange={(e) => handleChange("flooringMaterial", e.target.value)} options={IC.FLOORING_MATERIALS} disabled={disabled} />
            <Select label="Techo / Cielorraso" value={params.ceilingDetail} onChange={(e) => handleChange("ceilingDetail", e.target.value)} options={IC.CEILING_DETAILS} disabled={disabled} />
          </div>
          {renderChipsGroup("Revestimientos", "materials", EC.MATERIALS, "Materiales de muros y superficies.", true)}
          <Select label="Nivel de Acabado" value={params.finishLevel} onChange={(e) => handleChange("finishLevel", e.target.value)} options={EC.FINISH_LEVELS} disabled={disabled} />
        </div>
      </Section>

      {/* ── 06 ESTÉTICA ─────────────────────────────────────────── */}
      <Section title="Paleta de Color" number="10" icon={<Palette className="w-5 h-5" />} isOpen={activeSection === 'landscape'} onToggle={() => onSectionChange('landscape')}>
        {renderChipsGroup("Colores Dominantes", "colorPalette", SC.COLORS, "Gama cromática interior.")}
      </Section>

      {/* ── 07 FOTOGRAFÍA ───────────────────────────────────────── */}
      <Section title="Configuración de Cámara" number="11" icon={<Camera className="w-5 h-5" />} isOpen={activeSection === 'photography'} onToggle={() => onSectionChange('photography')}>
        <div className="space-y-6">
          <Select label="Dirección de Fotografía" value={params.cameraPreset} onChange={(e) => handleChange("cameraPreset", e.target.value)} options={SC.CAMERA_PRESET_NAMES} disabled={disabled} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select label="Distancia Focal" value={params.focalLength} onChange={(e) => handleChange("focalLength", e.target.value)} options={SC.FOCAL_LENGTHS} disabled={disabled} />
            <Select label="Apertura" value={params.aperture} onChange={(e) => handleChange("aperture", e.target.value)} options={SC.APERTURES} disabled={disabled} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select label="Ángulo" value={params.cameraAngle} onChange={(e) => handleChange("cameraAngle", e.target.value)} options={SC.ANGLES} disabled={disabled} />
            <Select label="Composición" value={params.composition} onChange={(e) => handleChange("composition", e.target.value)} options={SC.COMPOSITIONS} disabled={disabled} />
          </div>
        </div>
      </Section>

      {/* ── 08 SALIDA ──────────────────────────────────────────── */}
      <Section title="Output Final" number="12" icon={<ImageIcon className="w-5 h-5" />} isOpen={activeSection === 'output'} onToggle={() => onSectionChange('output')}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Select label="Estilo de Imagen" value={params.renderStyle} onChange={(e) => handleChange("renderStyle", e.target.value)} options={SC.RENDER_STYLES} disabled={disabled} />
          <Select label="Aspect Ratio" value={params.renderAspectRatio} onChange={(e) => handleChange("renderAspectRatio", e.target.value)} options={SC.ASPECT_RATIOS} disabled={disabled} />
          <Select label="Resolución" value={params.renderOutputResolution} onChange={(e) => handleChange("renderOutputResolution", e.target.value)} options={SC.OUTPUT_RESOLUTIONS} disabled={disabled} />
        </div>
      </Section>

      {/* ── 09 DIRECCIÓN ───────────────────────────────────────── */}
      <Section title="Dirección Creativa" number="13" icon={<PenLine className="w-5 h-5" />} isOpen={activeSection === 'creative'} onToggle={() => onSectionChange('creative')}>
        <textarea value={params.artDirection} onChange={(e) => handleChange("artDirection", e.target.value)} placeholder="Notas sobre el estilismo o la luz..." className="w-full h-32 bg-card border border-border p-4 text-sm" />
      </Section>
    </div>
  );
}
