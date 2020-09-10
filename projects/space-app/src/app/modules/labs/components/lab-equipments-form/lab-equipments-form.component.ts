import { Component, input, output } from '@angular/core';
import { Equipment } from 'space-api/types';
import { EquipmentFormComponent } from '../equipment-form/equipment-form.component';
import { FieldTree } from '@angular/forms/signals';


@Component({
  selector: 'app-lab-equipments-form',
  templateUrl: './lab-equipments-form.component.html',
  styleUrls: ['./lab-equipments-form.component.css'],
  imports: [EquipmentFormComponent]
})
export class LabEquipmentsFormComponent {
  forms = input.required<FieldTree<Equipment[]>>();
  equipmentAdd = output<void>();
  equipmentRemove = output<number>();

  addEquipment(): void {
    this.equipmentAdd.emit();
  }

  removeEquipment(index: number): void {
    this.equipmentRemove.emit(index);
  }
}
