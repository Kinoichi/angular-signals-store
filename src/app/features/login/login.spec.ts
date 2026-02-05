import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { AuthStore } from '../../core/store/auth.store';
import { createAuthStoreMock } from '../../testing/auth.store.mock'; // Import it / Importalo

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let mockAuthStore: any;

  beforeEach(async () => {
    mockAuthStore = createAuthStoreMock(); // Initialize mock / Inizializza il mock

    await TestBed.configureTestingModule({
      imports: [Login], // Login is standalone
      providers: [{ provide: AuthStore, useValue: mockAuthStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should extract signal values and pass them to store.login', () => {
    // 1. Arrange: Set the values you want to test
    const testEmail = 'cbacc@example.com';
    const testPass = 'secret123';

    component.email.set(testEmail);
    component.password.set(testPass);

    // 2. Act: Call the function
    component.onSubmit();

    // 3. Assert: Check if the store received exactly those values
    expect(mockAuthStore.login).toHaveBeenCalledWith({
      email: testEmail,
      pass: testPass,
    });
  });
});
