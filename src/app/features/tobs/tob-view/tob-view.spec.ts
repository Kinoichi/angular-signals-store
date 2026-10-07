import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TobView } from './tob-view';

describe('TobView', () => {
  let component: TobView;
  let fixture: ComponentFixture<TobView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TobView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TobView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
