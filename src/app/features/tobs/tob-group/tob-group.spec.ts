import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TobGroup } from './tob-group';

describe('TobGroup', () => {
  let component: TobGroup;
  let fixture: ComponentFixture<TobGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TobGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TobGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
