// Image validation utilities for client-side validation
// These limits match the server-side validation in route.ts

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB per image
export const MAX_TOTAL_PAYLOAD_SIZE = 4 * 1024 * 1024; // 4MB total
export const MAX_REFERENCE_IMAGES = 5;

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates an image file size and type
 */
export function validateImageFile(file: File, fieldName: string = 'Image', skipSizeLimit: boolean = false): ValidationResult {
  if (!file.type.startsWith('image/')) {
    return {
      valid: false,
      error: `${fieldName} debe ser una imagen. Tipo recibido: ${file.type}`
    };
  }

  if (!skipSizeLimit && file.size > MAX_IMAGE_SIZE) {
    return {
      valid: false,
      error: `${fieldName} excede el tamaño máximo de ${MAX_IMAGE_SIZE / 1024 / 1024}MB. Tamaño actual: ${(file.size / 1024 / 1024).toFixed(2)}MB`
    };
  }

  return { valid: true };
}

/**
 * Validates multiple image files
 */
export function validateImageFiles(files: File[], fieldName: string = 'Images'): ValidationResult {
  if (files.length > MAX_REFERENCE_IMAGES) {
    return {
      valid: false,
      error: `Máximo ${MAX_REFERENCE_IMAGES} imágenes permitidas. Recibidas: ${files.length}`
    };
  }

  for (const file of files) {
    const validation = validateImageFile(file, fieldName);
    if (!validation.valid) {
      return validation;
    }
  }

  return { valid: true };
}

/**
 * Formats file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

