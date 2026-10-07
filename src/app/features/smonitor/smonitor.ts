import { Component, inject, resource, signal } from '@angular/core';
import { SmonitorService } from './smonitor.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { sign } from 'crypto';
import { SmonitorStore } from './smonitor.store';

@Component({
  selector: 'app-smonitor',
  imports: [],
  providers: [SmonitorService, SmonitorStore],
  templateUrl: './smonitor.html',
  styleUrl: './smonitor.css',
})
export class Smonitor {
  readonly smonitorStore = inject(SmonitorStore);
  readonly smonitorService = inject(SmonitorService);

  getNewOrders() {
    this.smonitorService.simulateBurst();
  }
}
