import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full glass mb-8">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5 group cursor-default">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5" strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight leading-none">DreamHouse</h1>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium pt-0.5">AI Architect</span>
          </div>
        </div>
        
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-primary transition-colors">Galería</a>
          <a href="#" className="hover:text-primary transition-colors">Proyectos</a>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-xs font-semibold hover:opacity-90 transition-opacity">
            Nuevo Proyecto
          </button>
        </nav>
      </div>
    </header>
  );
}
