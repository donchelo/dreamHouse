import React from 'react';
import { DreamHouseParams } from '@/types';
import {
  FileText, Sparkles, MapPin, Layers, LayoutGrid,
  Hammer, Palette, Camera, Settings2, PenLine, Maximize2, Armchair
} from 'lucide-react';

interface PromptPreviewProps {
  params: DreamHouseParams;
}

type ParamValue = string | string[] | number;

interface ParamItem {
  label: string;
  value: ParamValue;
}

interface ParamGroup {
  number: string;
  title: string;
  icon: React.ReactNode;
  items: ParamItem[];
}

function hasValue(val: ParamValue): boolean {
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === 'number') return val > 0;
  return val !== '' && val !== undefined && val !== null;
}

function renderValue(val: ParamValue): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === 'number') return [String(val)];
  return [val];
}

export default function PromptPreview({ params }: PromptPreviewProps) {
  const groups: ParamGroup[] = [
    {
      number: '03',
      title: 'Modo de Trabajo',
      icon: <Maximize2 className="w-3.5 h-3.5" />,
      items: [
        { label: 'MODO', value: params.mode },
      ],
    },
    {
      number: '04',
      title: 'Esencia del Proyecto',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      items: [
        { label: 'TIPO', value: params.mode === 'exterior' ? params.projectType : params.roomType },
        { label: 'ESTILO', value: params.architecturalStyles },
        { label: 'ARQUITECTO', value: params.architect },
        { label: 'MOOD', value: params.mood },
      ],
    },
    {
      number: '05',
      title: 'Contexto y Ubicación',
      icon: <MapPin className="w-3.5 h-3.5" />,
      items: [
        { label: 'CIUDAD', value: params.city },
        { label: 'CLIMA', value: params.climate },
        { label: 'ENTORNO', value: params.environment },
        { label: 'AGUA', value: params.waterBody },
        { label: 'TIEMPO', value: params.weatherCondition },
      ],
    },
    {
      number: '06',
      title: 'Volumetría y Forma',
      icon: <Layers className="w-3.5 h-3.5" />,
      items: [
        { label: 'TAMAÑO', value: params.size },
        { label: 'NIVELES', value: params.levels },
        { label: 'CUBIERTA', value: params.roofType },
        { label: 'PLANTA', value: params.layoutType },
      ],
    },
    {
      number: '07',
      title: 'Diseño Interior',
      icon: <Armchair className="w-3.5 h-3.5" />,
      items: [
        { label: 'MUEBLES', value: params.furnitureStyle },
        { label: 'LUZ INT.', value: params.interiorLighting },
      ],
    },
    {
      number: '08',
      title: 'Programa Arquitectónico',
      icon: <LayoutGrid className="w-3.5 h-3.5" />,
      items: [
        { label: 'HABITAC.', value: params.bedrooms },
        { label: 'BAÑOS', value: params.bathrooms },
        { label: 'PARQUEO', value: params.parkingSpots },
        { label: 'TIPO PKG', value: params.parkingType },
        { label: 'COCINA', value: params.kitchenType },
        { label: 'SALA', value: params.livingAreaType },
        { label: 'ÁREAS SOC.', value: params.socialAreas },
      ],
    },
    {
      number: '09',
      title: 'Materialidad y Acabados',
      icon: <Hammer className="w-3.5 h-3.5" />,
      items: [
        { label: 'SUELO', value: params.flooringMaterial },
        { label: 'TECHO', value: params.ceilingDetail },
        { label: 'REVESTIM.', value: params.materials },
        { label: 'CALIDAD', value: params.finishLevel },
        { label: 'DETALLES', value: params.architecturalDetails },
      ],
    },
    {
      number: '10',
      title: 'Estética y Paisaje',
      icon: <Palette className="w-3.5 h-3.5" />,
      items: [
        { label: 'PALETA', value: params.colorPalette },
        { label: 'ELEMENTOS', value: params.exteriorElements },
        { label: 'VEGETACIÓN', value: params.vegetation },
      ],
    },
    {
      number: '11',
      title: 'Parámetros Fotográficos',
      icon: <Camera className="w-3.5 h-3.5" />,
      items: [
        { label: 'CÁMARA', value: params.cameraPreset },
        { label: 'FOCAL', value: params.focalLength },
        { label: 'APERTURA', value: params.aperture },
        { label: 'PELÍCULA', value: params.filmSimulation },
        { label: 'ÁNGULO', value: params.cameraAngle },
        { label: 'COMPOSICIÓN', value: params.composition },
        { label: 'HORA', value: params.timeOfDay },
        { label: 'LUZ', value: params.lighting },
      ],
    },
    {
      number: '12',
      title: 'Configuración de Salida',
      icon: <Settings2 className="w-3.5 h-3.5" />,
      items: [
        { label: 'RENDER', value: params.renderStyle },
        { label: 'RATIO', value: params.renderAspectRatio },
        { label: 'RESOLUCIÓN', value: params.renderOutputResolution },
        { label: 'THINKING', value: params.thinkingLevel !== 'Minimal' ? params.thinkingLevel : '' },
      ],
    },
    {
      number: '13',
      title: 'Dirección Creativa',
      icon: <PenLine className="w-3.5 h-3.5" />,
      items: [
        { label: 'EDITAR', value: params.editPrompt },
        { label: 'TÉCNICAS', value: params.technicalNotes },
        { label: 'ART DIR.', value: params.artDirection },
        { label: 'EXCLUIR', value: params.negativePrompt },
      ],
    },
  ];

  // Only show groups that have at least one value set
  const activeGroups = groups.filter(g => g.items.some(item => hasValue(item.value)));

  const totalParams = groups.reduce(
    (acc, g) => acc + g.items.filter(item => hasValue(item.value)).length,
    0
  );

  return (
    <div className="h-full flex flex-col animate-fade-in-up bg-card/50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-sm">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Design Spec</h3>
            <p className="text-[10px] text-muted-foreground font-mono">
              {totalParams > 0 ? `${totalParams} PARAMS ACTIVE` : 'NO PARAMS SET'}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-primary/40"></div>
          <div className="w-1 h-1 rounded-full bg-primary/40"></div>
          <div className={`w-1 h-1 rounded-full ${totalParams > 0 ? 'bg-primary' : 'bg-border'}`}></div>
        </div>
      </div>

      {totalParams === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest text-center">
            Configure parameters<br />to see the spec
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 space-y-5">
          {activeGroups.map((group) => {
            const activeItems = group.items.filter(item => hasValue(item.value));
            return (
              <div
                key={group.number}
                className="relative pl-3 border-l border-border/40 hover:border-primary/30 transition-colors duration-300"
              >
                {/* Section Header */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[9px] font-mono text-muted-foreground/40">{group.number}</span>
                  <span className="text-muted-foreground">{group.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                    {group.title}
                  </span>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 gap-1.5">
                  {activeItems.map((item, i) => {
                    const values = renderValue(item.value);
                    return values.map((val, vIdx) => (
                      <div
                        key={`${i}-${vIdx}`}
                        className="group flex items-baseline gap-3 transition-all"
                      >
                        <span className="text-[10px] font-mono text-muted-foreground/50 w-[4.5rem] shrink-0 uppercase tracking-tight text-right group-hover:text-primary/70 transition-colors">
                          {item.label}
                        </span>
                        <span className="text-xs font-medium text-foreground border-b border-dashed border-border/50 pb-0.5 group-hover:border-primary/30 transition-colors leading-tight">
                          {val}
                        </span>
                      </div>
                    ));
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
