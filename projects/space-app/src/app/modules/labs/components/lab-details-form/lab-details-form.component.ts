import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { LabDetails } from 'space-api/types';

@Component({
  selector: 'app-lab-details-form',
  templateUrl: './lab-details-form.component.html',
  styleUrls: ['./lab-details-form.component.css'],
  imports: [FormField]
})
export class LabDetailsFormComponent {
  form = input.required<FieldTree<LabDetails>>();

}
