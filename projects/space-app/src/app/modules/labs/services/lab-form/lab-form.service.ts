import { Injectable, WritableSignal } from '@angular/core';
import { Lab } from 'space-api/types';
import {
  applyEach,
  disabled,
  FieldTree,
  form,
  required,
} from '@angular/forms/signals';

@Injectable({ providedIn: 'root' })
export class LabFormService {
  formToLab(form: FieldTree<Lab>): Lab {
    const formValue = form().value();

    return form.equipments().disabled()
      ? { ...formValue, equipments: [] }
      : formValue;
  }

  addEquipment(form: FieldTree<Lab>): void {
    form
      .equipments()
      .value.update((equipments) => [
        ...equipments,
        { name: '', tag: '', description: '' },
      ]);
  }

  removeEquipment(form: FieldTree<Lab>, index: number): void {
    form
      .equipments()
      .value.update((equipments) => equipments.filter((_, i) => i !== index));
  }

  buildForm(lab: WritableSignal<Lab>): FieldTree<Lab> {
    return form(lab, (schema) => {
      required(schema.details.name);
      required(schema.details.moonId);

      applyEach(schema.equipments, (equipmentSchema) => {
        required(equipmentSchema.name, {
          when: ({ valueOf }) => valueOf(schema.details.enableTags),
        });
        required(equipmentSchema.tag);
      });
      disabled(schema.equipments, ({ valueOf }) =>
        valueOf(schema.details.autonomous)
          ? 'Nie można zarządzać wyposażeniem gdy laboratorium jest autonomiczne'
          : false,
      );
    });
  }
}
