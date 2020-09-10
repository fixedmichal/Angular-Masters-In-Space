import { Component, inject, input, linkedSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { submit } from '@angular/forms/signals';
import { LabsService } from 'space-api/services';
import { Lab } from 'space-api/types';
import { LabFormService } from '../../services/lab-form/lab-form.service';
import { LabEquipmentsFormComponent } from '../../components/lab-equipments-form/lab-equipments-form.component';
import { LabDetailsFormComponent } from '../../components/lab-details-form/lab-details-form.component';

@Component({
  selector: 'app-lab-form',
  templateUrl: './lab-form.component.html',
  styleUrls: ['./lab-form.component.css'],
  imports: [RouterLink, RouterLinkActive, LabEquipmentsFormComponent, LabDetailsFormComponent]
})
export class LabFormComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private labService = inject(LabsService);
  private formService = inject(LabFormService);

  step = input<keyof Lab>();
  lab = input.required<Lab>();

  labModel = linkedSignal({
    source: this.lab,
    computation: (lab) => lab
  });

  form = this.formService.buildForm(this.labModel);

  saveLab(event: Event): void {
    event.preventDefault();

    submit(this.form, {
      action: async () => {
        const lab = this.formService.formToLab(this.form);
        this.labService.saveLab(lab).subscribe({
          next: () => this.router.navigate(['../..'], {relativeTo: this.route}),
          error: () => alert('Zapis nie powiódł się!')
        });
      },
      onInvalid: () => {
        alert('Popraw formularz!');
      }
    })
  }

  addEquipment(): void {
    this.formService.addEquipment(this.form);
  }

  removeEquipment(index: number): void {
    this.formService.removeEquipment(this.form, index);
  }
}
