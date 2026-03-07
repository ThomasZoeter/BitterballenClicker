import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  // Set a value in local storage
  setData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Get a value from local storage
  getData(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Remove a value from local storage
  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  clearData(): void {
    localStorage.clear();
  }
}
