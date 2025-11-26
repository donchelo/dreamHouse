import React from 'react';
import { Home } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-center py-8">
      <div className="flex items-center gap-2 text-primary">
        <Home className="w-8 h-8" />
        <h1 className="text-3xl font-light tracking-widest uppercase">DreamHouse</h1>
      </div>
    </header>
  );
}

