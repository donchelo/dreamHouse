import React from 'react';
import { DreamHouseParams } from '../types';
import * as C from '../app/constants';
import clsx from 'clsx';
import { ChevronDown, Check, Settings2, Palette, UserPen, Dices, NotebookPen } from 'lucide-react';

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
    // Helper to pick random item from array
    const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    const pickMulti = (arr: string[], max: number = 3): string[] => {
      const count = Math.floor(Math.random() * max) + 1;
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const randomParams: DreamHouseParams = {
      ...params,
      architect: pickMulti(C.ARCHITECTS, 2),
      climate: pick(C.CLIMATES),
      environment: pick(C.ENVIRONMENTS),
      size: pick(C.SIZES),
      levels: Math.floor(Math.random() * 3) + 1, // 1-3 levels mostly
      roofType: pick(C.ROOF_TYPES),
      timeOfDay: pick(C.TIMES_OF_DAY),
      season: pick(C.SEASONS),
      cameraAngle: pick(C.ANGLES),
      architecturalStyles: pickMulti(C.STYLES, 2),
      materials: pickMulti(C.MATERIALS, 3),
      colorPalette: pickMulti(C.COLORS, 2),
      exteriorElements: pickMulti(C.EXTERIOR_ELEMENTS, 3),
      vegetation: pickMulti(C.VEGETATION, 2),
      // Keep existing text inputs
      city: params.city,
      additionalNotes: params.additionalNotes
    };

    onChange(randomParams);
  };

  const renderSelect = (label: string, key: keyof DreamHouseParams, options: string[] | number[]) => (
    <div className="flex flex-col gap-2 group">
      <label className="text-sm font-bold text-gray-700 uppercase tracking-wide pl-1 cursor-pointer">{label}</label>
      <div className="relative">
        <select
          value={params[key] as string | number}
          onChange={(e) => handleChange(key, e.target.value)}
          disabled={disabled}
          className="w-full appearance-none bg-white border-2 border-border rounded-lg py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-base shadow-sm hover:border-gray-400 cursor-pointer"
        >
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 group-focus-within:text-primary transition-colors">
          <ChevronDown className="h-5 w-5 stroke-[3]" />
        </div>
      </div>
    </div>
  );

  const renderChips = (label: string, key: keyof DreamHouseParams, options: string[], max: number, scrollable: boolean = false) => (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-end border-b-2 border-gray-100 pb-2">
        <label className="text-base font-bold text-gray-900">{label}</label>
        {max < 10 && (
          <span className="text-xs font-bold bg-accent px-2.5 py-1 rounded-md text-gray-700">
            {(Array.isArray(params[key]) ? (params[key] as string[]).length : 0)} / {max}
          </span>
        )}
      </div>
      <div className={clsx(
        "flex flex-wrap gap-2.5",
        scrollable && "max-h-56 overflow-y-auto p-1 custom-scrollbar"
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
                "cursor-pointer group relative px-3.5 py-2 text-sm rounded-md border-2 transition-all duration-200 ease-out flex items-center gap-2 font-medium",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isSelected && <Check className="w-4 h-4" strokeWidth={3} />}
              <span className="text-left">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
        
        {/* Header Actions - Static Random Button */}
        <div className="flex justify-end py-2">
            <button
                type="button"
                onClick={handleRandomize}
                disabled={disabled}
                className="cursor-pointer shadow-depth transform transition-transform active:translate-y-1 active:shadow-none flex items-center gap-3 px-6 py-3 text-base font-bold text-white bg-black border-2 border-black rounded-full hover:bg-gray-900 focus:ring-2 focus:ring-offset-2 focus:ring-black"
                title="Generar una combinación aleatoria de parámetros"
                aria-label="Generar combinación aleatoria"
            >
                <Dices className="w-5 h-5 animate-pulse-subtle" />
                <span>SORPRÉNDEME (RANDOM)</span>
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Columna Izquierda: Controles Técnicos */}
        <div className="lg:col-span-5 space-y-8">
            <section className="space-y-6 bg-white p-6 rounded-xl border-2 border-border shadow-depth">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-200">
                <Settings2 className="w-6 h-6 text-black" />
                <h3 className="text-xl font-bold text-black">Parámetros Base</h3>
            </div>
            
            <div className="space-y-6">
                {/* Architects */}
                <div className="bg-gray-100 p-5 rounded-lg border-2 border-gray-300">
                    <div className="flex items-center gap-2 mb-4">
                        <UserPen className="w-5 h-5 text-black" />
                        <span className="text-sm font-extrabold uppercase tracking-wider text-black">Arquitectura de Autor</span>
                    </div>
                    {renderChips("Selecciona Referentes", "architect", C.ARCHITECTS, 2, true)}
                </div>
                
                <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide pl-1">Ciudad</label>
                <input
                    type="text"
                    value={params.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="Ej: Tokyo, Barcelona..."
                    disabled={disabled}
                    className="w-full bg-white border-2 border-border rounded-lg py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 font-medium text-base placeholder:text-gray-400 shadow-sm hover:border-gray-400"
                />
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                {renderSelect("Clima", "climate", C.CLIMATES)}
                {renderSelect("Entorno", "environment", C.ENVIRONMENTS)}
                </div>

                <div className="grid grid-cols-2 gap-5">
                {renderSelect("Tamaño", "size", C.SIZES)}
                {renderSelect("Niveles", "levels", [1, 2, 3, 4, 5])}
                </div>
            </div>
            </section>

            <section className="space-y-6 bg-white p-6 rounded-xl border-2 border-border shadow-depth">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-200">
                <h3 className="text-sm font-extrabold text-black uppercase tracking-wider">Configuración de Escena</h3>
            </div>
            <div className="grid grid-cols-2 gap-5">
                {renderSelect("Techo", "roofType", C.ROOF_TYPES)}
                {renderSelect("Ángulo", "cameraAngle", C.ANGLES)}
                {renderSelect("Hora", "timeOfDay", C.TIMES_OF_DAY)}
                {renderSelect("Estación", "season", C.SEASONS)}
            </div>
            </section>
        </div>

        {/* Columna Derecha: Estilo y Detalles */}
        <div className="lg:col-span-7 space-y-8">
            <section className="space-y-6 bg-white p-6 lg:p-8 rounded-xl border-2 border-border shadow-depth h-full">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-200">
                <Palette className="w-6 h-6 text-black" />
                <h3 className="text-xl font-bold text-black">Estética y Materiales</h3>
            </div>
            
            <div className="space-y-10">
                {renderChips("Estilo Arquitectónico", "architecturalStyles", C.STYLES, 99)}
                {renderChips("Materiales Principales", "materials", C.MATERIALS, 99)}
                {renderChips("Paleta de Color", "colorPalette", C.COLORS, 99)}
                
                <div className="pt-6 border-t-2 border-gray-100 space-y-10">
                    {renderChips("Elementos Exteriores", "exteriorElements", C.EXTERIOR_ELEMENTS, 99)}
                    {renderChips("Vegetación", "vegetation", C.VEGETATION, 99)}
                </div>

                <div className="pt-6 border-t-2 border-gray-100">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 mb-1">
                            <NotebookPen className="w-5 h-5 text-gray-700" />
                            <label className="text-base font-bold text-gray-900">Notas Adicionales</label>
                        </div>
                        <p className="text-sm text-gray-600 font-medium mb-2">Describe detalles específicos, emociones o instrucciones extra para la IA.</p>
                        <textarea
                            value={params.additionalNotes || ''}
                            onChange={(e) => handleChange("additionalNotes", e.target.value)}
                            disabled={disabled}
                            placeholder="Ej: Quiero que la casa tenga una atmósfera melancólica, con mucha niebla y que parezca abandonada pero elegante..."
                            rows={4}
                            className="w-full bg-white border-2 border-border rounded-lg py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 font-medium text-base placeholder:text-gray-400 shadow-sm hover:border-gray-400 resize-y"
                        />
                    </div>
                </div>
            </div>
            </section>
        </div>
        </div>
    </div>
  );
}
