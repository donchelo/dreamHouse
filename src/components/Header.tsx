'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon, Key, CheckCircle, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from './ThemeProvider';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [apiKey, setApiKey] = useState('');
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const pathname = usePathname();

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('GEMINI_API_KEY');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  // Save API key to localStorage when it changes
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value;
    setApiKey(newKey);
    localStorage.setItem('GEMINI_API_KEY', newKey);
  };

  // Detect scroll for header background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    if (pathname === '/') {
      const element = document.getElementById(id.toLowerCase());
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={clsx(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled 
        ? "bg-background border-b border-border" 
        : "bg-transparent"
    )}>
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/"
          className="flex items-center gap-3 group cursor-pointer text-left"
        >
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tighter uppercase">
              DreamHouse
            </h1>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium border-t border-foreground/20 pt-1 mt-1 inline-block w-full text-center group-hover:border-primary transition-colors">
              Architecture
            </span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {['Vision', 'Process'].map((item) => (
              <li key={item}>
                <Link 
                  href={`/#${item.toLowerCase()}`}
                  onClick={(e) => {
                    if (pathname === '/') {
                      e.preventDefault();
                      handleNavClick(item.toLowerCase());
                    }
                  }}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                href="/studio"
                className={clsx(
                  "text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors",
                  pathname === '/studio' && "text-primary"
                )}
              >
                Studio
              </Link>
            </li>
          </ul>
          
          <div className="h-6 w-px bg-border mx-2" />

          {/* API Key Input */}
          <div className="flex items-center gap-2 bg-card border border-border px-3 py-1.5 focus-within:ring-1 focus-within:ring-primary/30 transition-all">
            <div className="flex items-center gap-1.5 mr-2">
              {apiKey ? (
                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              )}
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                {apiKey ? 'API Active' : 'API Required'}
              </span>
            </div>
            <div className="relative flex items-center">
              <Key className="absolute left-0 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                type={isKeyVisible ? "text" : "password"}
                value={apiKey}
                onChange={handleApiKeyChange}
                placeholder="Gemini API Key..."
                className="bg-transparent border-none text-xs font-mono pl-5 pr-2 focus:ring-0 w-32 md:w-48 placeholder:text-muted-foreground/50"
              />
              <button 
                onClick={() => setIsKeyVisible(!isKeyVisible)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                title={isKeyVisible ? "Hide key" : "Show key"}
              >
                <span className="text-[10px] font-bold uppercase px-1">{isKeyVisible ? 'Hide' : 'Show'}</span>
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* CTA Button */}
          <Link href="/studio">
            <button className="relative bg-primary text-primary-foreground px-6 py-2 text-sm font-bold uppercase tracking-wider border border-transparent hover:bg-foreground hover:text-background transition-colors">
              Start Project
            </button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 lg:hidden">
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
        "lg:hidden fixed inset-0 top-20 bg-background z-40 transition-transform duration-300 ease-in-out border-t border-border",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col p-8 gap-10">
          <ul className="flex flex-col gap-6">
            {['Vision', 'Process'].map((item) => (
              <li key={item}>
                <Link 
                  href={`/#${item.toLowerCase()}`}
                  onClick={(e) => {
                    if (pathname === '/') {
                      e.preventDefault();
                      handleNavClick(item.toLowerCase());
                    } else {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="text-2xl font-black uppercase tracking-tighter hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                href="/studio"
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  "text-2xl font-black uppercase tracking-tighter hover:text-primary transition-colors",
                  pathname === '/studio' && "text-primary"
                )}
              >
                Studio
              </Link>
            </li>
          </ul>

          <div className="w-full h-px bg-border" />

          {/* Mobile API Key Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Gemini API Key
            </label>
            <div className="flex items-center gap-2 bg-card border border-border p-3">
              <Key className="w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                value={apiKey}
                onChange={handleApiKeyChange}
                placeholder="Enter your key..."
                className="bg-transparent border-none text-sm font-mono focus:ring-0 flex-1"
              />
            </div>
            <p className="text-[10px] text-muted-foreground italic">
              Key is stored locally in your browser.
            </p>
          </div>
          
          <div className="pt-8 mt-4 border-t border-border">
            <Link href="/studio" onClick={() => setIsMobileMenuOpen(false)}>
              <button 
                className="w-full bg-primary text-primary-foreground px-6 py-4 text-lg font-bold uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
              >
                Start Project
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
