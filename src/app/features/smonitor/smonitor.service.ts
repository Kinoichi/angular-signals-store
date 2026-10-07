import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, Subject, BehaviorSubject, of, concatMap, timer, map, switchMap } from 'rxjs';

interface UserActivity {
  userId: string;
  lastAction: string;
  timestamp: Date;
}

interface PriceUpdate {
  productId: string;
  price: number;
  currency: string;
}

interface Order {
  id: string;
  productId: string;
}

@Injectable()
export class SmonitorService {
  //* Stuff to simulate global state even is not a global service */
  private userActivityId = signal<string>('1');

  userActivity = toSignal(
    toObservable(this.userActivityId).pipe(switchMap((val) => this.getUserActivity(val))),
  );

  private orders = signal<Order[]>([]);
  orders$ = this.orders.asReadonly();
  private orderSubject = new Subject<Order>();

  constructor() {
    this.orderSubject.subscribe((order) => {
      this.orders.update((orders) => [...orders, order]);
    });
  }

  setUserActivityId(id: string) {
    this.userActivityId.set(id);
  }

  //** Stuff to simulate the api calls  */

  getOrderStream(): Observable<Order> {
    return this.orderSubject.asObservable();
  }
  // En algún botón o en ngOnInit disparas pedidos manualmente:
  simulateBurst() {
    of(1, 2, 3, 4)
      .pipe(concatMap((i) => timer(100).pipe(map(() => i))))
      .subscribe(() =>
        this.orderSubject.next({
          id: `order-${Math.floor(Math.random() * 1000)}`,
          productId: `product-${Math.floor(Math.random() * 100)}`,
        }),
      );
  }

  getUserActivity(userId: string): Observable<UserActivity> {
    return timer(500).pipe(
      map(() => ({
        userId,
        lastAction: ['viewed product', 'added to cart', 'checkout'][Math.floor(Math.random() * 3)],
        timestamp: new Date(),
      })),
    );
  }

  getPriceUpdates(productId: string): Observable<PriceUpdate> {
    console.log('updating prices');
    return timer(400).pipe(
      map(() => ({
        productId,
        price: Math.floor(Math.random() * 1000) + 1,
        currency: 'USD',
      })),
    );
  }
}
