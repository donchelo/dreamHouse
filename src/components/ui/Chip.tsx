import React from 'react';
import { Check } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
}

export function Chip({
  selected,
  onToggle,
  className,
  children,
  disabled,
  ...props
}: ChipProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onToggle}
      className={twMerge(
        'px-3 py-1.5 text-xs rounded-md border transition-all duration-200 flex items-center gap-1.5 font-medium',
        selected
          ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20'
          : 'bg-card text-card-foreground border-border hover:border-border-hover hover:bg-card-elevated',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {selected && <Check className="w-3 h-3" strokeWidth={3} />}
      <span>{children}</span>
    </button>
  );
}

