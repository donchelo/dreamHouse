import React from 'react';
import { DreamHouseParams, DEFAULT_PARAMS } from '../types';
import * as C from '../app/constants';
import clsx from 'clsx';
import { 
  Dices, RotateCcw,
  Sparkles, MapPin, Building2, Palette, Camera, PenLine, ImageIcon
} from 'lucide-react';
import { Section } from './ui/Section';
import { Select } from './ui/Select';
import { Chip } from './ui/Chip';

interface ParameterFormProps {
  params: DreamHouseParams;
  onChange: (params: DreamHouseParams) => void;
  disabled?: boolean;
}

export default function ParameterForm({ params, onChange, disabled }: ParameterFormProps) {
  
  const handleChange = (key: keyof DreamHouseParams, value: string | number | string[]) => {
    onChange({ ...params, [key]: value });
  };

  const toggleMultiSelect = (key: keyof DreamHouseParams, value: string, max: number) => {
    const current = Array.isArray(params[key]) ? (params[key] as string[]) : [];
    let newValues;
    if (current.includes(value)) {
      newValues = current.filter(v => v !== value);
    } else {
      if (current.length >= max) return;
      newValues = [...current, value];
    }
    handleChange(key, newValues);
  };

  const handleRandomize = () => {
    const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    const pickMulti = (arr: string[], max: number = 3): string[] => {
      const count = Math.floor(Math.random() * max) + 1;
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const randomParams: DreamHouseParams = {
      ...params,
      projectType: pick(C.PROJECT_TYPES),
      architecturalStyles: pickMulti(C.STYLES, 2),
      architect: pickMulti(C.ARCHITECTS, 2),
      mood: pick(C.MOODS),
      climate: pick(C.CLIMATES),
      environment: pick(C.ENVIRONMENTS),
      waterBody: pick(C.WATER_BODIES),
      weatherCondition: pick(C.WEATHER_CONDITIONS),
      size: pick(C.SIZES),
      levels: Math.floor(Math.random() * 3) + 1,
      roofType: pick(C.ROOF_TYPES),
      materials: pickMulti(C.MATERIALS, 3),
      finishLevel: pick(C.FINISH_LEVELS),
      colorPalette: pickMulti(C.COLORS, 2),
      exteriorElements: pickMulti(C.EXTERIOR_ELEMENTS, 4),
      vegetation: pickMulti(C.VEGETATION, 2),
      cameraAngle: pick(C.ANGLES),
      composition: pick(C.COMPOSITIONS),
      timeOfDay: pick(C.TIMES_OF_DAY),
      season: pick(C.SEASONS),
      lighting: pick(C.LIGHTING_TYPES),
      humanContext: pick(C.HUMAN_CONTEXT),
      outputResolution: pick(C.OUTPUT_RESOLUTIONS),
      aspectRatio: pick(C.ASPECT_RATIOS),
      city: params.city,
      additionalNotes: params.additionalNotes
    };

    onChange(randomParams);
  };

  const renderChipsGroup = (
    label: string, 
    key: keyof DreamHouseParams, 
    options: string[], 
    max: number, 
    scrollable: boolean = false,
    columns: number = 0
  ) => (
    <div className="flex flex-col gap-3">
      {label && (
        <div className="flex justify-between items-center">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
          {max < 50 && (
            <span className="text-[10px] font-mono px-2 py-0.5 bg-card-elevated rounded text-muted-foreground border border-border">
              {(Array.isArray(params[key]) ? (params[key] as string[]).length : 0)}/{max}
            </span>
          )}
        </div>
      )}
      <div className={clsx(
        "flex flex-wrap gap-2",
        scrollable && "max-h-48 overflow-y-auto pr-2 custom-scrollbar",
        columns > 0 && `grid grid-cols-${columns}`
      )}>
        {options.map(opt => {
          const current = Array.isArray(params[key]) ? (params[key] as string[]) : [];
          const isSelected = current.includes(opt);
          const isMaxReached = current.length >= max;
          return (
            <Chip
              key={opt}
              selected={isSelected}
              disabled={disabled || (!isSelected && isMaxReached)}
              onToggle={() => toggleMultiSelect(key, opt, max)}
            >
              {opt}
            </Chip>
          );
        })}
      </div>
    </div>
  );

  const handleReset = () => {
    onChange({ ...DEFAULT_PARAMS, city: "", additionalNotes: "" });
  };

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={handleReset}
          disabled={disabled}
          className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground bg-card border border-border rounded-full hover:border-border-hover hover:text-foreground hover:bg-card-elevated transition-all"
        >
          <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" />
          <span>Restablecer</span>
        </button>
        <button
          type="button"
          onClick={handleRandomize}
          disabled={disabled}
          className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-full hover:border-primary hover:bg-card-elevated transition-all"
        >
          <Dices className="w-4 h-4 text-primary group-hover:rotate-180 transition-transform duration-500" />
          <span>Sorpréndeme</span>
        </button>
      </div>

      {/* SECTION 1: PROJECT ESSENCE */}
      <Section 
        title="Esencia del Proyecto" 
        icon={<Sparkles className="w-5 h-5" />}
        badge="PRINCIPAL"
        defaultOpen={true}
      >
        <div className="space-y-5">
          <Select 
            label="Tipo de Proyecto" 
            value={params.projectType}
            onChange={(e) => handleChange("projectType", e.target.value)}
            options={C.PROJECT_TYPES}
            disabled={disabled}
          />
          {renderChipsGroup("Estilo Arquitectónico", "architecturalStyles", C.STYLES, 3, true)}
          {renderChipsGroup("Arquitecto de Referencia", "architect", C.ARCHITECTS, 2, true)}
          <Select 
            label="Mood / Atmósfera"
            value={params.mood}
            onChange={(e) => handleChange("mood", e.target.value)}
            options={C.MOODS}
            disabled={disabled}
          />
        </div>
      </Section>

      {/* SECTION 2: CONTEXT & LOCATION */}
      <Section 
        title="Contexto y Ubicación" 
        icon={<MapPin className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Ciudad / Localización
            </label>
            <input
              type="text"
              value={params.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Ej: Tokyo, Barcelona, Dubai..."
              disabled={disabled}
              className="w-full bg-card border border-border rounded-lg py-2.5 px-3 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all disabled:opacity-50 placeholder:text-muted hover:border-border-hover"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select 
              label="Clima"
              value={params.climate}
              onChange={(e) => handleChange("climate", e.target.value)}
              options={C.CLIMATES}
              disabled={disabled}
            />
            <Select 
              label="Entorno"
              value={params.environment}
              onChange={(e) => handleChange("environment", e.target.value)}
              options={C.ENVIRONMENTS}
              disabled={disabled}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select 
              label="Cuerpo de Agua"
              value={params.waterBody}
              onChange={(e) => handleChange("waterBody", e.target.value)}
              options={C.WATER_BODIES}
              disabled={disabled}
            />
            <Select 
              label="Condición Climática"
              value={params.weatherCondition}
              onChange={(e) => handleChange("weatherCondition", e.target.value)}
              options={C.WEATHER_CONDITIONS}
              disabled={disabled}
            />
          </div>
        </div>
      </Section>

      {/* SECTION 3: PHYSICAL SPECIFICATIONS */}
      <Section 
        title="Especificaciones Físicas" 
        icon={<Building2 className="w-5 h-5" />}
        defaultOpen={true}
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select 
              label="Tamaño"
              value={params.size}
              onChange={(e) => handleChange("size", e.target.value)}
              options={C.SIZES}
              disabled={disabled}
            />
            <Select 
              label="Niveles"
              value={params.levels}
              onChange={(e) => handleChange("levels", e.target.value)}
              options={[1, 2, 3, 4, 5]}
              disabled={disabled}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select 
              label="Tipo de Techo"
              value={params.roofType}
              onChange={(e) => handleChange("roofType", e.target.value)}
              options={C.ROOF_TYPES}
              disabled={disabled}
            />
            <Select 
              label="Nivel de Acabados"
              value={params.finishLevel}
              onChange={(e) => handleChange("finishLevel", e.target.value)}
              options={C.FINISH_LEVELS}
              disabled={disabled}
            />
          </div>
          {renderChipsGroup("Materiales Principales", "materials", C.MATERIALS, 4)}
        </div>
      </Section>

      {/* SECTION 4: AESTHETICS & DETAILS */}
      <Section 
        title="Estética y Detalles" 
        icon={<Palette className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="space-y-5">
          {renderChipsGroup("Paleta de Color", "colorPalette", C.COLORS, 3)}
          {renderChipsGroup("Elementos Exteriores", "exteriorElements", C.EXTERIOR_ELEMENTS, 5, true)}
          {renderChipsGroup("Vegetación", "vegetation", C.VEGETATION, 3)}
        </div>
      </Section>

      {/* SECTION 5: CAMERA CONFIGURATION */}
      <Section 
        title="Configuración de Cámara" 
        icon={<Camera className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select 
              label="Ángulo de Cámara"
              value={params.cameraAngle}
              onChange={(e) => handleChange("cameraAngle", e.target.value)}
              options={C.ANGLES}
              disabled={disabled}
            />
            <Select 
              label="Composición"
              value={params.composition}
              onChange={(e) => handleChange("composition", e.target.value)}
              options={C.COMPOSITIONS}
              disabled={disabled}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select 
              label="Hora del Día"
              value={params.timeOfDay}
              onChange={(e) => handleChange("timeOfDay", e.target.value)}
              options={C.TIMES_OF_DAY}
              disabled={disabled}
            />
            <Select 
              label="Estación"
              value={params.season}
              onChange={(e) => handleChange("season", e.target.value)}
              options={C.SEASONS}
              disabled={disabled}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select 
              label="Iluminación"
              value={params.lighting}
              onChange={(e) => handleChange("lighting", e.target.value)}
              options={C.LIGHTING_TYPES}
              disabled={disabled}
            />
            <Select 
              label="Contexto Humano"
              value={params.humanContext}
              onChange={(e) => handleChange("humanContext", e.target.value)}
              options={C.HUMAN_CONTEXT}
              disabled={disabled}
            />
          </div>
        </div>
      </Section>

      {/* SECTION 6: OUTPUT CONFIGURATION */}
      <Section 
        title="Configuración de Salida" 
        icon={<ImageIcon className="w-5 h-5" />}
        badge="CALIDAD"
        defaultOpen={false}
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select 
              label="Resolución"
              value={params.outputResolution}
              onChange={(e) => handleChange("outputResolution", e.target.value)}
              options={C.OUTPUT_RESOLUTIONS}
              disabled={disabled}
            />
            <Select 
              label="Relación de Aspecto"
              value={params.aspectRatio}
              onChange={(e) => handleChange("aspectRatio", e.target.value)}
              options={C.ASPECT_RATIOS}
              disabled={disabled}
            />
          </div>
          <div className="p-3 bg-card-elevated rounded-lg border border-border">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">💡 Nota:</strong> Mayor resolución = más tiempo de generación y mayor detalle.
              4K es ideal para impresiones y presentaciones profesionales.
            </p>
          </div>
        </div>
      </Section>

      {/* SECTION 7: PERSONALIZATION */}
      <Section 
        title="Personalización" 
        icon={<PenLine className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Notas Adicionales
          </label>
          <p className="text-xs text-muted mb-1">
            Describe detalles específicos, emociones o instrucciones extra para la IA.
          </p>
          <textarea
            value={params.additionalNotes || ''}
            onChange={(e) => handleChange("additionalNotes", e.target.value)}
            disabled={disabled}
            placeholder="Ej: Quiero que la casa tenga una atmósfera melancólica, con mucha niebla y que parezca abandonada pero elegante..."
            rows={4}
            className="w-full bg-card border border-border rounded-lg py-2.5 px-3 text-foreground text-sm leading-relaxed focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all disabled:opacity-50 placeholder:text-muted hover:border-border-hover resize-y"
          />
        </div>
      </Section>
    </div>
  );
}
