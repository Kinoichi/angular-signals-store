import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionStorage } from './session-storage';

describe('SessionStorage', () => {
  let component: SessionStorage;
  let fixture: ComponentFixture<SessionStorage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionStorage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionStorage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
