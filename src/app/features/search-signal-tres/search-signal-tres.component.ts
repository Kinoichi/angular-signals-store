import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-search-signal-tres',
  imports: [],
  templateUrl: './search-signal-tres.component.html',
  styleUrl: './search-signal-tres.component.css',
})
export class SearchSignalTresComponent {
  private httpClient = inject(HttpClient);
  search = signal('');
  isLoading = signal(false);

  countries = toSignal(
    toObservable(this.search).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.isLoading.set(true)),
      switchMap((val) =>
        this.httpClient.get<any[]>(`http://localhost:3000/country/?name_like=${val}`).pipe(
          tap(() => this.isLoading.set(false)),
          catchError((error) => {
            this.isLoading.set(false);
            return of([]);
          }),
        ),
      ),
    ),
    { initialValue: [] },
  );
}
