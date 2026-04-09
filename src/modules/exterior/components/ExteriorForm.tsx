import React from 'react';
import { DreamHouseParams } from '@/types';
import * as EC from '../constants';
import * as SC from '../../shared/constants';
import clsx from 'clsx';
import { Sparkles, MapPin, Box, LayoutGrid, Layers, Palette, Camera, ImageIcon, PenLine, Info } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Select } from '@/components/ui/Select';
import { Chip } from '@/components/ui/Chip';

interface ExteriorFormProps {
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

export default function ExteriorForm({ params, onChange, disabled, activeSection, onSectionChange }: ExteriorFormProps) {
  const handleChange = (key: keyof DreamHouseParams, value: any) => {
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

  const selectedCamera = SC.CAMERA_PRESETS.find(c => c.name === params.cameraPreset) ?? null;
  const filmSims = selectedCamera?.isFujifilm ? SC.FUJIFILM_FILM_SIMULATIONS : SC.UNIVERSAL_FILM_LOOKS;

  return (
    <div className="space-y-0" role="form" aria-label="Módulo de Arquitectura Exterior">
      {/* ── 01 IDENTIDAD ────────────────────────────────────────── */}
      <Section title="Identidad del Proyecto" number="01" icon={<Sparkles className="w-5 h-5" />} isOpen={activeSection === 'identity'} onToggle={() => onSectionChange('identity')}>
        <SectionDescription>Define la esencia y el carácter arquitectónico del edificio exterior.</SectionDescription>
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select label="Tipo de Proyecto" value={params.projectType} onChange={(e) => handleChange("projectType", e.target.value)} options={EC.PROJECT_TYPES} disabled={disabled} />
            <Select label="Atmósfera / Mood" value={params.mood} onChange={(e) => handleChange("mood", e.target.value)} options={SC.MOODS} disabled={disabled} />
          </div>
          <div className="grid grid-cols-1 gap-6">
            {renderChipsGroup("Estilos Arquitectónicos", "architecturalStyles", SC.STYLES, "Combina estéticas para una propuesta única.", true)}
            {renderChipsGroup("Arquitectos Inspiradores", "architect", SC.ARCHITECTS, "Influencia formal y conceptual.", true)}
          </div>
        </div>
      </Section>

      {/* ── 02 CONTEXTO ─────────────────────────────────────────── */}
      <Section title="Ubicación y Paisaje" number="02" icon={<MapPin className="w-5 h-5" />} isOpen={activeSection === 'location'} onToggle={() => onSectionChange('location')}>
        <SectionDescription>El emplazamiento físico y las condiciones climáticas del sitio.</SectionDescription>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest pl-1">Ciudad / Región</label>
            <input type="text" value={params.city} onChange={(e) => handleChange("city", e.target.value)} placeholder="Ej: Kyoto, Oslo, Atacama..." disabled={disabled} className="w-full bg-card border border-border py-4 px-4 text-sm font-medium focus:ring-1 focus:ring-primary outline-none transition-all" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select label="Entorno Natural" value={params.environment} onChange={(e) => handleChange("environment", e.target.value)} options={EC.ENVIRONMENTS} disabled={disabled} />
            <Select label="Clima Dominante" value={params.climate} onChange={(e) => handleChange("climate", e.target.value)} options={EC.CLIMATES} disabled={disabled} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select label="Cuerpo de Agua" value={params.waterBody} onChange={(e) => handleChange("waterBody", e.target.value)} options={EC.WATER_BODIES} disabled={disabled} />
            <Select label="Condición del Tiempo" value={params.weatherCondition} onChange={(e) => handleChange("weatherCondition", e.target.value)} options={EC.WEATHER_CONDITIONS} disabled={disabled} />
          </div>
        </div>
      </Section>

      {/* ── 03 FORMA ────────────────────────────────────────────── */}
      <Section title="Volumetría y Estructura" number="03" icon={<Box className="w-5 h-5" />} isOpen={activeSection === 'volumetry'} onToggle={() => onSectionChange('volumetry')}>
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select label="Escala / Tamaño" value={params.size} onChange={(e) => handleChange("size", e.target.value)} options={EC.SIZES} disabled={disabled} />
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Niveles / Pisos</label>
              <input type="number" min="1" max="50" value={params.levels} onChange={(e) => handleChange("levels", parseInt(e.target.value) || 1)} disabled={disabled} className="w-full bg-card border border-border py-3 px-4" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select label="Tipo de Cubierta" value={params.roofType} onChange={(e) => handleChange("roofType", e.target.value)} options={EC.ROOF_TYPES} disabled={disabled} />
            <Select label="Esquema Espacial" value={params.layoutType} onChange={(e) => handleChange("layoutType", e.target.value)} options={EC.LAYOUT_TYPES} disabled={disabled} />
          </div>
        </div>
      </Section>

      {/* ── 04 PROGRAMA ─────────────────────────────────────────── */}
      <Section title="Programa Exterior" number="04" icon={<LayoutGrid className="w-5 h-5" />} isOpen={activeSection === 'program'} onToggle={() => onSectionChange('program')}>
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select label="Estacionamiento" value={params.parkingType} onChange={(e) => handleChange("parkingType", e.target.value)} options={EC.PARKING_TYPES} disabled={disabled} />
            {renderChipsGroup("Áreas Sociales", "socialAreas", EC.SOCIAL_AREAS, "Espacios compartidos exteriores.", true)}
          </div>
        </div>
      </Section>

      {/* ── 05 MATERIALES ───────────────────────────────────────── */}
      <Section title="Piel y Materialidad" number="05" icon={<Layers className="w-5 h-5" />} isOpen={activeSection === 'materials'} onToggle={() => onSectionChange('materials')}>
        <div className="space-y-8">
          {renderChipsGroup("Materiales Dominantes", "materials", EC.MATERIALS, "Paleta constructiva exterior.", true)}
          <Select label="Calidad de Ejecución" value={params.finishLevel} onChange={(e) => handleChange("finishLevel", e.target.value)} options={EC.FINISH_LEVELS} disabled={disabled} />
          {renderChipsGroup("Detalles de Diseño", "architecturalDetails", EC.ARCHITECTURAL_DETAILS, "Gamas y ornamentación.")}
        </div>
      </Section>

      {/* ── 06 LANDSCAPE ────────────────────────────────────────── */}
      <Section title="Paisajismo y Color" number="06" icon={<Palette className="w-5 h-5" />} isOpen={activeSection === 'landscape'} onToggle={() => onSectionChange('landscape')}>
        <div className="space-y-8">
          {renderChipsGroup("Paleta de Color", "colorPalette", SC.COLORS, "Tonos cromáticos de la fachada.")}
          {renderChipsGroup("Elementos de Sitio", "exteriorElements", EC.EXTERIOR_ELEMENTS, "Infraestructura exterior.", true)}
          {renderChipsGroup("Especies Vegetales", "vegetation", EC.VEGETATION, "Entorno verde.", true)}
        </div>
      </Section>

      {/* ── 07 FOTOGRAFÍA ───────────────────────────────────────── */}
      <Section title="Dirección de Cámara" number="07" icon={<Camera className="w-5 h-5" />} isOpen={activeSection === 'photography'} onToggle={() => onSectionChange('photography')}>
        <div className="space-y-6">
          <Select label="Preset de Cámara" value={params.cameraPreset} onChange={(e) => handleChange("cameraPreset", e.target.value)} options={SC.CAMERA_PRESET_NAMES} disabled={disabled} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select label="Lente" value={params.focalLength} onChange={(e) => handleChange("focalLength", e.target.value)} options={SC.FOCAL_LENGTHS} disabled={disabled} />
            <Select label="Diafragma" value={params.aperture} onChange={(e) => handleChange("aperture", e.target.value)} options={SC.APERTURES} disabled={disabled} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select label="Ángulo" value={params.cameraAngle} onChange={(e) => handleChange("cameraAngle", e.target.value)} options={SC.ANGLES} disabled={disabled} />
            <Select label="Composición" value={params.composition} onChange={(e) => handleChange("composition", e.target.value)} options={SC.COMPOSITIONS} disabled={disabled} />
          </div>
        </div>
      </Section>

      {/* ── 08 PROCESO ─────────────────────────────────────────── */}
      <Section title="Configuración de Salida" number="08" icon={<ImageIcon className="w-5 h-5" />} isOpen={activeSection === 'output'} onToggle={() => onSectionChange('output')}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Select label="Estilo" value={params.renderStyle} onChange={(e) => handleChange("renderStyle", e.target.value)} options={SC.RENDER_STYLES} disabled={disabled} />
          <Select label="Ratio" value={params.renderAspectRatio} onChange={(e) => handleChange("renderAspectRatio", e.target.value)} options={SC.ASPECT_RATIOS} disabled={disabled} />
        </div>
      </Section>

      {/* ── 09 ART ─────────────────────────────────────────────── */}
      <Section title="Dirección Creativa" number="09" icon={<PenLine className="w-5 h-5" />} isOpen={activeSection === 'creative'} onToggle={() => onSectionChange('creative')}>
        <textarea value={params.artDirection} onChange={(e) => handleChange("artDirection", e.target.value)} placeholder="Instrucciones artísticas específicas..." className="w-full h-32 bg-card border border-border p-4 text-sm" />
      </Section>
    </div>
  );
}
