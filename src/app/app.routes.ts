import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  // Auth Routes
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{ path: 'login', component: LoginComponent }],
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
