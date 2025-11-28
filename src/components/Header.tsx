'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

// Custom DreamHouse Logo - Casa arquitectónica estilizada
function DreamHouseLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Casa principal - forma moderna */}
      <path 
        d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10.5Z" 
        fill="currentColor" 
        fillOpacity="0.15"
      />
      {/* Techo con línea distintiva */}
      <path 
        d="M2 11L12 2L22 11" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Estructura de la casa */}
      <path 
        d="M4 9.5V20H20V9.5" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Ventana moderna grande */}
      <rect 
        x="9" 
        y="12" 
        width="6" 
        height="5" 
        rx="0.5"
        stroke="currentColor" 
        strokeWidth="1.5"
      />
      {/* División de ventana - detalle arquitectónico */}
      <line 
        x1="12" 
        y1="12" 
        x2="12" 
        y2="17" 
        stroke="currentColor" 
        strokeWidth="1.5"
      />
      {/* Chimenea/elemento vertical */}
      <rect 
        x="16" 
        y="5" 
        width="2" 
        height="4" 
        fill="currentColor"
        rx="0.5"
      />
    </svg>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-default">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full group-hover:bg-primary/50 transition-all duration-500" />
            {/* Logo container */}
            <div className="relative bg-primary text-primary-foreground p-2 rounded-xl group-hover:scale-105 transition-transform duration-300">
              <DreamHouseLogo className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight leading-none text-foreground">
              DreamHouse
            </h1>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium pt-0.5">
              AI Architect
            </span>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-8">
          <a 
            href="#" 
            className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            Galería
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </a>
          <a 
            href="#" 
            className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            Proyectos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </a>
          <button className="relative overflow-hidden bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group">
            <span className="relative z-10">Nuevo Proyecto</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="sm:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-card border-b border-border animate-fade-in-up">
          <nav className="flex flex-col p-4 gap-4">
             <a 
              href="#" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Galería
            </a>
            <a 
              href="#" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Proyectos
            </a>
            <button 
              className="w-full bg-primary text-primary-foreground px-5 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-primary/25 active:scale-95 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nuevo Proyecto
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
