import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, filter } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

@Component({
  selector: 'app-search-api',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-api.html',
  styleUrl: './search-api.css',
})
export class SearchApi implements OnInit {
  API_URL = 'https://jsonplaceholder.typicode.com/users';
  http = inject(HttpClient);

  search = signal('');
  debounceSearch = toSignal(toObservable(this.search).pipe(debounceTime(300)), {
    initialValue: '',
  });
  users = signal<User[]>([]);

  constructor() {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http.get<User[]>(this.API_URL).subscribe((data) => {
      this.users.set(data);
    });
  }

  filteredUsers = computed(() => {
    if (this.debounceSearch().length < 3) return this.users();

    return this.users().filter((user) => user.name.includes(this.debounceSearch()));
  });
}
