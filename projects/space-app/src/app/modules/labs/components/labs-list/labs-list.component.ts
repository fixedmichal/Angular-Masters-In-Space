import { Component, input, output } from '@angular/core';
import { Lab } from 'space-api/types';
import { LabsListItemComponent } from '../labs-list-item/labs-list-item.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-labs-list',
  templateUrl: './labs-list.component.html',
  styleUrls: ['./labs-list.component.css'],
  imports: [LabsListItemComponent, RouterLink]
})
export class LabsListComponent {
  labRemove = output<Lab>();
  labs = input.required<Lab[]>();

  removeLab(lab: Lab): void {
    this.labRemove.emit(lab);
  }
}
