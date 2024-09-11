import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly dbName = 'CreditCardAppDB';
  private readonly dbVersion = 1;

  constructor() {}

  private async openDB(): Promise<IDBPDatabase> {
    return openDB(this.dbName, this.dbVersion, {
      upgrade(db) {
        // Create an object store for credit cards
        db.createObjectStore('creditCards', { keyPath: 'id' });
      },
    });
  }

  async storeDataInIndexedDB(storeName: string, id: number, data: any): Promise<void> {
    const db = await this.openDB();
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    store.put({ id, data });
    await tx.done;
  }

  async getDataFromIndexedDB(storeName: string, id: number): Promise<any> {
    const db = await this.openDB();
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    return await store.get(id);
  }

  async storeAllCreditCards(cards: any[]): Promise<void> {
    const db = await this.openDB();
    const tx = db.transaction('creditCards', 'readwrite');
    const store = tx.objectStore('creditCards');
    cards.forEach((card) => store.put(card));
    await tx.done;
  }

  async getAllCreditCards(): Promise<any[]> {
    const db = await this.openDB();
    const tx = db.transaction('creditCards', 'readonly');
    const store = tx.objectStore('creditCards');
    return await store.getAll();
  }

  async updateCreditCard(id: number, updatedData: any): Promise<void> {
    const db = await this.openDB();
    const tx = db.transaction('creditCards', 'readwrite');
    const store = tx.objectStore('creditCards');
    const existingCard = await store.get(id);
    if (existingCard) {
      store.put({ ...existingCard, ...updatedData });
      await tx.done;
    } else {
      throw new Error(`Card with id ${id} does not exist.`);
    }
  }

  async deleteCreditCard(id: number): Promise<void> {
    const db = await this.openDB();
    const tx = db.transaction('creditCards', 'readwrite');
    const store = tx.objectStore('creditCards');
    store.delete(id);
    await tx.done;
  }

  async addCard(card: any): Promise<void> {
    const db = await this.openDB();
    const tx = db.transaction('creditCards', 'readwrite');
    const store = tx.objectStore('creditCards');
    const records = await store.getAll();
    if (records.length === 0) {
      store.put(card);
      await tx.done;
    } else {
      console.log('Database is not empty. No card added.');
    }
  }
}
