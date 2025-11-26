import React, { useState } from 'react';
import { DreamHouseParams, DEFAULT_PARAMS } from '../types';
import * as C from '../app/constants';
import clsx from 'clsx';
import { 
  ChevronDown, Check, Dices, RotateCcw,
  Sparkles, MapPin, Building2, Palette, Camera, PenLine,
  ChevronRight, ImageIcon
} from 'lucide-react';

interface ParameterFormProps {
  params: DreamHouseParams;
  onChange: (params: DreamHouseParams) => void;
  disabled?: boolean;
}

// Collapsible Section Component
interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}

function Section({ title, icon, children, defaultOpen = true, badge }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <section className="card-dark overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between hover:bg-card-elevated transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-primary">{icon}</div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          {badge && (
            <span className="text-[10px] font-mono px-2 py-0.5 bg-primary/10 text-primary rounded-full">
              {badge}
            </span>
          )}
        </div>
        <ChevronRight 
          className={clsx(
            "w-5 h-5 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-90"
          )} 
        />
      </button>
      <div className={clsx(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="p-5 pt-0 space-y-5 border-t border-border">
          {children}
        </div>
      </div>
    </section>
  );
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

  // Render helpers
  const renderSelect = (label: string, key: keyof DreamHouseParams, options: string[] | number[]) => (
    <div className="flex flex-col gap-2 group">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <select
          value={params[key] as string | number}
          onChange={(e) => handleChange(key, e.target.value)}
          disabled={disabled}
          className="w-full appearance-none bg-card border border-border rounded-lg py-2.5 px-3 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all disabled:opacity-50 hover:border-border-hover cursor-pointer"
        >
          {options.map(opt => (
            <option key={opt} value={opt} className="bg-card text-foreground">
              {opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground group-focus-within:text-primary">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );

  const renderChips = (
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
            <button
              key={opt}
              type="button"
              disabled={disabled || (!isSelected && isMaxReached)}
              onClick={() => toggleMultiSelect(key, opt, max)}
              className={clsx(
                "px-3 py-1.5 text-xs rounded-md border transition-all duration-200 flex items-center gap-1.5 font-medium",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
                  : "bg-card text-card-foreground border-border hover:border-border-hover hover:bg-card-elevated disabled:opacity-40 disabled:cursor-not-allowed"
              )}
            >
              {isSelected && <Check className="w-3 h-3" strokeWidth={3} />}
              <span>{opt}</span>
            </button>
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
          {renderSelect("Tipo de Proyecto", "projectType", C.PROJECT_TYPES)}
          {renderChips("Estilo Arquitectónico", "architecturalStyles", C.STYLES, 3, true)}
          {renderChips("Arquitecto de Referencia", "architect", C.ARCHITECTS, 2, true)}
          {renderSelect("Mood / Atmósfera", "mood", C.MOODS)}
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
          <div className="grid grid-cols-2 gap-4">
            {renderSelect("Clima", "climate", C.CLIMATES)}
            {renderSelect("Entorno", "environment", C.ENVIRONMENTS)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderSelect("Cuerpo de Agua", "waterBody", C.WATER_BODIES)}
            {renderSelect("Condición Climática", "weatherCondition", C.WEATHER_CONDITIONS)}
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
          <div className="grid grid-cols-2 gap-4">
            {renderSelect("Tamaño", "size", C.SIZES)}
            {renderSelect("Niveles", "levels", [1, 2, 3, 4, 5])}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderSelect("Tipo de Techo", "roofType", C.ROOF_TYPES)}
            {renderSelect("Nivel de Acabados", "finishLevel", C.FINISH_LEVELS)}
          </div>
          {renderChips("Materiales Principales", "materials", C.MATERIALS, 4)}
        </div>
      </Section>

      {/* SECTION 4: AESTHETICS & DETAILS */}
      <Section 
        title="Estética y Detalles" 
        icon={<Palette className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="space-y-5">
          {renderChips("Paleta de Color", "colorPalette", C.COLORS, 3)}
          {renderChips("Elementos Exteriores", "exteriorElements", C.EXTERIOR_ELEMENTS, 5, true)}
          {renderChips("Vegetación", "vegetation", C.VEGETATION, 3)}
        </div>
      </Section>

      {/* SECTION 5: CAMERA CONFIGURATION */}
      <Section 
        title="Configuración de Cámara" 
        icon={<Camera className="w-5 h-5" />}
        defaultOpen={false}
      >
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {renderSelect("Ángulo de Cámara", "cameraAngle", C.ANGLES)}
            {renderSelect("Composición", "composition", C.COMPOSITIONS)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderSelect("Hora del Día", "timeOfDay", C.TIMES_OF_DAY)}
            {renderSelect("Estación", "season", C.SEASONS)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderSelect("Iluminación", "lighting", C.LIGHTING_TYPES)}
            {renderSelect("Contexto Humano", "humanContext", C.HUMAN_CONTEXT)}
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
          <div className="grid grid-cols-2 gap-4">
            {renderSelect("Resolución", "outputResolution", C.OUTPUT_RESOLUTIONS)}
            {renderSelect("Relación de Aspecto", "aspectRatio", C.ASPECT_RATIOS)}
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
