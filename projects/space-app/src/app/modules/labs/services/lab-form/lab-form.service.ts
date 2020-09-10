import { Injectable, WritableSignal } from '@angular/core';
import { Lab } from 'space-api/types';
import { applyEach, FieldTree, form, required } from '@angular/forms/signals';

@Injectable({ providedIn: 'root' })
export class LabFormService {
  formToLab(form: FieldTree<Lab>): Lab {
    return form().value();
  }

  addEquipment(form: FieldTree<Lab>): void {
    // TODO zaimplementuj
  }

  removeEquipment(form: FieldTree<Lab>, index: number): void {
    // TODO zaimplementuj
  }

  buildForm(lab: WritableSignal<Lab>): FieldTree<Lab> {
    return form(lab, (schema) => {
      required(schema.details.name);
      required(schema.details.moonId);

      applyEach(schema.equipments, (equipmentSchema) => {
        required(equipmentSchema.name);
        required(equipmentSchema.tag);
      });
    });
  }
}
