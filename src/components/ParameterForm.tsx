import React from 'react';
import { DreamHouseParams, DEFAULT_PARAMS } from '../types';
import * as C from '../app/constants';
import clsx from 'clsx';
import { 
  Dices, RotateCcw, HelpCircle, Info,
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

// Componente de tooltip/ayuda para accesibilidad
function HelpTooltip({ text }: { text: string }) {
  return (
    <div className="group relative inline-flex items-center ml-2">
      <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/50 hover:text-primary cursor-help transition-colors" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card-elevated border border-border rounded-lg text-xs text-muted-foreground max-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-lg">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-card-elevated" />
      </div>
    </div>
  );
}

// Componente de descripción de sección
function SectionDescription({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 p-3 bg-secondary/30 rounded-lg border border-border/50 mb-4">
      <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
      <p className="text-xs text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

export default function ParameterForm({ params, onChange, disabled }: ParameterFormProps) {
  
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

  const handleRandomize = () => {
    const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    const pickMulti = (arr: string[], maxRandom: number = 3): string[] => {
      const count = Math.floor(Math.random() * maxRandom) + 1;
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const randomParams: DreamHouseParams = {
      ...params,
      projectType: pick(C.PROJECT_TYPES),
      architecturalStyles: pickMulti(C.STYLES, 3),
      architect: pickMulti(C.ARCHITECTS, 2),
      mood: pick(C.MOODS),
      climate: pick(C.CLIMATES),
      environment: pick(C.ENVIRONMENTS),
      waterBody: pick(C.WATER_BODIES),
      weatherCondition: pick(C.WEATHER_CONDITIONS),
      size: pick(C.SIZES),
      levels: Math.floor(Math.random() * 3) + 1,
      roofType: pick(C.ROOF_TYPES),
      materials: pickMulti(C.MATERIALS, 4),
      finishLevel: pick(C.FINISH_LEVELS),
      colorPalette: pickMulti(C.COLORS, 3),
      exteriorElements: pickMulti(C.EXTERIOR_ELEMENTS, 5),
      vegetation: pickMulti(C.VEGETATION, 3),
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
    helpText: string,
    scrollable: boolean = false
  ) => {
    const current = Array.isArray(params[key]) ? (params[key] as string[]) : [];
    const count = current.length;
    
    return (
      <fieldset className="flex flex-col gap-3" role="group" aria-labelledby={`${key}-label`}>
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center">
            <label 
              id={`${key}-label`}
              className="text-xs font-semibold text-muted-foreground uppercase tracking-widest"
            >
              {label}
            </label>
            <HelpTooltip text={helpText} />
          </div>
          <span 
            className="text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors bg-card-elevated text-muted-foreground border-border"
            aria-label={`${count} opciones seleccionadas`}
          >
            {count} seleccionados
          </span>
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

  const handleReset = () => {
    onChange({ ...DEFAULT_PARAMS, city: "", additionalNotes: "" });
  };

  return (
    <div className="space-y-6" role="form" aria-label="Formulario de parámetros de diseño arquitectónico">
      {/* Action Buttons */}
      <div className="flex justify-end gap-3 sticky top-4 z-20 pointer-events-none">
        <div className="pointer-events-auto flex gap-2 p-1.5 bg-card/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg">
            <button
              type="button"
              onClick={handleReset}
              disabled={disabled}
              className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground bg-transparent hover:text-foreground rounded-full transition-all hover:bg-card-elevated cursor-pointer"
              aria-label="Restablecer todos los parámetros a sus valores predeterminados"
              title="Restablecer formulario"
            >
              <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" aria-hidden="true" />
              <span className="hidden sm:inline">Restablecer</span>
            </button>
            <div className="w-px bg-border my-1" aria-hidden="true" />
            <button
              type="button"
              onClick={handleRandomize}
              disabled={disabled}
              className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-primary/10 hover:bg-primary hover:text-white rounded-full transition-all cursor-pointer"
              aria-label="Generar una combinación aleatoria de parámetros para inspiración"
              title="Generar diseño aleatorio"
            >
              <Dices className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" aria-hidden="true" />
              <span>Sorpréndeme</span>
            </button>
        </div>
      </div>

      {/* SECTION 1: PROJECT ESSENCE */}
      <Section 
        title="Esencia del Proyecto" 
        icon={<Sparkles className="w-5 h-5" aria-hidden="true" />}
        badge="PRINCIPAL"
        defaultOpen={true}
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

      {/* SECTION 2: CONTEXT & LOCATION */}
      <Section 
        title="Contexto y Ubicación" 
        icon={<MapPin className="w-5 h-5" aria-hidden="true" />}
        defaultOpen={true}
      >
        <SectionDescription>
          Establece el entorno donde se ubicará tu proyecto. El clima, el paisaje circundante y las condiciones ambientales influyen directamente en el diseño arquitectónico resultante.
        </SectionDescription>
        <div className="space-y-6">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center">
              <label 
                htmlFor="city-input"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-widest pl-1"
              >
                Ciudad / Localización
              </label>
              <HelpTooltip text="Escribe el nombre de una ciudad o región. Esto ayuda a la IA a adaptar el estilo arquitectónico al contexto cultural y geográfico." />
            </div>
            <input
              id="city-input"
              type="text"
              value={params.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Ej: Tokyo, Barcelona, Dubai..."
              disabled={disabled}
              className="w-full bg-card/50 backdrop-blur-sm border border-border rounded-xl py-3 px-4 text-foreground text-sm font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50 placeholder:text-muted hover:border-border-hover hover:bg-card-elevated"
              aria-describedby="city-help"
            />
            <p id="city-help" className="text-[10px] text-muted px-1">
              Opcional: La ubicación influye en el estilo arquitectónico regional
            </p>
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

      {/* SECTION 3: PHYSICAL SPECIFICATIONS */}
      <Section 
        title="Especificaciones Físicas" 
        icon={<Building2 className="w-5 h-5" aria-hidden="true" />}
        defaultOpen={true}
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
        icon={<Palette className="w-5 h-5" aria-hidden="true" />}
        defaultOpen={false}
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
        icon={<Camera className="w-5 h-5" aria-hidden="true" />}
        defaultOpen={false}
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
        icon={<ImageIcon className="w-5 h-5" aria-hidden="true" />}
        badge="CALIDAD"
        defaultOpen={false}
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
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex gap-3 items-start" role="note">
             <div className="p-1.5 bg-primary/10 rounded-full text-primary shrink-0" aria-hidden="true">
               <Sparkles className="w-4 h-4" />
             </div>
             <div className="text-xs text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground">Recomendación Pro</p>
                <p>
                  Mayor resolución = más tiempo de generación y mayor detalle.
                  <span className="text-primary font-medium"> 4K </span> es ideal para impresiones y presentaciones profesionales.
                  <span className="text-primary font-medium"> HD </span> es suficiente para previsualizaciones rápidas.
                </p>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 7: PERSONALIZATION */}
      <Section 
        title="Personalización Avanzada" 
        icon={<PenLine className="w-5 h-5" aria-hidden="true" />}
        defaultOpen={false}
      >
        <SectionDescription>
          Añade instrucciones específicas en texto libre. Aquí puedes describir detalles únicos, emociones, referencias culturales o cualquier aspecto que no esté cubierto por las opciones anteriores.
        </SectionDescription>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center">
            <label 
              htmlFor="notes-textarea"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-widest pl-1"
            >
              Notas Adicionales
            </label>
            <HelpTooltip text="Escribe en lenguaje natural cualquier detalle específico que quieras incluir en el diseño. La IA interpretará tus instrucciones." />
          </div>
          <textarea
            id="notes-textarea"
            value={params.additionalNotes || ''}
            onChange={(e) => handleChange("additionalNotes", e.target.value)}
            disabled={disabled}
            placeholder="Ej: Quiero que la casa tenga una atmósfera melancólica, con mucha niebla y que parezca abandonada pero elegante. Incluir un árbol de cerezo japonés en el jardín frontal..."
            rows={5}
            className="w-full bg-card/50 backdrop-blur-sm border border-border rounded-xl py-3 px-4 text-foreground text-sm leading-relaxed focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50 placeholder:text-muted hover:border-border-hover resize-y"
            aria-describedby="notes-help"
          />
          <p id="notes-help" className="text-[10px] text-muted px-1">
            Tip: Sé descriptivo. Menciona emociones, referencias visuales o detalles específicos que imaginas.
          </p>
        </div>
      </Section>
    </div>
  );
}
