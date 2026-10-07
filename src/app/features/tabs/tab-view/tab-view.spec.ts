import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabView } from './tab-view';

describe('TabView', () => {
  let component: TabView;
  let fixture: ComponentFixture<TabView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
