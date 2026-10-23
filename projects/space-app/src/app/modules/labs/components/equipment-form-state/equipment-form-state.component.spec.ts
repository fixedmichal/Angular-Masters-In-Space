import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentFormStateComponent } from './equipment-form-state.component';

describe('EquipmentFormStateComponent', () => {
  let component: EquipmentFormStateComponent;
  let fixture: ComponentFixture<EquipmentFormStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentFormStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentFormStateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
