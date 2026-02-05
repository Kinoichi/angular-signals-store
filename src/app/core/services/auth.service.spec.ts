import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should return auth data on login', async () => {
    const mockResponse = { id: '1', token: 'abc-123' };

    // 1. Convert Observable to Promise / Converti l'Observable in Promise
    const requestPromise = firstValueFrom(service.login({}));

    // 2. Handle the mock / Gestisci il mock
    const req = httpMock.expectOne('http://localhost:3000/auth');
    req.flush(mockResponse);

    // 3. Wait for the result / Attendi il risultato
    const response = await requestPromise;

    expect(response).toEqual(mockResponse);
  });
});
