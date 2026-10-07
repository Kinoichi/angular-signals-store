import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Smonitor } from './smonitor';

describe('Smonitor', () => {
  let component: Smonitor;
  let fixture: ComponentFixture<Smonitor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Smonitor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Smonitor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
