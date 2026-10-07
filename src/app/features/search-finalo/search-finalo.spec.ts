import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFinalo } from './search-finalo';

describe('SearchFinalo', () => {
  let component: SearchFinalo;
  let fixture: ComponentFixture<SearchFinalo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFinalo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFinalo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
