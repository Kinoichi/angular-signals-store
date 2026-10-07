import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class LocalStorageService {
  private storageMap = new Map<string, string>();
  private localStorageSubject = new BehaviorSubject<Map<string, string>>(new Map());
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key!);

        if (key) this.storageMap.set(key, value!);
      }
      this.refresh();
    }
  }

  add(key: string, value: string) {
    localStorage.setItem(key, value);
    this.storageMap.set(key, value);
    this.refresh();
  }

  update(key: string, value: string) {
    if (localStorage.getItem(key) !== null) {
      this.add(key, value);
    }
  }

  list(): Observable<Map<string, string>> {
    return this.localStorageSubject.asObservable();
  }

  private refresh() {
    this.localStorageSubject.next(this.storageMap);
  }
}
