import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { computed } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    isAuthenticated: computed(() => !!store.user()),
    userName: computed(() => store.user()?.name || 'Guest'),
  })),

  withMethods(
    (
      store,
      authService = inject(AuthService),
      userService = inject(UserService),
      router = inject(Router),
      platformId = inject(PLATFORM_ID),
    ) => {
      // Internal helper to fetch and patch user / Helper interno per recuperare e applicare l'utente
      async function loadUserProfile(id: string) {
        try {
          const userData = await lastValueFrom(userService.getUserById(id));
          patchState(store, { user: userData, isLoading: false, error: null });
        } catch (err) {
          // If profile fetch fails, we ensure the state is clean
          patchState(store, { user: null, isLoading: false, error: 'Could not load profile' });
          throw err; // Propagate to caller
        }
      }

      return {
        async login(credentials: { email: string; pass: string }) {
          patchState(store, { isLoading: true, error: null });
          try {
            const authResponse = await lastValueFrom(authService.login(credentials));

            if (isPlatformBrowser(platformId)) {
              localStorage.setItem('userId', authResponse.id);
            }

            // Reuse the helper / Riusa l'helper
            await loadUserProfile(authResponse.id);

            router.navigate(['/books']);
          } catch (err) {
            console.error('API Error:', err);
            patchState(store, { isLoading: false, error: 'Login failed' });
          }
        },

        async initAuth() {
          if (isPlatformBrowser(platformId)) {
            const savedId = localStorage.getItem('userId');
            if (savedId) {
              patchState(store, { isLoading: true });
              try {
                // Reuse the helper / Riusa l'helper
                await loadUserProfile(savedId);
              } catch {
                localStorage.removeItem('userId');
                router.navigate(['/login']);
              }
            }
          }
        },

        logout() {
          if (isPlatformBrowser(platformId)) {
            localStorage.removeItem('userId');
          }
          patchState(store, initialState);
          router.navigate(['/login']);
        },
      };
    },
  ),
);
