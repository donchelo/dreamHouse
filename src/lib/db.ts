import { DreamHouseParams, GenerationMode } from '../types';

export interface GenerationRecord {
  id: string;
  timestamp: number;
  mode: GenerationMode;
  params: DreamHouseParams;
  imageUrl: string; // base64
  prompt?: string;
  houseName?: string;
}

const DB_NAME = 'DreamHouseDB';
const DB_VERSION = 1;
const STORE_NAME = 'generations';

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
      };
    });
  }

  async saveGeneration(record: Omit<GenerationRecord, 'id' | 'timestamp'>): Promise<string> {
    await this.init();
    const id = crypto.randomUUID();
    const timestamp = Date.now();
    const fullRecord: GenerationRecord = { ...record, id, timestamp };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(fullRecord);

      request.onsuccess = () => resolve(id);
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
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clearAll(): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export const db = new DreamHouseDB();
