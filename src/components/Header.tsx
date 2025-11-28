'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

// Custom DreamHouse Logo - Animated architectural house
function DreamHouseLogo({ className = "w-6 h-6", isHovered = false }: { className?: string; isHovered?: boolean }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      className={clsx(className, "transition-transform duration-500", isHovered && "scale-110")}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Casa principal - forma moderna con relleno animado */}
      <path 
        d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10.5Z" 
        fill="currentColor" 
        fillOpacity={isHovered ? "0.3" : "0.15"}
        className="transition-all duration-300"
      />
      {/* Techo con línea distintiva */}
      <path 
        d="M2 11L12 2L22 11" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={clsx("transition-all duration-300", isHovered && "stroke-[2.5]")}
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
        className={clsx("transition-all duration-300", isHovered && "fill-current fill-opacity-20")}
      />
      {/* División de ventana */}
      <line 
        x1="12" 
        y1="12" 
        x2="12" 
        y2="17" 
        stroke="currentColor" 
        strokeWidth="1.5"
      />
      {/* Chimenea con humo animado */}
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
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for header background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={clsx(
      "sticky top-0 z-50 w-full transition-all duration-500",
      scrolled 
        ? "glass-glow border-b border-border/50" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 group cursor-default"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <div className="relative">
            {/* Outer glow ring */}
            <div className={clsx(
              "absolute -inset-2 rounded-2xl transition-all duration-500",
              isLogoHovered 
                ? "bg-gradient-to-br from-primary/30 to-secondary/20 blur-xl opacity-100" 
                : "opacity-0"
            )} />
            
            {/* Logo container */}
            <div className={clsx(
              "relative p-2.5 rounded-xl transition-all duration-300",
              "bg-gradient-to-br from-primary to-primary-dark text-primary-foreground",
              isLogoHovered && "shadow-lg shadow-primary/40"
            )}>
              <DreamHouseLogo className="w-5 h-5" isHovered={isLogoHovered} />
            </div>
          </div>
          
          <div className="flex flex-col">
            <h1 className={clsx(
              "text-lg font-bold tracking-tight leading-none transition-all duration-300",
              isLogoHovered ? "text-gradient-primary" : "text-foreground"
            )}>
              DreamHouse
            </h1>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium pt-0.5 flex items-center gap-1">
              <Sparkles className={clsx(
                "w-2.5 h-2.5 transition-all duration-300",
                isLogoHovered ? "text-primary animate-pulse" : "text-muted"
              )} />
              AI Architect
            </span>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-2">
          <NavLink href="#">Galería</NavLink>
          <NavLink href="#">Proyectos</NavLink>
          <NavLink href="#" highlight>Precios</NavLink>
          
          {/* CTA Button */}
          <button className="relative ml-4 overflow-hidden bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-100 group">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Nuevo Proyecto</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={clsx(
            "sm:hidden p-2.5 rounded-xl transition-all duration-300",
            isMobileMenuOpen 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground hover:bg-card-elevated"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={clsx(
        "sm:hidden absolute top-full left-0 right-0 transition-all duration-500 overflow-hidden",
        isMobileMenuOpen 
          ? "max-h-80 opacity-100" 
          : "max-h-0 opacity-0"
      )}>
        <div className="glass border-b border-border">
          <nav className="flex flex-col p-4 gap-2">
            <MobileNavLink href="#" onClick={() => setIsMobileMenuOpen(false)}>
              Galería
            </MobileNavLink>
            <MobileNavLink href="#" onClick={() => setIsMobileMenuOpen(false)}>
              Proyectos
            </MobileNavLink>
            <MobileNavLink href="#" onClick={() => setIsMobileMenuOpen(false)}>
              Precios
            </MobileNavLink>
            
            <div className="pt-2 mt-2 border-t border-border">
              <button 
                className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-5 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nuevo Proyecto
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

// Desktop Nav Link Component
function NavLink({ href, children, highlight = false }: { href: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <a 
      href={href} 
      className={clsx(
        "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group cursor-pointer",
        highlight 
          ? "text-primary hover:bg-primary/10" 
          : "text-muted-foreground hover:text-foreground hover:bg-card-elevated"
      )}
    >
      {children}
      {/* Underline effect */}
      <span className={clsx(
        "absolute bottom-1 left-4 right-4 h-0.5 rounded-full transition-all duration-300 scale-x-0 group-hover:scale-x-100",
        highlight ? "bg-primary" : "bg-foreground/50"
      )} />
    </a>
  );
}

// Mobile Nav Link Component
function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <a 
      href={href} 
      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card-elevated rounded-xl transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
      {children}
    </a>
  );
}
