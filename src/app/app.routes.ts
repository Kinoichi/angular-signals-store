import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { Login } from './features/login/login';

export const routes: Routes = [
  // Auth Routes
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', loadComponent: () => import('./features/login/login').then((m) => m.Login) },
    ],
  },
  // App Routes
  {
    path: '',
    component: MainLayoutComponent,
    /* canActivate: [authGuard], */ // Protect these routes / Proteggi queste rotte
    children: [
      {
        path: 'books',
        loadChildren: () => import('./features/books/book.routes').then((m) => m.BOOK_ROUTES),
      },
      {
        path: 'ls',
        loadComponent: () =>
          import('./features/local-storage/local-storage').then((m) => m.LocalStorage),
      },
      {
        path: 'ss',
        loadComponent: () =>
          import('./features/session-storage/session-storage').then((m) => m.SessionStorage),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./features/search-observable/search-observable').then((m) => m.SearchObservable),
      },
      {
        path: 'search-2',
        loadComponent: () =>
          import('./features/search-observable-dos/search-observable-dos.component').then(
            (m) => m.SearchObservableDos,
          ),
      },
      {
        path: 'tabs',
        loadComponent: () => import('./features/tabs/tab-view/tab-view').then((m) => m.TabView),
      },
      {
        path: 'tobs',
        loadComponent: () => import('./features/tobs/tob-view/tob-view').then((m) => m.TobView),
      },
      {
        path: 'search-api',
        loadComponent: () => import('./features/search-api/search-api').then((m) => m.SearchApi),
      },
      {
        path: 'search-signal',
        loadComponent: () =>
          import('./features/search-signal/search-signal').then((m) => m.SearchSignal),
      },
      {
        path: 'search-signal-2',
        loadComponent: () =>
          import('./features/search-signal-dos/search-signal-dos.component').then(
            (m) => m.SearchSignalDosComponent,
          ),
      },
      {
        path: 'monitor',
        loadComponent: () => import('./features/monitor/monitor').then((m) => m.Monitor),
      },
      {
        path: 'smonitor',
        loadComponent: () => import('./features/smonitor/smonitor').then((m) => m.Smonitor),
      },
      {
        path: 'search-finalo',
        loadComponent: () =>
          import('./features/search-finalo/search-finalo').then((m) => m.SearchFinalo),
      },
    ],
  },
];
