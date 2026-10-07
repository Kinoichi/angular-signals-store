import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
  withHooks,
} from '@ngrx/signals';
import { SmonitorService } from './smonitor.service';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, lastValueFrom, pipe, switchMap, tap } from 'rxjs';

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

export interface SmonitorState {
  userActivity: UserActivity | null;
  selectedUserActivity: string;
  priceUpdate: PriceUpdate | null;
  priceFilter: string;
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

export const initialSmonitorState: SmonitorState = {
  userActivity: null,
  selectedUserActivity: '1',
  priceUpdate: null,
  orders: [],
  priceFilter: '',
  isLoading: false,
  error: null,
};

export const SmonitorStore = signalStore(
  withState(initialSmonitorState),
  withComputed((store) => ({
    ordersCount: computed(() => store.orders().length),
  })),
  withMethods((store, smonitorService = inject(SmonitorService)) => ({
    setSelectedUserActivity(userId: string) {
      patchState(store, { selectedUserActivity: userId });
    },
    updateFilter(newFilter: string) {
      patchState(store, { priceFilter: newFilter });
    },

    _loadUserActivity: rxMethod<string>(
      pipe(
        switchMap((userId) => smonitorService.getUserActivity(userId)),
        tap((activity) => patchState(store, { userActivity: activity })),
      ),
    ),

    _searchPriceUpdates: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((search) => smonitorService.getPriceUpdates(search)),
        tap((priceUpdate) => patchState(store, { priceUpdate })),
      ),
    ),

    _updateOrders: rxMethod<Order>(
      pipe(
        tap((order) => {
          const currentOrders = store.orders();
          patchState(store, { orders: [...currentOrders, order] });
        }),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      const smonitorService = inject(SmonitorService);
      store._searchPriceUpdates(store.priceFilter);
      store._updateOrders(smonitorService.getOrderStream());
      store._loadUserActivity(store.selectedUserActivity);
    },
  }),
);
