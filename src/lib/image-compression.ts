/**
 * Utility to compress images on the client side using the Canvas API.
 * This ensures images stay under the 4.5MB limit of Vercel while maintaining 
 * high enough quality for AI generation.
 */

interface CompressionOptions {
  maxWidthOrHeight?: number;
  quality?: number;
  outputFormat?: 'image/jpeg' | 'image/webp';
}

/**
 * Compresses an image file by resizing it and reducing quality.
 * Returns a new File object with 'image/jpeg' format by default.
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = { maxWidthOrHeight: 2048, quality: 0.85, outputFormat: 'image/jpeg' }
): Promise<File> {
  // If the file is not an image, return it as is
  if (!file.type.startsWith('image/')) {
    return file;
  }

  // If the file is already small (e.g., < 500KB), we might not need to compress it,
  // but converting everything to a standard JPEG is safer for the API.
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        const maxSide = options.maxWidthOrHeight || 2048;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > maxSide || height > maxSide) {
          if (width > height) {
            height = Math.round((height / width) * maxSide);
            width = maxSide;
          } else {
            width = Math.round((width / height) * maxSide);
            height = maxSide;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Draw and resize
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob with specified quality
        const format = options.outputFormat || 'image/jpeg';
        const quality = options.quality || 0.85;

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image: Canvas to Blob conversion failed.'));
              return;
            }
            
            // Create a new File from the Blob
            // Change extension to .jpg if we converted to jpeg
            const originalName = file.name;
            const nameWithoutExtension = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
            const newName = `${nameWithoutExtension}.jpg`;
            
            const compressedFile = new File([blob], newName, {
              type: format,
              lastModified: Date.now(),
            });
            
            console.log(`[Compression] ${originalName} (${(file.size / 1024 / 1024).toFixed(2)}MB) -> ${newName} (${(compressedFile.size / 1024 / 1024).toFixed(2)}MB)`);
            resolve(compressedFile);
          },
          format,
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image for compression.'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file for compression.'));
    };
  });
}
