import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-search-finalo',
  imports: [CommonModule],
  templateUrl: './search-finalo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './search-finalo.css',
})
export class SearchFinalo implements OnInit {
  private http = inject(HttpClient);

  search = signal('');
  test = 'hola';

  resultados$ = toSignal(
    toObservable(this.search).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((val) => this.http.get<any>(`http://localhost:3000/country/?name_like=${val}`)),
    ),
  );

  ngOnInit(): void {
    setTimeout(() => {
      this.test = 'Jane'; // ❌ nothing triggers change detection
    }, 100);
  }

  changeTest() {
    this.test = 'adios';
  }
}
