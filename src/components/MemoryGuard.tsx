'use client';

import { useEffect, useState } from 'react';

// Chrome exposes performance.memory (non-standard but widely used)
interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

declare global {
  interface Performance {
    memory?: MemoryInfo;
  }
}

const WARN_THRESHOLD = 0.75; // warn at 75% heap used
const CHECK_INTERVAL = 10_000; // every 10 seconds

export default function MemoryGuard() {
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    if (typeof performance === 'undefined' || !performance.memory) return;

    const check = () => {
      const mem = performance.memory!;
      const ratio = mem.usedJSHeapSize / mem.jsHeapSizeLimit;
      setWarning(ratio > WARN_THRESHOLD);
    };

    check();
    const id = setInterval(check, CHECK_INTERVAL);
    return () => clearInterval(id);
  }, []);

  if (!warning) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 bg-destructive text-destructive-foreground text-xs font-bold uppercase tracking-wide shadow-xl">
      <span>⚠</span>
      <span>Memoria alta — borra el historial para evitar cuelgues</span>
      <button
        onClick={() => setWarning(false)}
        className="ml-2 opacity-70 hover:opacity-100"
        aria-label="Cerrar aviso"
      >
        ✕
      </button>
    </div>
  );
}
