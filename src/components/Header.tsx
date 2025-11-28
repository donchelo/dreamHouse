'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from './ThemeProvider';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled 
        ? "bg-background border-b border-border" 
        : "bg-transparent"
    )}>
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-default">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tighter uppercase">
              DreamHouse
            </h1>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium border-t border-foreground/20 pt-1 mt-1 inline-block w-full text-center">
              Architecture
            </span>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-8">
          <NavLink href="#">Gallery</NavLink>
          <NavLink href="#">Projects</NavLink>
          <NavLink href="#">Pricing</NavLink>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* CTA Button */}
          <button className="relative bg-primary text-primary-foreground px-6 py-2 text-sm font-bold uppercase tracking-wider border border-transparent hover:bg-foreground hover:text-background transition-colors">
            Start Project
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 sm:hidden">
           <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          
          <button 
            className="p-2 hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={clsx(
        "sm:hidden fixed inset-0 top-20 bg-background z-40 transition-transform duration-300 ease-in-out border-t border-border",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col p-8 gap-6">
          <MobileNavLink href="#" onClick={() => setIsMobileMenuOpen(false)}>
            Gallery
          </MobileNavLink>
          <MobileNavLink href="#" onClick={() => setIsMobileMenuOpen(false)}>
            Projects
          </MobileNavLink>
          <MobileNavLink href="#" onClick={() => setIsMobileMenuOpen(false)}>
            Pricing
          </MobileNavLink>
          
          <div className="pt-8 mt-4 border-t border-border">
            <button 
              className="w-full bg-primary text-primary-foreground px-6 py-4 text-lg font-bold uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start Project
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

// Desktop Nav Link Component
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="text-sm font-medium uppercase tracking-wide hover:text-primary transition-colors"
    >
      {children}
    </a>
  );
}

// Mobile Nav Link Component
function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <a 
      href={href} 
      className="text-2xl font-bold uppercase tracking-tight hover:text-primary transition-colors"
      onClick={onClick}
    >
      {children}
    </a>
  );
}
