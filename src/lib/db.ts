import { DreamHouseParams, GenerationMode } from '../types';

export interface GenerationRecord {
  id: string;
  timestamp: number;
  mode: GenerationMode;
  params: DreamHouseParams;
  imageUrl: string; // thumbnail (320px JPEG) — usado solo para la grilla del historial
  prompt?: string;
  houseName?: string;
  hasFullImage?: boolean; // true si existe el render full-res en el store `fullImages`
}

const DB_NAME = 'DreamHouseDB';
const DB_VERSION = 2;
const STORE_NAME = 'generations';
const IMAGES_STORE = 'fullImages'; // blobs full-res, keyed por el id de la generación
const MAX_HISTORY = 20;

export class DreamHouseDB {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    if (this.db) return;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('mode', 'mode', { unique: false });
        }
        // v2: store separado para los renders full-res (out-of-line keys = id de la generación).
        // Va aparte para que getAllGenerations() NO materialice 20 imágenes full-res en memoria.
        if (!db.objectStoreNames.contains(IMAGES_STORE)) {
          db.createObjectStore(IMAGES_STORE);
        }
      };
    });
  }

  async saveGeneration(
    record: Omit<GenerationRecord, 'id' | 'timestamp'>,
    fullImage?: Blob
  ): Promise<string> {
    await this.init();
    const id = crypto.randomUUID();
    const timestamp = Date.now();
    const fullRecord: GenerationRecord = { ...record, id, timestamp, hasFullImage: !!fullImage };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME, IMAGES_STORE], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const imagesStore = transaction.objectStore(IMAGES_STORE);

      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve(id);

      // Add the new record + its full-res blob
      store.add(fullRecord);
      if (fullImage) imagesStore.put(fullImage, id);

      // After adding, prune oldest records (and their blobs) beyond MAX_HISTORY
      const index = store.index('timestamp');
      const countRequest = index.getAll();
      countRequest.onsuccess = () => {
        const all = (countRequest.result as GenerationRecord[]).sort(
          (a, b) => a.timestamp - b.timestamp
        );
        const toDelete = all.slice(0, Math.max(0, all.length - MAX_HISTORY));
        toDelete.forEach(r => {
          store.delete(r.id);
          imagesStore.delete(r.id);
        });
      };
    });
  }

  /** Carga el render full-res (Blob) de una generación, on-demand. null si no existe (registros previos a v2). */
  async getFullImage(id: string): Promise<Blob | null> {
    await this.init();
    if (!this.db!.objectStoreNames.contains(IMAGES_STORE)) return null;
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([IMAGES_STORE], 'readonly');
      const store = transaction.objectStore(IMAGES_STORE);
      const request = store.get(id);
      request.onsuccess = () => resolve((request.result as Blob) ?? null);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllGenerations(): Promise<GenerationRecord[]> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('timestamp');
      const request = index.getAll(); // By default this might not be sorted, we'll sort manually or use a cursor if needed

      request.onsuccess = () => {
        const results = request.result as GenerationRecord[];
        // Sort descending by timestamp
        resolve(results.sort((a, b) => b.timestamp - a.timestamp));
      };
      request.onerror = () => reject(request.error);
    });
  }

  async deleteGeneration(id: string): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME, IMAGES_STORE], 'readwrite');
      transaction.objectStore(STORE_NAME).delete(id);
      transaction.objectStore(IMAGES_STORE).delete(id);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async clearAll(): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME, IMAGES_STORE], 'readwrite');
      transaction.objectStore(STORE_NAME).clear();
      transaction.objectStore(IMAGES_STORE).clear();
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }
}

export const db = new DreamHouseDB();
