import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { Equipment } from 'space-api/types';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css'],
  imports: [FormField]
})
export class EquipmentFormComponent {
  form = input.required<FieldTree<Equipment>>();

}
