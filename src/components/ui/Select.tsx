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
    <div className={twMerge('flex flex-col gap-2 group', containerClassName)}>
      {label && (
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={twMerge(
            'w-full appearance-none bg-card border border-border rounded-lg py-2.5 px-3 pr-10',
            'text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30',
            'transition-all disabled:opacity-50 hover:border-border-hover cursor-pointer',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-card text-foreground">
              {opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground group-focus-within:text-primary">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

