import React from 'react';
import { DreamHouseParams } from '../types';
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
  currentTab: 'basics' | 'rendering';
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
  onSectionChange,
  currentTab
}: ParameterFormProps) {
  
  const handleChange = (key: keyof DreamHouseParams, value: string | number | string[] | boolean) => {
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
      
      {/* BASICS TAB */}
      {currentTab === 'basics' && (
        <>
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

          {/* SECTION 3: PHYSICAL SPECIFICATIONS (Basics part) */}
          <Section 
            title="Especificaciones Físicas" 
            number="03"
            icon={<Building2 className="w-5 h-5" aria-hidden="true" />}
            isOpen={activeSection === 'specs'}
            onToggle={() => onSectionChange('specs')}
          >
            <SectionDescription>
              Configura las características estructurales de la edificación que definirán el plano de planta y la volumetría básica.
            </SectionDescription>
            <div className="space-y-8">
              {/* Dimensiones y estructura básica */}
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
                  onChange={(e) => handleChange("levels", parseInt(e.target.value))}
                  options={[1, 2, 3, 4, 5]}
                  disabled={disabled}
                />
              </div>
              
              {/* Distribución de espacios */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    Dormitorios
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={params.bedrooms}
                    onChange={(e) => handleChange("bedrooms", parseInt(e.target.value) || 1)}
                    disabled={disabled}
                    className="w-full bg-card border border-border rounded-none py-3 px-4 text-foreground text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    Baños
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={params.bathrooms}
                    onChange={(e) => handleChange("bathrooms", parseInt(e.target.value) || 1)}
                    disabled={disabled}
                    className="w-full bg-card border border-border rounded-none py-3 px-4 text-foreground text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    Estacionamientos
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={params.parkingSpots}
                    onChange={(e) => handleChange("parkingSpots", parseInt(e.target.value) || 0)}
                    disabled={disabled}
                    className="w-full bg-card border border-border rounded-none py-3 px-4 text-foreground text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Tipo de layout y áreas sociales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Select 
                  label="Tipo de Layout"
                  value={params.layoutType}
                  onChange={(e) => handleChange("layoutType", e.target.value)}
                  options={C.LAYOUT_TYPES}
                  disabled={disabled}
                />
                <Select 
                  label="Tipo de Techo"
                  value={params.roofType}
                  onChange={(e) => handleChange("roofType", e.target.value)}
                  options={C.ROOF_TYPES}
                  disabled={disabled}
                />
              </div>

              {/* Cocina y área social */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Select 
                  label="Tipo de Cocina"
                  value={params.kitchenType}
                  onChange={(e) => handleChange("kitchenType", e.target.value)}
                  options={C.KITCHEN_TYPES}
                  disabled={disabled}
                />
                <Select 
                  label="Tipo de Área Social"
                  value={params.livingAreaType}
                  onChange={(e) => handleChange("livingAreaType", e.target.value)}
                  options={C.LIVING_AREA_TYPES}
                  disabled={disabled}
                />
              </div>

              {/* Áreas sociales adicionales */}
              {renderChipsGroup(
                "Áreas Sociales Adicionales", 
                "socialAreas", 
                C.SOCIAL_AREAS, 
                "Selecciona espacios adicionales que deseas incluir en el diseño (piscina, gimnasio, cine, oficina, etc.)",
                true
              )}

              {/* Detalles arquitectónicos */}
              {renderChipsGroup(
                "Detalles Arquitectónicos", 
                "architecturalDetails", 
                C.ARCHITECTURAL_DETAILS, 
                "Selecciona características arquitectónicas destacadas que deseas enfatizar en el diseño",
                false
              )}
            </div>
          </Section>

          {/* SECTION 4: TECHNICAL NOTES */}
          <Section 
            title="Notas Técnicas de Arquitectura" 
            number="04"
            icon={<PenLine className="w-5 h-5" aria-hidden="true" />}
            isOpen={activeSection === 'technical-notes'}
            onToggle={() => onSectionChange('technical-notes')}
          >
            <SectionDescription>
              Añade información técnica específica que debe considerarse en el diseño del plano: dimensiones exactas, requisitos estructurales, normativas, accesibilidad, o cualquier detalle arquitectónico crítico.
            </SectionDescription>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1 pl-1">
                <label 
                  htmlFor="technical-notes-textarea"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-widest"
                >
                  Notas Técnicas
                </label>
                <p className="text-[11px] text-muted-foreground opacity-60 font-mono tracking-tight ml-1">
                  {`Ej: "El dormitorio principal debe tener mínimo 4x4m", "Cumplir con normativa de accesibilidad", "Incluir muro de carga en eje central", etc.`}
                </p>
              </div>
              <textarea
                id="technical-notes-textarea"
                value={params.technicalNotes || ''}
                onChange={(e) => handleChange("technicalNotes", e.target.value)}
                disabled={disabled}
                placeholder="Ej: El dormitorio principal debe tener mínimo 4x4m. Cumplir con normativa de accesibilidad. Incluir muro de carga en eje central. La cocina debe tener acceso directo al garaje..."
                rows={5}
                className="w-full bg-card border border-border rounded-none py-3 px-4 text-foreground text-sm leading-relaxed focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 placeholder:text-muted-foreground/50 hover:border-foreground resize-y"
                aria-describedby="technical-notes-help"
              />
            </div>
          </Section>

          {/* SECTION 5: FLOOR PLAN OUTPUT CONFIGURATION */}
          <Section 
            title="Configuración de Salida del Plano" 
            number="05"
            icon={<ImageIcon className="w-5 h-5" aria-hidden="true" />}
            badge="CALIDAD"
            isOpen={activeSection === 'fp-output'}
            onToggle={() => onSectionChange('fp-output')}
          >
            <SectionDescription>
              Define la calidad técnica de la imagen del plano de planta generada. Mayor resolución produce más detalle pero requiere más tiempo de procesamiento.
            </SectionDescription>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Select 
                  label="Resolución"
                  value={params.fpOutputResolution}
                  onChange={(e) => handleChange("fpOutputResolution", e.target.value)}
                  options={C.OUTPUT_RESOLUTIONS}
                  disabled={disabled}
                />
                <Select 
                  label="Relación de Aspecto"
                  value={params.fpAspectRatio}
                  onChange={(e) => handleChange("fpAspectRatio", e.target.value)}
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
                      <span className="text-primary font-bold"> 2K </span> es un buen balance para planos técnicos.
                    </p>
                </div>
              </div>
            </div>
          </Section>
        </>
      )}

      {/* RENDERING TAB */}
      {currentTab === 'rendering' && (
        <>
          {/* SECTION 3: PROJECT ESSENCE */}
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
            </div>
          </Section>

          {/* SECTION 4: MATERIALITY & FINISHES */}
          <Section 
            title="Materialidad y Acabados" 
            number="04"
            icon={<Building2 className="w-5 h-5" aria-hidden="true" />}
            isOpen={activeSection === 'specs-rendering'}
            onToggle={() => onSectionChange('specs-rendering')}
          >
            <SectionDescription>
              Define los materiales y el nivel de detalle que tendrá la visualización.
            </SectionDescription>
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Select 
                  label="Mood / Atmósfera"
                  value={params.mood}
                  onChange={(e) => handleChange("mood", e.target.value)}
                  options={C.MOODS}
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

          {/* SECTION 5: AESTHETICS & DETAILS */}
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

          {/* SECTION 6: CAMERA CONFIGURATION */}
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

          {/* SECTION 7: RENDER OUTPUT CONFIGURATION */}
          <Section 
            title="Configuración de Salida del Render" 
            number="07"
            icon={<ImageIcon className="w-5 h-5" aria-hidden="true" />}
            badge="CALIDAD"
            isOpen={activeSection === 'output'}
            onToggle={() => onSectionChange('output')}
          >
            <SectionDescription>
              Define la calidad técnica de la imagen del render final generada. Mayor resolución produce más detalle pero requiere más tiempo de procesamiento.
            </SectionDescription>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Select 
                  label="Resolución"
                  value={params.renderOutputResolution}
                  onChange={(e) => handleChange("renderOutputResolution", e.target.value)}
                  options={C.OUTPUT_RESOLUTIONS}
                  disabled={disabled}
                />
                <Select 
                  label="Relación de Aspecto"
                  value={params.renderAspectRatio}
                  onChange={(e) => handleChange("renderAspectRatio", e.target.value)}
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

          {/* SECTION 8: ART DIRECTION */}
          <Section 
            title="Dirección Artística" 
            number="08"
            icon={<Palette className="w-5 h-5" aria-hidden="true" />}
            badge="VISUAL"
            isOpen={activeSection === 'art-direction'}
            onToggle={() => onSectionChange('art-direction')}
          >
            <SectionDescription>
              Define la dirección artística y estética del render final. Aquí puedes especificar el estilo visual, la atmósfera, referencias cinematográficas, paletas de color específicas, o cualquier aspecto visual que debe priorizarse en la imagen generada.
            </SectionDescription>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1 pl-1">
                <label 
                  htmlFor="art-direction-textarea"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-widest"
                >
                  Dirección Artística
                </label>
                <p className="text-[11px] text-muted-foreground opacity-60 font-mono tracking-tight ml-1">
                  {`Ej: "Estilo cinematográfico tipo Blade Runner 2049, con neón suave y atmósfera cyberpunk", "Referencia visual de la arquitectura de Tadao Ando con luz dramática", "Paleta monocromática con acentos dorados", etc.`}
                </p>
              </div>
              <textarea
                id="art-direction-textarea"
                value={params.artDirection || ''}
                onChange={(e) => handleChange("artDirection", e.target.value)}
                disabled={disabled}
                placeholder="Ej: Estilo cinematográfico tipo Blade Runner 2049, con neón suave y atmósfera cyberpunk. Referencia visual de la arquitectura de Tadao Ando con luz dramática. Paleta monocromática con acentos dorados. La imagen debe transmitir una sensación de serenidad y elegancia minimalista..."
                rows={5}
                className="w-full bg-card border border-border rounded-none py-3 px-4 text-foreground text-sm leading-relaxed focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 placeholder:text-muted-foreground/50 hover:border-foreground resize-y"
                aria-describedby="art-direction-help"
              />
            </div>
            <div className="flex flex-col gap-2 mt-6">
              <div className="flex flex-col gap-1 pl-1">
                <label 
                  htmlFor="negative-prompt-textarea"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-widest"
                >
                  Negative Prompt
                </label>
                <p className="text-[11px] text-muted-foreground opacity-60 font-mono tracking-tight ml-1">
                  Especifica qué elementos NO deseas ver en el render. Ej: &quot;Sin personas&quot;, &quot;Sin vehículos&quot;, &quot;Sin cables eléctricos visibles&quot;, &quot;Sin elementos decorativos excesivos&quot;, etc.
                </p>
              </div>
              <textarea
                id="negative-prompt-textarea"
                value={params.negativePrompt || ''}
                onChange={(e) => handleChange("negativePrompt", e.target.value)}
                disabled={disabled}
                placeholder="Ej: Sin personas, sin vehículos, sin cables eléctricos visibles, sin elementos decorativos excesivos, sin publicidad, sin basura..."
                rows={4}
                className="w-full bg-card border border-border rounded-none py-3 px-4 text-foreground text-sm leading-relaxed focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 placeholder:text-muted-foreground/50 hover:border-foreground resize-y"
                aria-describedby="negative-prompt-help"
              />
            </div>
          </Section>
        </>
      )}
    </div>
  );
}
