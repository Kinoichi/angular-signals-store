import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-search-observable-dos',
  imports: [CommonModule],
  templateUrl: './search-observable-dos.component.html',
  styleUrl: './search-observable-dos.component.css',
})
export class SearchObservableDos implements OnInit {
  private http = inject(HttpClient);
  searchSubject = new BehaviorSubject('');
  resultados$ = new Observable<any>();

  ngOnInit() {
    this.resultados$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((val) =>
        this.http.get(`http://localhost:3000/country/?name_like=${val}`).pipe(
          catchError((error) => {
            return of([]);
          }),
        ),
      ),
    );
  }

  onInputChange(val: string) {
    console.log(val);
    this.searchSubject.next(val);
  }
}
