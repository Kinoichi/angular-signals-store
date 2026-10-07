import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSignal } from './search-signal';

describe('SearchSignal', () => {
  let component: SearchSignal;
  let fixture: ComponentFixture<SearchSignal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSignal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSignal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
