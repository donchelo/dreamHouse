import React from 'react';
import { DreamHouseParams } from '../types';
import * as C from '../app/constants';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

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
    const current = params[key] as string[];
    let newValues;
    if (current.includes(value)) {
      newValues = current.filter(v => v !== value);
    } else {
      if (current.length >= max) return; // Max limit reached
      newValues = [...current, value];
    }
    handleChange(key, newValues);
  };

  const renderSelect = (label: string, key: keyof DreamHouseParams, options: string[] | number[]) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <select
          value={params[key] as string | number}
          onChange={(e) => handleChange(key, e.target.value)}
          disabled={disabled}
          className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );

  const renderChips = (label: string, key: keyof DreamHouseParams, options: string[], max: number) => (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-xs text-gray-500">{(params[key] as string[]).length}/{max}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const isSelected = (params[key] as string[]).includes(opt);
          const isMaxReached = (params[key] as string[]).length >= max;
          return (
            <button
              key={opt}
              type="button"
              disabled={disabled || (!isSelected && isMaxReached)}
              onClick={() => toggleMultiSelect(key, opt, max)}
              className={clsx(
                "px-3 py-1 text-sm rounded-full border transition-colors",
                isSelected
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">Configuración General</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderSelect("Arquitecto", "architect", C.ARCHITECTS)}
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Ciudad</label>
            <input
              type="text"
              value={params.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Ej: Tokyo, Barcelona..."
              disabled={disabled}
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          {renderSelect("Clima", "climate", C.CLIMATES)}
          {renderSelect("Entorno", "environment", C.ENVIRONMENTS)}
          {renderSelect("Tamaño", "size", C.SIZES)}
          {renderSelect("Niveles", "levels", [1, 2, 3, 4, 5])}
          {renderSelect("Techo", "roofType", C.ROOF_TYPES)}
          {renderSelect("Hora", "timeOfDay", C.TIMES_OF_DAY)}
          {renderSelect("Estación", "season", C.SEASONS)}
          {renderSelect("Ángulo Cámara", "cameraAngle", C.ANGLES)}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">Detalles y Estilo</h3>
        <div className="space-y-6">
          {renderChips("Estilos Arquitectónicos", "architecturalStyles", C.STYLES, 2)}
          {renderChips("Materiales", "materials", C.MATERIALS, 3)}
          {renderChips("Paleta de Color", "colorPalette", C.COLORS, 2)}
          {renderChips("Elementos Exteriores", "exteriorElements", C.EXTERIOR_ELEMENTS, 5)}
          {renderChips("Vegetación", "vegetation", C.VEGETATION, 3)}
        </div>
      </section>
    </div>
  );
}

