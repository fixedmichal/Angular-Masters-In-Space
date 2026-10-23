import {
  Component,
  effect,
  input,
  inputBinding,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { EquipmentFormStateComponent } from '../equipment-form-state/equipment-form-state.component';
import { FieldTree, FormField } from '@angular/forms/signals';
import { Equipment } from 'space-api/types';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css'],
  imports: [FormField],
})
export class EquipmentFormComponent {
  form = input.required<FieldTree<Equipment>>();
  container = viewChild('container', { read: ViewContainerRef });

  constructor() {}

  asd(): void {
    effect(() => {
      const container = this.container();

      if (container) {
        container.clear();
        container.createComponent(EquipmentFormStateComponent, {
          bindings: [inputBinding('fieldState', this.form())],
        });
      }
    });
  }
}
