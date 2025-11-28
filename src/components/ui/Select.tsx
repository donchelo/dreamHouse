import React from 'react';
import { ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: (string | number)[];
  containerClassName?: string;
}

export function Select({
  label,
  options,
  className,
  containerClassName,
  ...props
}: SelectProps) {
  return (
    <div className={twMerge('flex flex-col gap-2.5 group', containerClassName)}>
      {label && (
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest pl-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={twMerge(
            'w-full appearance-none bg-card/50 backdrop-blur-sm border border-border rounded-xl py-3 px-4 pr-10',
            'text-foreground text-sm font-medium',
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
            'transition-all duration-200 ease-out',
            'hover:bg-card-elevated hover:border-border-hover cursor-pointer',
            'disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-card-elevated text-foreground py-2">
              {opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground transition-colors group-hover:text-foreground group-focus-within:text-primary">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
