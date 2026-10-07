// testing/auth.store.mock.ts
import { signal } from '@angular/core';
import { vi } from 'vitest';

export const createAuthStoreMock = () => {
  return {
    // We use real signals so the component's template can "read" them
    isLoading: signal(false),
    error: signal(null as string | null),
    user: signal(null),
    isAuthenticated: signal(false),
    login: vi.fn((credentials: { email: string; pass: string }) => {}),
  };
};
