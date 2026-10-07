import { Component, inject, OnInit } from '@angular/core';
import { MonitorService } from './monitor.service';
import {
  BehaviorSubject,
  bufferTime,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  of,
  scan,
  switchMap,
  timer,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

@Component({
  selector: 'app-monitor',
  imports: [CommonModule],
  providers: [MonitorService],
  templateUrl: './monitor.html',
  styleUrl: './monitor.css',
})
export class Monitor {
  private monitorService = inject(MonitorService);
  userSubject = new BehaviorSubject('1');
  userActivity$ = this.userSubject.pipe(
    switchMap((val) => this.monitorService.getUserActivity(val)),
  );

  searchPriceSubject = new BehaviorSubject('');
  priceUpdate$ = this.searchPriceSubject.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((val) => this.monitorService.getPriceUpdates(val)),
    takeUntilDestroyed(),
  );

  orders$ = this.monitorService.getOrderStream().pipe(
    scan((acc, curr) => [...acc, curr], [] as Order[]),
    takeUntilDestroyed(),
  );

  highDemand$ = this.monitorService.getOrderStream().pipe(
    bufferTime(1000),
    filter((orders) => orders.length > 3),
    switchMap(() => merge(of(true), timer(3000).pipe(map(() => false)))),
    takeUntilDestroyed(),
  );

  updateUserActivity(id: string) {
    this.userSubject.next(id);
  }

  updateSearchPrice(val: string) {
    this.searchPriceSubject.next(val);
  }

  getNewOrders() {
    this.monitorService.simulateBurst();
  }
}
