import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'gradient';
}

export function Card({ className, variant = 'default', children, ...props }: CardProps) {
  // Simplified variants for Architectural Theme
  const baseStyles = 'bg-card border border-border rounded-none';
  
  return (
    <div
      className={twMerge(
        baseStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge('px-6 py-5 border-b border-border', className)} {...props}>
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
