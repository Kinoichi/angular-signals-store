import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no outstanding requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a user by ID via GET', () => {
    const mockUser: User = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'user',
    } as User;
    const userId = '1';

    service.getUserById(userId).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    // Expect a single request to the specific URL
    const req = httpMock.expectOne(`http://localhost:3000/users/${userId}`);
    expect(req.request.method).toBe('GET');

    // Resolve the request with mock data
    req.flush(mockUser);
  });

  it('should handle errors gracefully', () => {
    const userId = '999';

    service.getUserById(userId).subscribe({
      next: () => {
        throw new Error('Should have failed');
      }, // Or expect(true).toBe(false),
      error: (error) => {
        expect(error.status).toBe(404);
      },
    });

    const req = httpMock.expectOne(`http://localhost:3000/users/${userId}`);
    req.flush('User not found', { status: 404, statusText: 'Not Found' });
  });
});
