import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// src/app/core/services/auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(credentials: any): Observable<any> {
    // Simulating a POST to our mock / Simulando un POST al nostro mock
    return this.http.get<any>('http://localhost:3000/auth', credentials);
  }
}
