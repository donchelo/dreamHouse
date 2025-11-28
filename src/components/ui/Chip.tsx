'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'glow';
  role?: string;
}

export function Chip({
  selected,
  onToggle,
  className,
  children,
  disabled,
  variant = 'default',
  ...props
}: ChipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Ripple effect on click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setRipple({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setTimeout(() => setRipple(null), 600);
    }
    
    onToggle?.();
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={twMerge(
        'group relative px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ease-out',
        'flex items-center gap-2 overflow-hidden border',
        'transform-gpu', // Hardware acceleration
        selected
          ? 'bg-gradient-to-r from-primary to-primary-glow text-primary-foreground border-transparent scale-[1.02] shadow-[0_0_25px_-5px_var(--primary)]'
          : 'bg-card/80 backdrop-blur-sm text-muted-foreground border-border hover:text-foreground hover:border-border-hover hover:bg-card-elevated',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-card/80',
        'active:scale-95 cursor-pointer',
        className
      )}
      {...props}
    >
      {/* Ripple Effect */}
      {ripple && (
        <span
          className="absolute rounded-full bg-white/30 animate-[pulse-ring_0.6s_ease-out]"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      )}

      {/* Shine sweep on hover (unselected) */}
      {!selected && !disabled && (
        <div 
          className={twMerge(
            "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent",
            "translate-x-[-100%] transition-transform duration-700",
            isHovered && "translate-x-[100%]"
          )}
        />
      )}

      {/* Selected glow ring */}
      {selected && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary-glow to-primary opacity-20 blur-sm" />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {selected && (
          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/20 animate-scale-up">
            <Check className="w-3 h-3" strokeWidth={3} />
          </span>
        )}
        <span className={twMerge(
          "transition-all duration-300",
          selected && "font-semibold"
        )}>
          {children}
        </span>
      </span>

      {/* Hover sparkle indicator */}
      {isHovered && !selected && !disabled && (
        <Sparkles className="absolute right-2 w-3 h-3 text-primary/50 animate-pulse" />
      )}
    </button>
  );
}
