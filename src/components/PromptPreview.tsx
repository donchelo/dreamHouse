import React from 'react';
import { DreamHouseParams } from '@/types';
import { Tag, Sparkles, MapPin, Building2, Palette, Camera, FileText } from 'lucide-react';

interface PromptPreviewProps {
  params: DreamHouseParams;
}

export default function PromptPreview({ params }: PromptPreviewProps) {
  // Helper to check if value exists
  const hasValue = (val: string | string[] | number) => {
    if (Array.isArray(val)) return val.length > 0;
    return val !== "" && val !== "Sin arquitecto específico" && val !== "Sin agua cercana" && val !== "Sin personas";
  };

  // Group parameters logically - Icons updated to be consistent
  const groups = [
    {
      title: "Project Identity",
      icon: <Sparkles className="w-3.5 h-3.5" />,
      items: [
        { label: "TYPE", value: params.projectType },
        { label: "STYLE", value: params.architecturalStyles },
        { label: "ARCHITECT", value: params.architect },
        { label: "MOOD", value: params.mood },
      ]
    },
    {
      title: "Site Context",
      icon: <MapPin className="w-3.5 h-3.5" />,
      items: [
        { label: "LOCATION", value: params.city },
        { label: "ENV", value: params.environment },
        { label: "CLIMATE", value: params.climate },
        { label: "TIME", value: params.timeOfDay },
      ]
    },
    {
      title: "Specifications",
      icon: <Building2 className="w-3.5 h-3.5" />,
      items: [
        { label: "MATERIALS", value: params.materials },
        { label: "SIZE", value: params.size },
        { label: "LEVELS", value: `${params.levels}` },
        { label: "FINISH", value: params.finishLevel },
      ]
    },
    {
      title: "Aesthetics",
      icon: <Palette className="w-3.5 h-3.5" />,
      items: [
        { label: "PALETTE", value: params.colorPalette },
        { label: "ELEMENTS", value: params.exteriorElements },
        { label: "NATURE", value: params.vegetation },
      ]
    },
    {
      title: "Photography",
      icon: <Camera className="w-3.5 h-3.5" />,
      items: [
        { label: "ANGLE", value: params.cameraAngle },
        { label: "LIGHT", value: params.lighting },
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col animate-fade-in-up bg-card/50 backdrop-blur-sm">
      {/* Header Styled like a technical document header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-sm">
             <FileText className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Design Spec</h3>
            <p className="text-[10px] text-muted-foreground font-mono">LIVE PARAMETERS</p>
          </div>
        </div>
        <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-primary/40"></div>
            <div className="w-1 h-1 rounded-full bg-primary/40"></div>
            <div className="w-1 h-1 rounded-full bg-primary"></div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-8">
        {groups.map((group, idx) => (
          <div key={idx} className="relative pl-3 border-l border-border/40 hover:border-primary/30 transition-colors duration-300">
            {/* Category Header */}
            <div className="flex items-center gap-2 mb-3">
               <span className="text-muted-foreground">{group.icon}</span>
               <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">{group.title}</span>
            </div>
            
            {/* Items Grid */}
            <div className="grid grid-cols-1 gap-2">
              {group.items.map((item, i) => {
                if (!hasValue(item.value)) return null;
                
                const values = Array.isArray(item.value) ? item.value : [item.value];
                
                return values.map((val, vIdx) => (
                  <div 
                    key={`${i}-${vIdx}`}
                    className="group flex items-baseline gap-3 text-sm transition-all"
                  >
                    <span className="text-[10px] font-mono text-muted-foreground/50 w-16 shrink-0 uppercase tracking-tight text-right group-hover:text-primary/70 transition-colors">
                      {item.label}
                    </span>
                    <span className="text-xs font-medium text-foreground border-b border-dashed border-border/50 pb-0.5 group-hover:border-primary/30 transition-colors">
                      {val}
                    </span>
                  </div>
                ));
              })}
            </div>
          </div>
        ))}

        {params.additionalNotes && (
          <div className="mt-6 pt-4 border-t border-border/40">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Technical Notes</p>
            <div className="p-3 bg-muted/30 border border-border/50 text-xs text-muted-foreground italic font-mono leading-relaxed">
              "{params.additionalNotes}"
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
