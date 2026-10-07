import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tob } from './tob';

describe('Tob', () => {
  let component: Tob;
  let fixture: ComponentFixture<Tob>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tob]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tob);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
