import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, Subject, BehaviorSubject, of, concatMap, timer, map } from 'rxjs';

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
export class MonitorService {
  private orderSubject = new Subject<Order>();

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
