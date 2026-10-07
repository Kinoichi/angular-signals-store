import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { AuthStore } from '../../core/store/auth.store';
import { createAuthStoreMock } from '../../testing/auth.store.mock';
import { FormsModule } from '@angular/forms';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let mockAuthStore: any;

  beforeEach(async () => {
    mockAuthStore = createAuthStoreMock();

    await TestBed.configureTestingModule({
      // Ensure FormsModule is here if using ngModel in template
      // Assicurati che FormsModule sia qui se usi ngModel nel template
      imports: [Login, FormsModule],
      providers: [{ provide: AuthStore, useValue: mockAuthStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // --- LOGIC TESTS / TEST DELLA LOGICA ---
  describe('Logic', () => {
    it('should extract signal values and pass them to store.login', () => {
      const testEmail = 'cbacc@example.com';
      const testPass = 'secret123';

      component.email.set(testEmail);
      component.password.set(testPass);

      component.onSubmit();

      expect(mockAuthStore.login).toHaveBeenCalledWith({
        email: testEmail,
        pass: testPass,
      });
    });
  });

  // --- UI & TEMPLATE TESTS / TEST UI E TEMPLATE ---
  describe('Template', () => {
    it('should sync input changes with signals', async () => {
      const emailInput = fixture.nativeElement.querySelector('input[type="email"]');

      emailInput.value = 'new@test.com';
      emailInput.dispatchEvent(new Event('input')); // Trigger ngModelChange

      expect(component.email()).toBe('new@test.com');
    });

    it('should show loader/skeletons when isLoading is false', () => {
      // Testing your specific logic: @if (authStore.isLoading() === false)
      // Test della tua logica specifica: @if (authStore.isLoading() === false)
      mockAuthStore.isLoading.set(false);
      fixture.detectChanges();

      const loader = fixture.nativeElement.querySelector('app-loader');
      const skeletons = fixture.nativeElement.querySelectorAll('app-skeleton');

      expect(loader).toBeTruthy();
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('should hide loader when isLoading is true', () => {
      mockAuthStore.isLoading.set(true);
      fixture.detectChanges();

      const loader = fixture.nativeElement.querySelector('app-loader');
      expect(loader).toBeNull();
    });

    it('should display the error message from the store', () => {
      const errorText = 'Invalid password';
      mockAuthStore.error.set(errorText);
      fixture.detectChanges();

      const errorParagraph = fixture.nativeElement.querySelector('p');
      expect(errorParagraph?.textContent).toContain(errorText);
    });

    it('should trigger onSubmit when clicking the Login button', () => {
      const submitSpy = vi.spyOn(component, 'onSubmit');
      const button = fixture.nativeElement.querySelector('button');

      button.click();

      expect(submitSpy).toHaveBeenCalled();
    });
  });
});
