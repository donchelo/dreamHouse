import { useState, useEffect, useCallback } from 'react';
import { db, GenerationRecord } from '../db';
import { createThumbnail } from '../image-thumbnail';

export function useHistory() {
  const [history, setHistory] = useState<GenerationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await db.getAllGenerations();
      setHistory(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch history'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const saveToHistory = async (record: Omit<GenerationRecord, 'id' | 'timestamp'>) => {
    try {
      // La grilla del historial usa un thumbnail de 320px (ligero, evita memory crashes
      // al listar). El render full-res se persiste aparte como Blob para el lightbox y la descarga.
      const thumbnailUrl = await createThumbnail(record.imageUrl, 320, 0.6);
      let fullImage: Blob | undefined;
      try {
        fullImage = await (await fetch(record.imageUrl)).blob();
      } catch (e) {
        console.warn('No se pudo convertir el render a Blob; se guardará solo el thumbnail.', e);
      }
      await db.saveGeneration({ ...record, imageUrl: thumbnailUrl }, fullImage);
      await refreshHistory();
    } catch (err) {
      console.error('Failed to save to history:', err);
      throw err;
    }
  };

  /** Devuelve un object URL del render full-res (on-demand), o null si no existe (registros antiguos). */
  const getFullImageUrl = async (id: string): Promise<string | null> => {
    try {
      const blob = await db.getFullImage(id);
      return blob ? URL.createObjectURL(blob) : null;
    } catch (err) {
      console.error('Failed to load full image:', err);
      return null;
    }
  };

  const deleteFromHistory = async (id: string) => {
    try {
      await db.deleteGeneration(id);
      await refreshHistory();
    } catch (err) {
      console.error('Failed to delete from history:', err);
      throw err;
    }
  };

  const clearHistory = async () => {
    try {
      await db.clearAll();
      await refreshHistory();
    } catch (err) {
      console.error('Failed to clear history:', err);
      throw err;
    }
  };

  return {
    history,
    isLoading,
    error,
    saveToHistory,
    deleteFromHistory,
    clearHistory,
    refreshHistory,
    getFullImageUrl
  };
}
