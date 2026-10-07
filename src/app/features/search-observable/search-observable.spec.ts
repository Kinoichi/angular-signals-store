import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchObservable } from './search-observable';

describe('SearchObservable', () => {
  let component: SearchObservable;
  let fixture: ComponentFixture<SearchObservable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchObservable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchObservable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
