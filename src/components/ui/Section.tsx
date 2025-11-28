'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Card } from './Card';

interface SectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
  className?: string;
  accentColor?: 'primary' | 'secondary';
}

export function Section({
  title,
  icon,
  children,
  defaultOpen = true,
  badge,
  className,
  accentColor = 'primary',
}: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Spotlight effect following mouse
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const accentColors = {
    primary: {
      iconBg: 'bg-primary/10',
      iconBgActive: 'bg-primary/20',
      iconText: 'text-primary',
      border: 'border-primary/30',
      glow: 'shadow-[0_0_30px_-10px_var(--primary)]',
      badgeBg: 'bg-primary/10',
      badgeText: 'text-primary',
      badgeBorder: 'border-primary/20',
    },
    secondary: {
      iconBg: 'bg-secondary/10',
      iconBgActive: 'bg-secondary/20',
      iconText: 'text-secondary',
      border: 'border-secondary/30',
      glow: 'shadow-[0_0_30px_-10px_var(--secondary)]',
      badgeBg: 'bg-secondary/10',
      badgeText: 'text-secondary',
      badgeBorder: 'border-secondary/20',
    },
  };

  const colors = accentColors[accentColor];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={twMerge(
        'relative rounded-2xl overflow-hidden transition-all duration-500 group',
        isOpen ? colors.glow : '',
        className
      )}
      style={{
        '--mouse-x': `${mousePos.x}%`,
        '--mouse-y': `${mousePos.y}%`,
      } as React.CSSProperties}
    >
      {/* Animated gradient border */}
      <div className={twMerge(
        'absolute inset-0 rounded-2xl p-[1px] transition-opacity duration-500',
        'bg-gradient-to-br from-transparent via-border to-transparent',
        isOpen && 'from-primary/30 via-border to-secondary/20'
      )}>
        <div className="absolute inset-[1px] rounded-[15px] bg-card" />
      </div>

      {/* Spotlight overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 107, 44, 0.04), transparent 40%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={twMerge(
            "w-full p-5 sm:p-6 flex items-center justify-between transition-all duration-300 outline-none cursor-pointer",
            isOpen ? "bg-card-elevated/50" : "bg-card/50 hover:bg-card-elevated/30"
          )}
        >
          <div className="flex items-center gap-4 text-left">
            {icon && (
              <div className={twMerge(
                "relative p-2.5 rounded-xl border transition-all duration-300",
                isOpen 
                  ? `${colors.iconBgActive} ${colors.iconText} ${colors.border}` 
                  : "bg-card border-border text-muted-foreground group-hover:text-foreground group-hover:border-border-hover"
              )}>
                {icon}
                {/* Glow ring when open */}
                {isOpen && (
                  <div className={twMerge(
                    "absolute inset-0 rounded-xl opacity-50",
                    colors.iconBg
                  )} style={{ filter: 'blur(8px)' }} />
                )}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <h3 className={twMerge(
                "text-base sm:text-lg font-semibold transition-colors duration-300",
                isOpen ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
              )}>
                {title}
              </h3>
              {badge && (
                <span className={twMerge(
                  "text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider w-fit",
                  colors.badgeBg, colors.badgeText, colors.badgeBorder
                )}>
                  {badge}
                </span>
              )}
            </div>
          </div>

          {/* Toggle button */}
          <div className={twMerge(
            "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300",
            isOpen 
              ? `bg-gradient-to-br from-primary to-primary-glow text-primary-foreground border-transparent rotate-90 shadow-lg shadow-primary/20` 
              : "bg-card text-muted-foreground border-border group-hover:bg-card-elevated group-hover:border-border-hover group-hover:text-foreground"
          )}>
            <ChevronRight className="w-5 h-5" />
          </div>
        </button>
        
        {/* Collapsible content */}
        <div
          className={twMerge(
            'grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          )}
        >
          <div className="overflow-hidden">
            <div className="px-5 sm:px-6 pb-6 pt-2 space-y-6">
              {/* Decorative divider */}
              <div className="relative h-px w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
                <div 
                  className={twMerge(
                    "absolute inset-0 bg-gradient-to-r from-transparent to-transparent transition-opacity duration-500",
                    isOpen ? "opacity-100 via-primary/50" : "opacity-0"
                  )}
                  style={{
                    background: `linear-gradient(90deg, transparent, var(--primary), transparent)`,
                    transform: 'scaleX(0.5)',
                  }}
                />
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
