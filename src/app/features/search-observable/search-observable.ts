import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-search-observable',
  imports: [CommonModule],
  templateUrl: './search-observable.html',
  styleUrl: './search-observable.css',
})
export class SearchObservable implements OnInit {
  private httpClient = inject(HttpClient);
  query = new BehaviorSubject('');
  resultados$ = new Observable<any>();
  isLoading = false;

  ngOnInit(): void {
    this.resultados$ = this.query.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => (this.isLoading = true)),
      switchMap((val) =>
        this.httpClient.get(`http://localhost:3000/country/?name_like=${val}`).pipe(
          tap(() => (this.isLoading = false)),
          catchError((error) => {
            this.isLoading = false;
            return of([]);
          }),
        ),
      ),
    );
  }

  search(val: string) {
    this.query.next(val);
  }
}
