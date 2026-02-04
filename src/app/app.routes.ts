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
      /* { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent } */
    ],
  },
];
