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
      // Store a small thumbnail instead of the full base64 image to prevent memory crashes
      const thumbnailUrl = await createThumbnail(record.imageUrl, 320, 0.6);
      await db.saveGeneration({ ...record, imageUrl: thumbnailUrl });
      await refreshHistory();
    } catch (err) {
      console.error('Failed to save to history:', err);
      throw err;
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
    refreshHistory
  };
}
