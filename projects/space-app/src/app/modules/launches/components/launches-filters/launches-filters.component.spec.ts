import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchesFiltersComponent } from './launches-filters.component';

describe('LaunchesFilters', () => {
  let component: LaunchesFiltersComponent;
  let fixture: ComponentFixture<LaunchesFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchesFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaunchesFiltersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
