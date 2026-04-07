import React from 'react';
import { DreamHouseParams } from '../types';
import * as C from '../app/constants';
import clsx from 'clsx';
import {
  Sparkles, MapPin, Box, LayoutGrid, Layers, Palette, Camera, ImageIcon, PenLine
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
}: ParameterFormProps) {

  const handleChange = (key: keyof DreamHouseParams, value: string | number | string[] | boolean) => {
    onChange({ ...params, [key]: value });
  };

  const toggleMultiSelect = (key: keyof DreamHouseParams, value: string) => {
    const current = Array.isArray(params[key]) ? (params[key] as string[]) : [];
    const newValues = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
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

      {/* ── 04 IDENTIDAD DEL PROYECTO ─────────────────────────────── */}
      <Section
        title="Identidad del Proyecto"
        number="04"
        icon={<Sparkles className="w-5 h-5" aria-hidden="true" />}
        badge="ESENCIA"
        isOpen={activeSection === 'identity'}
        onToggle={() => onSectionChange('identity')}
      >
        <SectionDescription>
          Define qué es y cómo debe sentirse el proyecto. El tipo de edificación, los estilos arquitectónicos de referencia, el arquitecto inspirador y la atmósfera general son el punto de partida de todo el diseño.
        </SectionDescription>
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              label="Tipo de Proyecto"
              value={params.projectType}
              onChange={(e) => handleChange("projectType", e.target.value)}
              options={C.PROJECT_TYPES}
              disabled={disabled}
            />
            <Select
              label="Mood / Atmósfera"
              value={params.mood}
              onChange={(e) => handleChange("mood", e.target.value)}
              options={C.MOODS}
              disabled={disabled}
            />
          </div>
          <div className="grid grid-cols-1 gap-6">
            {renderChipsGroup(
              "Estilo Arquitectónico",
              "architecturalStyles",
              C.STYLES,
              "Selecciona los estilos que definirán la estética. Puedes combinar varios para crear algo único.",
              true
            )}
            {renderChipsGroup(
              "Arquitecto de Referencia",
              "architect",
              C.ARCHITECTS,
              "La IA usará las características visuales y compositivas del arquitecto seleccionado como inspiración.",
              true
            )}
          </div>
        </div>
      </Section>

      {/* ── 05 UBICACIÓN Y ENTORNO ────────────────────────────────── */}
      <Section
        title="Ubicación y Entorno"
        number="05"
        icon={<MapPin className="w-5 h-5" aria-hidden="true" />}
        badge="CONTEXTO"
        isOpen={activeSection === 'location'}
        onToggle={() => onSectionChange('location')}
      >
        <SectionDescription>
          Dónde se emplaza el proyecto. La ciudad, el clima, el tipo de entorno y las condiciones meteorológicas determinan la integración contextual del edificio y la paleta lumínica del render.
        </SectionDescription>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 pl-1">
              <label
                htmlFor="city-input"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-widest"
              >
                Ciudad / Región
              </label>
              <p className="text-[11px] text-muted-foreground opacity-60 font-mono tracking-tight ml-1">
                Adapta el estilo al contexto cultural y urbano local
              </p>
            </div>
            <input
              id="city-input"
              type="text"
              value={params.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Ej: Tokyo, Barcelona, Dubai, Ciudad de México..."
              disabled={disabled}
              className="w-full bg-card border border-border rounded-none py-3 px-4 text-foreground text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 placeholder:text-muted-foreground/50 hover:border-foreground"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              label="Entorno Urbano"
              value={params.environment}
              onChange={(e) => handleChange("environment", e.target.value)}
              options={C.ENVIRONMENTS}
              disabled={disabled}
            />
            <Select
              label="Clima"
              value={params.climate}
              onChange={(e) => handleChange("climate", e.target.value)}
              options={C.CLIMATES}
              disabled={disabled}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              label="Cuerpo de Agua Cercano"
              value={params.waterBody}
              onChange={(e) => handleChange("waterBody", e.target.value)}
              options={C.WATER_BODIES}
              disabled={disabled}
            />
            <Select
              label="Condición Meteorológica"
              value={params.weatherCondition}
              onChange={(e) => handleChange("weatherCondition", e.target.value)}
              options={C.WEATHER_CONDITIONS}
              disabled={disabled}
            />
          </div>
        </div>
      </Section>

      {/* ── 06 VOLUMETRÍA Y FORMA ─────────────────────────────────── */}
      <Section
        title="Volumetría y Forma"
        number="06"
        icon={<Box className="w-5 h-5" aria-hidden="true" />}
        isOpen={activeSection === 'volumetry'}
        onToggle={() => onSectionChange('volumetry')}
      >
        <SectionDescription>
          La geometría visible del edificio. Tamaño, número de pisos, tipo de cubierta y organización espacial definen la silueta y la masa volumétrica que aparecerá en el render exterior.
        </SectionDescription>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              label="Tamaño"
              value={params.size}
              onChange={(e) => handleChange("size", e.target.value)}
              options={C.SIZES}
              disabled={disabled}
            />
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Número de Niveles
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={params.levels || ''}
                onChange={(e) => handleChange("levels", parseInt(e.target.value) || 0)}
                placeholder="—"
                disabled={disabled}
                className="w-full bg-card border border-border rounded-none py-3 px-4 text-foreground text-sm font-medium uppercase tracking-wide focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 hover:border-foreground placeholder:text-muted-foreground/50"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              label="Tipo de Cubierta / Techo"
              value={params.roofType}
              onChange={(e) => handleChange("roofType", e.target.value)}
              options={C.ROOF_TYPES}
              disabled={disabled}
            />
            <Select
              label="Organización Espacial (Layout)"
              value={params.layoutType}
              onChange={(e) => handleChange("layoutType", e.target.value)}
              options={C.LAYOUT_TYPES}
              disabled={disabled}
            />
          </div>
        </div>
      </Section>

      {/* ── 07 PROGRAMA ARQUITECTÓNICO ───────────────────────────── */}
      <Section
        title="Programa Arquitectónico"
        number="07"
        icon={<LayoutGrid className="w-5 h-5" aria-hidden="true" />}
        isOpen={activeSection === 'program'}
        onToggle={() => onSectionChange('program')}
      >
        <SectionDescription>
          El contenido funcional del edificio. Habitaciones, baños, estacionamiento y áreas de servicio informan al modelo la escala de uso y los volúmenes que deben reflejarse en el exterior.
        </SectionDescription>
        <div className="space-y-8">
          {/* Counts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Dormitorios
              </label>
              <input
                type="number"
                min="1"
                max="20"
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
                max="20"
                value={params.bathrooms}
                onChange={(e) => handleChange("bathrooms", parseInt(e.target.value) || 1)}
                disabled={disabled}
                className="w-full bg-card border border-border rounded-none py-3 px-4 text-foreground text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Estacionamientos (nº)
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={params.parkingSpots}
                onChange={(e) => handleChange("parkingSpots", parseInt(e.target.value) || 0)}
                disabled={disabled}
                className="w-full bg-card border border-border rounded-none py-3 px-4 text-foreground text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Parking type */}
          <Select
            label="Tipo de Estacionamiento"
            value={params.parkingType}
            onChange={(e) => handleChange("parkingType", e.target.value)}
            options={C.PARKING_TYPES}
            disabled={disabled}
          />

          {/* Interior types */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              label="Tipo de Cocina"
              value={params.kitchenType}
              onChange={(e) => handleChange("kitchenType", e.target.value)}
              options={C.KITCHEN_TYPES}
              disabled={disabled}
            />
            <Select
              label="Tipo de Área Social Principal"
              value={params.livingAreaType}
              onChange={(e) => handleChange("livingAreaType", e.target.value)}
              options={C.LIVING_AREA_TYPES}
              disabled={disabled}
            />
          </div>

          {/* Social areas */}
          {renderChipsGroup(
            "Áreas y Espacios Adicionales",
            "socialAreas",
            C.SOCIAL_AREAS,
            "Espacios que generan volúmenes reconocibles en el exterior: piscina, gimnasio, sala de cine, bodega, etc.",
            true
          )}
        </div>
      </Section>

      {/* ── 08 MATERIALIDAD Y TEXTURA ─────────────────────────────── */}
      <Section
        title="Materialidad y Textura"
        number="08"
        icon={<Layers className="w-5 h-5" aria-hidden="true" />}
        isOpen={activeSection === 'materials'}
        onToggle={() => onSectionChange('materials')}
      >
        <SectionDescription>
          Los materiales y su tratamiento superficial son el lenguaje táctil del edificio. Definen la textura, el reflejo, el peso visual y el nivel de detalle constructivo visible en la fachada.
        </SectionDescription>
        <div className="space-y-8">
          <Select
            label="Nivel de Acabados"
            value={params.finishLevel}
            onChange={(e) => handleChange("finishLevel", e.target.value)}
            options={C.FINISH_LEVELS}
            disabled={disabled}
          />
          {renderChipsGroup(
            "Materiales de Fachada",
            "materials",
            C.MATERIALS,
            "Selecciona los materiales visibles en el exterior. La combinación de texturas enriquece la profundidad visual del render."
          )}
          {renderChipsGroup(
            "Detalles Arquitectónicos",
            "architecturalDetails",
            C.ARCHITECTURAL_DETAILS,
            "Elementos formales que definen el carácter de la fachada: alturas, vanos, proporciones y gestos arquitectónicos destacados."
          )}
        </div>
      </Section>

      {/* ── 09 COLOR Y PAISAJE ────────────────────────────────────── */}
      <Section
        title="Color y Paisaje"
        number="09"
        icon={<Palette className="w-5 h-5" aria-hidden="true" />}
        isOpen={activeSection === 'landscape'}
        onToggle={() => onSectionChange('landscape')}
      >
        <SectionDescription>
          La paleta cromática del edificio y el entorno verde que lo enmarca. El paisajismo y los elementos exteriores (piscinas, pérgolas, muros) completan la composición y dan escala a la imagen.
        </SectionDescription>
        <div className="space-y-8">
          {renderChipsGroup(
            "Paleta de Color",
            "colorPalette",
            C.COLORS,
            "Tonos dominantes de la fachada. Definen la temperatura visual y el carácter emocional del render."
          )}
          {renderChipsGroup(
            "Elementos Exteriores",
            "exteriorElements",
            C.EXTERIOR_ELEMENTS,
            "Elementos construidos del entorno inmediato: piscinas, terrazas, pérgolas, iluminación arquitectónica, paneles solares, etc.",
            true
          )}
          {renderChipsGroup(
            "Vegetación y Paisajismo",
            "vegetation",
            C.VEGETATION,
            "Tipo de vegetación que integra el edificio con el paisaje circundante y aporta escala y naturalidad a la imagen."
          )}
        </div>
      </Section>

      {/* ── 10 FOTOGRAFÍA ────────────────────────────────────────── */}
      <Section
        title="Fotografía"
        number="10"
        icon={<Camera className="w-5 h-5" aria-hidden="true" />}
        isOpen={activeSection === 'photography'}
        onToggle={() => onSectionChange('photography')}
      >
        <SectionDescription>
          El encuadre, la luz y el momento del día determinan la calidad fotográfica del resultado. Estos parámetros controlan la narrativa visual: desde un amanecer sereno hasta un anochecer dramático con interiores iluminados.
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
              label="Estación del Año"
              value={params.season}
              onChange={(e) => handleChange("season", e.target.value)}
              options={C.SEASONS}
              disabled={disabled}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              label="Tipo de Iluminación"
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

      {/* ── 11 CONFIGURACIÓN DE SALIDA ───────────────────────────── */}
      <Section
        title="Configuración de Salida"
        number="11"
        icon={<ImageIcon className="w-5 h-5" aria-hidden="true" />}
        badge="OUTPUT"
        isOpen={activeSection === 'output'}
        onToggle={() => onSectionChange('output')}
      >
        <SectionDescription>
          Parámetros técnicos de la imagen generada: estilo visual del render, formato, resolución y nivel de razonamiento del modelo. Mayor resolución y mayor pensamiento producen resultados superiores a costa de más tiempo de generación.
        </SectionDescription>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              label="Estilo de Render"
              value={params.renderStyle}
              onChange={(e) => handleChange("renderStyle", e.target.value)}
              options={C.RENDER_STYLES}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              label="Resolución"
              value={params.renderOutputResolution}
              onChange={(e) => handleChange("renderOutputResolution", e.target.value)}
              options={C.OUTPUT_RESOLUTIONS}
              disabled={disabled}
            />
            <Select
              label="Nivel de Razonamiento (AI)"
              value={params.thinkingLevel}
              onChange={(e) => handleChange("thinkingLevel", e.target.value as "Minimal" | "High")}
              options={C.THINKING_LEVELS}
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
                <span className="text-primary font-bold">4K + High</span> produce la máxima calidad. Ideal para presentaciones y material impreso. El tiempo de generación aumenta notablemente.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 12 DIRECCIÓN CREATIVA ────────────────────────────────── */}
      <Section
        title="Dirección Creativa"
        number="12"
        icon={<PenLine className="w-5 h-5" aria-hidden="true" />}
        badge="OVERRIDES"
        isOpen={activeSection === 'creative'}
        onToggle={() => onSectionChange('creative')}
      >
        <SectionDescription>
          Instrucciones prioritarias que complementan o corrigen los parámetros anteriores. Las notas técnicas establecen restricciones obligatorias; la dirección artística añade visión creativa libre; el negative prompt excluye elementos no deseados.
        </SectionDescription>

        {/* Technical Notes — constraints first */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 pl-1">
            <label
              htmlFor="technical-notes-textarea"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-widest"
            >
              Notas Técnicas
            </label>
            <p className="text-[11px] text-muted-foreground opacity-60 font-mono tracking-tight ml-1">
              {`Restricciones obligatorias: orientación solar, accesos, normativas de altura, retiros, etc.`}
            </p>
          </div>
          <textarea
            id="technical-notes-textarea"
            value={params.technicalNotes || ''}
            onChange={(e) => handleChange("technicalNotes", e.target.value)}
            disabled={disabled}
            placeholder="Ej: Fachada principal orientada al norte. Acceso vehicular por lateral derecho. Altura máxima 9m. El garaje debe ser visible desde la calle. Retiro frontal mínimo 3m..."
            rows={3}
            className="w-full bg-card border border-border rounded-none py-3 px-4 text-foreground text-sm leading-relaxed focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 placeholder:text-muted-foreground/50 hover:border-foreground resize-y"
          />
        </div>

        {/* Art Direction — creative vision second */}
        <div className="flex flex-col gap-2 mt-6">
          <div className="flex flex-col gap-1 pl-1">
            <label
              htmlFor="art-direction-textarea"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-widest"
            >
              Dirección Artística
            </label>
            <p className="text-[11px] text-muted-foreground opacity-60 font-mono tracking-tight ml-1">
              {`Visión creativa libre: referencias cinematográficas, paletas específicas, atmósferas, estados emocionales, etc.`}
            </p>
          </div>
          <textarea
            id="art-direction-textarea"
            value={params.artDirection || ''}
            onChange={(e) => handleChange("artDirection", e.target.value)}
            disabled={disabled}
            placeholder="Ej: Estilo cinematográfico tipo Blade Runner 2049, atmósfera melancólica con neón suave. Referencia a la brutalidad poética de Scarpa. Paleta monocromática con un único acento dorado en la entrada..."
            rows={4}
            className="w-full bg-card border border-border rounded-none py-3 px-4 text-foreground text-sm leading-relaxed focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 placeholder:text-muted-foreground/50 hover:border-foreground resize-y"
          />
        </div>

        {/* Negative Prompt — exclusions last */}
        <div className="flex flex-col gap-2 mt-6">
          <div className="flex flex-col gap-1 pl-1">
            <label
              htmlFor="negative-prompt-textarea"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-widest"
            >
              Negative Prompt
            </label>
            <p className="text-[11px] text-muted-foreground opacity-60 font-mono tracking-tight ml-1">
              Elementos que NO deben aparecer en la imagen generada.
            </p>
          </div>
          <textarea
            id="negative-prompt-textarea"
            value={params.negativePrompt || ''}
            onChange={(e) => handleChange("negativePrompt", e.target.value)}
            disabled={disabled}
            placeholder="Ej: Sin personas, sin vehículos, sin cables eléctricos, sin carteles publicitarios, sin elementos anacrónicos..."
            rows={3}
            className="w-full bg-card border border-border rounded-none py-3 px-4 text-foreground text-sm leading-relaxed focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 placeholder:text-muted-foreground/50 hover:border-foreground resize-y"
          />
        </div>
      </Section>

    </div>
  );
}
