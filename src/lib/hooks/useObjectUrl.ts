import { useState, useEffect } from 'react';

/**
 * Creates a stable blob URL for a single File and revokes it on cleanup.
 * Prevents memory leaks from calling URL.createObjectURL() in render.
 */
export function useObjectUrl(file: File | null): string | null {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return url;
}

/**
 * Creates stable blob URLs for an array of Files and revokes them on cleanup.
 * Prevents memory leaks from calling URL.createObjectURL() in render.
 */
export function useObjectUrls(files: File[]): string[] {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const objectUrls = files.map(f => URL.createObjectURL(f));
    setUrls(objectUrls);
    return () => {
      objectUrls.forEach(u => URL.revokeObjectURL(u));
    };
  }, [files]);

  return urls;
}
