/**
 * Creates a small thumbnail from a base64 data URL.
 * Used before storing images in IndexedDB to prevent memory crashes.
 */
export async function createThumbnail(
  dataUrl: string,
  maxWidth = 320,
  quality = 0.6
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height, 1);
      const w = Math.round(img.width * ratio);
      const h = Math.round(img.height * ratio);

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(dataUrl); return; }

      ctx.drawImage(img, 0, 0, w, h);
      const thumb = canvas.toDataURL('image/jpeg', quality);
      resolve(thumb);
    };
    img.onerror = () => resolve(dataUrl); // fallback: store original
    img.src = dataUrl;
  });
}
