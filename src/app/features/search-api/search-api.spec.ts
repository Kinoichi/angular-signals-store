import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchApi } from './search-api';

describe('SearchApi', () => {
  let component: SearchApi;
  let fixture: ComponentFixture<SearchApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchApi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
