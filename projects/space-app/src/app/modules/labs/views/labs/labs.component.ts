import { Component, inject } from '@angular/core';
import { LabsService } from 'space-api/services';
import { Lab } from 'space-api/types';
import { RouterLink } from '@angular/router';
import { LabsListComponent } from '../../components/labs-list/labs-list.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { ResourceWrapperComponent } from '../../../../components/resource-wrapper/resource-wrapper.component';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css'],
  imports: [RouterLink, LabsListComponent, ResourceWrapperComponent]
})
export class LabsComponent {
  private labService = inject(LabsService);

  labs = rxResource({
    stream: () => this.labService.getLabs(),
    defaultValue: []
  });

  removeLab(lab: Lab): void {
    if (!confirm('Czy na pewno?')) {
      return;
    }

    this.labService.removeLab(lab.id!)
      .subscribe({
        next: () => this.labs.reload(),
        error: () => alert('Usuwanie nie powiodło się!')
      });
  }
}
