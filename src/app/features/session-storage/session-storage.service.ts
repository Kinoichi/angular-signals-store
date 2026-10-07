import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Signal, signal } from '@angular/core';

@Injectable()
export class SessionStorageService {
  private mapStorage = new Map<string, string>();
  private sessionStorageSignal = signal(new Map());
  private platformId = inject(PLATFORM_ID);

  constructor() {
    this.getSessionStorage();
  }

  add(key: string, value: string) {
    sessionStorage.setItem(key, value);
    this.mapStorage.set(key, value);

    this.refresh();
  }

  update(key: string, value: string) {
    const exist = this.mapStorage.has(key);
    if (exist) this.add(key, value);
  }

  remove() {}

  list(): Signal<Map<string, string>> {
    return this.sessionStorageSignal.asReadonly();
  }

  private getSessionStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const storage = sessionStorage;

      for (let x = 0; x < storage.length; x++) {
        const key = storage.key(x);
        const value = storage.getItem(key!);

        if (key) this.mapStorage.set(key, value!);
      }
      this.refresh();
    }
  }

  refresh() {
    this.sessionStorageSignal.set(this.mapStorage);
  }
}
