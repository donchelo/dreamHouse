'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { ArrowRight, Layout, Image as ImageIcon, Sparkles, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Hero images for slideshow
const HERO_IMAGES = [
  "/images/dreamhouse-render.png",
  "/images/dreamhouse-render (1).png"
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      
      {/* Hero Section - Full Width */}
      <section id="hero" className="relative h-[90svh] w-full overflow-hidden flex items-center justify-center bg-black">
         {/* Full Background Image */}
         <div className="absolute inset-0 z-0">
             {HERO_IMAGES.map((src, index) => (
               <Image
                 key={src}
                 src={src}
                 alt={`Architectural Exterior ${index + 1}`}
                 fill
                 className={`object-cover object-center transition-opacity duration-1000 ${
                   index === currentImageIndex ? 'opacity-40' : 'opacity-0'
                 }`}
                 priority={index === 0}
               />
             ))}
             {/* Blueprint Overlay for Hero */}
             <div className="absolute inset-0 bg-blueprint opacity-20 z-10" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-20" />
         </div>

         {/* Content Overlay */}
         <div className="relative z-30 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-4xl space-y-8 animate-slide-up">
                <div className="flex items-center gap-4 mb-2">
                   <div className="h-[2px] w-12 bg-primary animate-draw-line" />
                   <span className="text-primary text-xs font-mono uppercase tracking-[0.3em] font-bold">
                     Next-Gen Architectural AI
                   </span>
                </div>
                
                <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase text-white leading-[0.8] mb-8">
                   Dream<br />
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">House</span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed border-l-2 border-primary/30 pl-6">
                      Democratizando la visualización arquitectónica. Genera exteriores fotorrealistas de alta calidad a partir de conceptos básicos en segundos.
                    </p>
                    
                    <div className="flex flex-col gap-6">
                        <Link href="/studio">
                          <Button 
                             size="lg"
                             className="w-full md:w-fit bg-primary text-primary-foreground hover:bg-white hover:text-black font-black uppercase tracking-widest py-8 px-12 text-lg group"
                          >
                             Iniciar Proyecto
                             <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                          </Button>
                        </Link>
                        <div className="flex gap-8 items-center text-white/40 font-mono text-[10px] uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Zap className="w-3 h-3 text-primary" /> Instant Exterior</span>
                            <span className="flex items-center gap-2"><Globe className="w-3 h-3 text-primary" /> 4K Quality</span>
                        </div>
                    </div>
                </div>
            </div>
         </div>
         
         {/* Floating technical details */}
         <div className="absolute bottom-12 right-12 z-30 hidden lg:block animate-fade-in stagger-3">
            <div className="border border-white/20 p-4 bg-black/40 backdrop-blur-md">
                <p className="text-[10px] font-mono text-primary uppercase mb-1">System Status</p>
                <p className="text-xs text-white font-bold uppercase">Engine: Nano Banana Pro v1.1</p>
                <div className="w-32 h-1 bg-white/10 mt-2">
                    <div className="w-3/4 h-full bg-primary" />
                </div>
            </div>
         </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-32 bg-background relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
                <div className="space-y-4">
                    <h2 className="text-sm font-mono text-primary uppercase tracking-[0.4em] font-bold">01. Nuestra Visión</h2>
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                        El Futuro de la <span className="text-outline">Arquitectura</span> es Instantáneo.
                    </h3>
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Diseñar una casa requiere conocimientos técnicos y recursos costosos. DreamHouse democratiza este proceso permitiendo a cualquier persona visualizar conceptos arquitectónicos de alta calidad instantáneamente.
                </p>
                <div className="grid grid-cols-2 gap-8 border-t border-border pt-12">
                    <div className="space-y-2">
                        <p className="text-3xl font-black text-primary uppercase">85%</p>
                        <p className="text-xs uppercase font-bold tracking-widest opacity-60">Reducción en tiempo de generación</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-3xl font-black text-primary uppercase">100%</p>
                        <p className="text-xs uppercase font-bold tracking-widest opacity-60">Fotorrealismo Garantizado</p>
                    </div>
                </div>
            </div>
            <div className="relative aspect-square bg-muted group overflow-hidden">
                <Image 
                    src="/images/dreamhouse-render.png" 
                    alt="Vision" 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 bg-foreground text-background relative">
        <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="space-y-4">
                    <h2 className="text-sm font-mono text-primary uppercase tracking-[0.4em] font-bold">02. El Proceso</h2>
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Tres Pasos al <span className="text-primary">Exterior Perfecto</span>.</h3>
                </div>
                <p className="max-w-md text-background/60 text-sm uppercase tracking-widest font-medium">
                    Una interfaz única. Sin complicaciones. Todo lo que necesitas en un solo viewport.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border-arch bg-border">
                {[
                    { 
                        step: "01", 
                        title: "Referencias", 
                        desc: "Sube hasta 5 imágenes que capturen tu estilo, materiales o ambiente deseado.",
                        icon: <ImageIcon className="w-8 h-8" />
                    },
                    { 
                        step: "02", 
                        title: "Parámetros", 
                        desc: "Configura clima, ciudad, arquitectos y materiales con un control granular.",
                        icon: <Layout className="w-8 h-8" />
                    },
                    { 
                        step: "03", 
                        title: "Generación", 
                        desc: "Nuestra IA analiza tus datos y crea un exterior fotorrealista en 4K en segundos.",
                        icon: <Sparkles className="w-8 h-8" />
                    }
                ].map((item, i) => (
                    <div key={i} className="bg-foreground p-12 space-y-8 hover:bg-neutral-900 transition-colors group">
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-mono text-primary font-bold">{item.step}</span>
                            <div className="text-primary group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-2xl font-black uppercase tracking-tight">{item.title}</h4>
                            <p className="text-background/60 leading-relaxed font-light">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border py-20 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <h2 className="text-4xl font-bold uppercase tracking-tighter mb-6">DreamHouse AI</h2>
            <div className="flex gap-8 text-sm font-medium uppercase tracking-wide opacity-80">
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          <div className="text-right">
            <p className="text-primary font-bold mb-2">Architecture Studio</p>
            <p className="text-sm opacity-50 font-mono">© 2025 DreamHouse Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
