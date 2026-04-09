'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import ImageLightbox from '@/components/ImageLightbox';

export interface LightboxImage {
  url: string;
  type?: string;
}

interface LightboxContextType {
  openLightbox: (images: LightboxImage[] | string[], index?: number) => void;
  closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<LightboxImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((newImages: LightboxImage[] | string[], index: number = 0) => {
    const formattedImages: LightboxImage[] = newImages.map(img => 
      typeof img === 'string' ? { url: img } : img
    );
    setImages(formattedImages);
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}
      {isOpen && images.length > 0 && (
        <ImageLightbox
          images={images}
          currentIndex={currentIndex}
          onIndexChange={setCurrentIndex}
          onClose={closeLightbox}
        />
      )}
    </LightboxContext.Provider>
  );
}
