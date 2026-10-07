import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit, resource, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-search-signal',
  imports: [CommonModule],
  templateUrl: './search-signal.html',
  styleUrl: './search-signal.css',
})
export class SearchSignal {
  private http = inject(HttpClient);
  search = signal('');
  countries = toSignal(this.searchCountries(), { initialValue: [] });
  isLoading = signal(false);

  private searchCountries() {
    return toObservable(this.search).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.isLoading.set(true)),
      switchMap((val) =>
        this.http.get<any[]>(`http://localhost:3000/country/?name_like=${val}`).pipe(
          tap(() => this.isLoading.set(false)),
          catchError((error) => {
            this.isLoading.set(false);
            return of([]);
          }),
        ),
      ),
    );
  }

  /* debouncedSearch = toSignal(
    toObservable(this.search).pipe(debounceTime(300), distinctUntilChanged()),
    { initialValue: '' },
  );

  countriesResource = resource({
    request: () => ({ query: this.debouncedSearch() }),
    loader: async ({ request, abortSignal }) => {
      if (!request.query) return [];

      const response = await fetch(`http://localhost:3000/country/?name_like=${request.query}`, {
        signal: abortSignal,
      });

      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
  });

  reload() {
    this.countriesResource.reload();
  } */
}
