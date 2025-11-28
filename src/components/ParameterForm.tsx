import React from 'react';
import { DreamHouseParams, DEFAULT_PARAMS } from '../types';
import * as C from '../app/constants';
import clsx from 'clsx';
import { 
  Sparkles, MapPin, Building2, Palette, Camera, PenLine, ImageIcon
} from 'lucide-react';
import { Section } from './ui/Section';
import { Select } from './ui/Select';
import { Chip } from './ui/Chip';

interface ParameterFormProps {
  params: DreamHouseParams;
  onChange: (params: DreamHouseParams) => void;
  disabled?: boolean;
  activeSection: string | null;
  onSectionChange: (id: string) => void;
}

// Componente de descripción de sección
function SectionDescription({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pl-4 py-2 mb-6 border-l-2 border-primary">
      <p className="text-sm text-muted-foreground leading-relaxed font-medium">{children}</p>
    </div>
  );
}

export default function ParameterForm({ 
  params, 
  onChange, 
  disabled,
  activeSection,
  onSectionChange
}: ParameterFormProps) {
  
  const handleChange = (key: keyof DreamHouseParams, value: string | number | string[]) => {
    onChange({ ...params, [key]: value });
  };

  // Sin límite - permite seleccionar todas las opciones
  const toggleMultiSelect = (key: keyof DreamHouseParams, value: string) => {
    const current = Array.isArray(params[key]) ? (params[key] as string[]) : [];
    let newValues;
    if (current.includes(value)) {
      newValues = current.filter(v => v !== value);
    } else {
      newValues = [...current, value];
    }
    handleChange(key, newValues);
  };

  const renderChipsGroup = (
    label: string, 
    key: keyof DreamHouseParams, 
    options: string[], 
    helpText: string,
    scrollable: boolean = false
  ) => {
    const current = Array.isArray(params[key]) ? (params[key] as string[]) : [];
    const count = current.length;
    
    return (
      <fieldset className="flex flex-col gap-2" role="group" aria-labelledby={`${key}-label`}>
        <div className="flex flex-col gap-1 px-1">
          <div className="flex justify-between items-center">
            <label 
              id={`${key}-label`}
              className="text-xs font-semibold text-muted-foreground uppercase tracking-widest"
            >
              {label}
            </label>
            <span 
              className="text-[10px] font-mono px-2 py-0.5 rounded-none border transition-colors bg-transparent text-muted-foreground border-border"
              aria-label={`${count} opciones seleccionadas`}
            >
              {count} seleccionados
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground opacity-60 font-mono tracking-tight ml-1">{helpText}</p>
        </div>
        <div 
          className={clsx(
            "flex flex-wrap gap-2 p-1",
            scrollable && "max-h-56 overflow-y-auto custom-scrollbar"
          )}
          role="listbox"
          aria-multiselectable="true"
          aria-label={label}
        >
          {options.map(opt => {
            const isSelected = current.includes(opt);
            return (
              <Chip
                key={opt}
                selected={isSelected}
                disabled={disabled}
                onToggle={() => toggleMultiSelect(key, opt)}
                role="option"
                aria-selected={isSelected}
                aria-label={`${opt}${isSelected ? ' (seleccionado)' : ''}`}
              >
                {opt}
              </Chip>
            );
          })}
        </div>
      </fieldset>
    );
  };

  return (
    <div className="space-y-0" role="form" aria-label="Formulario de parámetros de diseño arquitectónico">
      
      {/* SECTION 2: CONTEXT & LOCATION */}
      <Section 
        title="Contexto y Ubicación" 
        number="02"
        icon={<MapPin className="w-5 h-5" aria-hidden="true" />}
        badge="UBICACIÓN"
        isOpen={activeSection === 'location'}
        onToggle={() => onSectionChange('location')}
      >
        <SectionDescription>
          Establece el entorno donde se ubicará tu proyecto. El clima, el paisaje circundante y las condiciones ambientales influyen directamente en el diseño arquitectónico resultante.
        </SectionDescription>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 pl-1">
              <label 
                htmlFor="city-input"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-widest"
              >
                Ciudad / Localización
              </label>
              <p className="text-[11px] text-muted-foreground opacity-60 font-mono tracking-tight ml-1">
                Escribe una ciudad o región para adaptar el estilo al contexto cultural
              </p>
            </div>
            <input
              id="city-input"
              type="text"
              value={params.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Ej: Tokyo, Barcelona, Dubai..."
              disabled={disabled}
              className="w-full bg-card border border-border rounded-none py-3 px-4 text-foreground text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 placeholder:text-muted-foreground/50 hover:border-foreground"
              aria-describedby="city-help"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

      {/* SECTION 1: PROJECT ESSENCE */}
      <Section 
        title="Esencia del Proyecto" 
        number="03"
        icon={<Sparkles className="w-5 h-5" aria-hidden="true" />}
        badge="PRINCIPAL"
        isOpen={activeSection === 'essence'}
        onToggle={() => onSectionChange('essence')}
      >
        <SectionDescription>
          Define la identidad fundamental de tu proyecto. El tipo de construcción, los estilos arquitectónicos que te inspiran y la atmósfera general que deseas transmitir.
        </SectionDescription>
        <div className="space-y-8">
          <Select 
            label="Tipo de Proyecto" 
            value={params.projectType}
            onChange={(e) => handleChange("projectType", e.target.value)}
            options={C.PROJECT_TYPES}
            disabled={disabled}
            aria-describedby="project-type-help"
          />
          <p id="project-type-help" className="sr-only">Selecciona el tipo de edificación que deseas diseñar</p>
          
          <div className="grid grid-cols-1 gap-6">
            {renderChipsGroup(
              "Estilo Arquitectónico", 
              "architecturalStyles", 
              C.STYLES, 
              "Selecciona los estilos arquitectónicos que definirán la estética de tu diseño. Puedes combinar varios para crear algo único.",
              true
            )}
            {renderChipsGroup(
              "Arquitecto de Referencia", 
              "architect", 
              C.ARCHITECTS, 
              "Elige arquitectos famosos cuyo estilo quieras emular. La IA usará sus características distintivas como inspiración.",
              true
            )}
          </div>
          <Select 
            label="Mood / Atmósfera"
            value={params.mood}
            onChange={(e) => handleChange("mood", e.target.value)}
            options={C.MOODS}
            disabled={disabled}
            aria-describedby="mood-help"
          />
          <p id="mood-help" className="sr-only">Define la sensación emocional que transmitirá el diseño</p>
        </div>
      </Section>

      {/* SECTION 3: PHYSICAL SPECIFICATIONS */}
      <Section 
        title="Especificaciones Físicas" 
        number="04"
        icon={<Building2 className="w-5 h-5" aria-hidden="true" />}
        isOpen={activeSection === 'specs'}
        onToggle={() => onSectionChange('specs')}
      >
        <SectionDescription>
          Configura las características estructurales de la edificación: dimensiones, número de pisos, tipo de cubierta y materiales de construcción principales.
        </SectionDescription>
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
          {renderChipsGroup(
            "Materiales Principales", 
            "materials", 
            C.MATERIALS, 
            "Selecciona los materiales de construcción que serán visibles en el exterior. Combínalos para crear texturas interesantes."
          )}
        </div>
      </Section>

      {/* SECTION 4: AESTHETICS & DETAILS */}
      <Section 
        title="Estética y Detalles" 
        number="05"
        icon={<Palette className="w-5 h-5" aria-hidden="true" />}
        isOpen={activeSection === 'aesthetics'}
        onToggle={() => onSectionChange('aesthetics')}
      >
        <SectionDescription>
          Personaliza los aspectos visuales del diseño: colores predominantes, elementos decorativos exteriores y tipo de vegetación que rodeará la construcción.
        </SectionDescription>
        <div className="space-y-8">
          {renderChipsGroup(
            "Paleta de Color", 
            "colorPalette", 
            C.COLORS, 
            "Elige los colores dominantes del diseño. Estos definirán la personalidad visual de la fachada y exteriores."
          )}
          {renderChipsGroup(
            "Elementos Exteriores", 
            "exteriorElements", 
            C.EXTERIOR_ELEMENTS, 
            "Añade elementos arquitectónicos y decorativos al exterior: piscinas, terrazas, pérgolas, etc.",
            true
          )}
          {renderChipsGroup(
            "Vegetación", 
            "vegetation", 
            C.VEGETATION, 
            "Define el tipo de plantas y jardines que rodearán la construcción para integrarla con el paisaje."
          )}
        </div>
      </Section>

      {/* SECTION 5: CAMERA CONFIGURATION */}
      <Section 
        title="Configuración de Cámara" 
        number="06"
        icon={<Camera className="w-5 h-5" aria-hidden="true" />}
        isOpen={activeSection === 'camera'}
        onToggle={() => onSectionChange('camera')}
      >
        <SectionDescription>
          Controla cómo se visualizará el render final: ángulo de la cámara, composición fotográfica, iluminación y momento del día. Estos ajustes son clave para lograr imágenes profesionales.
        </SectionDescription>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
        number="07"
        icon={<ImageIcon className="w-5 h-5" aria-hidden="true" />}
        badge="CALIDAD"
        isOpen={activeSection === 'output'}
        onToggle={() => onSectionChange('output')}
      >
        <SectionDescription>
          Define la calidad técnica de la imagen generada. Mayor resolución produce más detalle pero requiere más tiempo de procesamiento.
        </SectionDescription>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
          <div className="p-4 bg-primary/5 border border-primary flex gap-3 items-start rounded-none" role="note">
             <div className="p-1.5 bg-primary text-primary-foreground shrink-0" aria-hidden="true">
               <Sparkles className="w-4 h-4" />
             </div>
             <div className="text-xs text-muted-foreground space-y-1">
                <p className="font-bold uppercase tracking-wider text-foreground">Pro Tip</p>
                <p>
                  Mayor resolución = más tiempo de generación.
                  <span className="text-primary font-bold"> 4K </span> ideal para impresión.
                </p>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 7: PERSONALIZATION */}
      <Section 
        title="Personalización Avanzada" 
        number="08"
        icon={<PenLine className="w-5 h-5" aria-hidden="true" />}
        isOpen={activeSection === 'custom'}
        onToggle={() => onSectionChange('custom')}
      >
        <SectionDescription>
          Añade instrucciones específicas en texto libre. Aquí puedes describir detalles únicos, emociones, referencias culturales o cualquier aspecto que no esté cubierto por las opciones anteriores.
        </SectionDescription>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 pl-1">
            <label 
              htmlFor="notes-textarea"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-widest"
            >
              Notas Adicionales
            </label>
            <p className="text-[11px] text-muted-foreground opacity-60 font-mono tracking-tight ml-1">
              Escribe cualquier detalle específico que quieras incluir. La IA interpretará tus instrucciones.
            </p>
          </div>
          <textarea
            id="notes-textarea"
            value={params.additionalNotes || ''}
            onChange={(e) => handleChange("additionalNotes", e.target.value)}
            disabled={disabled}
            placeholder="Ej: Quiero que la casa tenga una atmósfera melancólica, con mucha niebla y que parezca abandonada pero elegante. Incluir un árbol de cerezo japonés en el jardín frontal..."
            rows={5}
            className="w-full bg-card border border-border rounded-none py-3 px-4 text-foreground text-sm leading-relaxed focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 placeholder:text-muted-foreground/50 hover:border-foreground resize-y"
            aria-describedby="notes-help"
          />
        </div>
      </Section>
    </div>
  );
}
