'use client';

import React, { useState, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

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
}: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={twMerge(
        'group border-b border-border transition-all duration-300',
        isOpen ? 'pb-8' : '',
        className
      )}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:opacity-70 transition-opacity"
      >
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
               {badge && (
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-foreground text-background">
                  {badge}
                </span>
              )}
              <h3 className="text-xl font-bold uppercase tracking-tight">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Toggle button */}
        <div className="w-8 h-8 flex items-center justify-center border border-foreground rounded-full">
            {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      
      {/* Collapsible content */}
      <div
        className={twMerge(
          'grid transition-all duration-300 ease-out',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="pt-4 space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
