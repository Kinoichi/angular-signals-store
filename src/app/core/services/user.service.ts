import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getUserById(id: string) {
    return this.http.get<User>(`http://localhost:3000/users/${id}`);
  }
}
