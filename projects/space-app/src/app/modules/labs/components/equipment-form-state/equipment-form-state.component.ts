import { Component, input, InputSignal } from '@angular/core';
import { FieldState } from '@angular/forms/signals';
import { Equipment } from 'space-api/types';

@Component({
  selector: 'app-equipment-form-state',
  templateUrl: './equipment-form-state.component.html',
  styleUrl: './equipment-form-state.component.scss',
})
export class EquipmentFormStateComponent {
  fieldState: InputSignal<FieldState<Equipment>> = input.required();
}
