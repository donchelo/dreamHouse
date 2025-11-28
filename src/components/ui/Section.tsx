import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Card } from './Card';

interface SectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
  className?: string;
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
    <Card className={twMerge('overflow-hidden', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between hover:bg-card-elevated transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          {icon && <div className="text-primary shrink-0">{icon}</div>}
          <h3 className="text-sm sm:text-base font-semibold text-foreground">{title}</h3>
          {badge && (
            <span className="text-[10px] font-mono px-2 py-0.5 bg-primary/10 text-primary rounded-full whitespace-nowrap">
              {badge}
            </span>
          )}
        </div>
        <ChevronRight
          className={twMerge(
            'w-5 h-5 text-muted-foreground transition-transform duration-200 shrink-0',
            isOpen && 'rotate-90'
          )}
        />
      </button>
      <div
        className={twMerge(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="p-4 sm:p-5 pt-0 space-y-4 sm:space-y-5 border-t border-border">
          {children}
        </div>
      </div>
    </Card>
  );
}

