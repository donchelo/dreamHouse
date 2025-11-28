import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'gradient';
}

export function Card({ className, variant = 'default', children, ...props }: CardProps) {
  const variants = {
    default: 'bg-card border border-border shadow-sm',
    elevated: 'bg-card-elevated border border-border shadow-md',
    glass: 'glass shadow-lg',
    gradient: 'relative bg-card border border-transparent', // Handled via utility or before element
  };

  const content = (
    <div
      className={twMerge(
        'rounded-2xl overflow-hidden',
        variants[variant],
        variant === 'gradient' ? 'p-[1px] bg-gradient-to-br from-border via-border to-primary/20' : '',
        className
      )}
      {...props}
    >
      {variant === 'gradient' ? (
        <div className="bg-card rounded-[inherit] h-full w-full overflow-hidden">
             {children}
        </div>
      ) : (
        children
      )}
    </div>
  );

  return content;
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge('px-6 py-5 border-b border-border/50', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge('p-6', className)} {...props}>
      {children}
    </div>
  );
}
