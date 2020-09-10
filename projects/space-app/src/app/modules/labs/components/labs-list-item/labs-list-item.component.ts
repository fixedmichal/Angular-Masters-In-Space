// tslint:disable:component-selector
import { Component, inject, input } from '@angular/core';
import { Lab } from 'space-api/types';
import { rxResource } from '@angular/core/rxjs-interop';
import { MoonsService } from 'space-api/services';

@Component({
  selector: 'tbody[appLabsListItem]',
  templateUrl: './labs-list-item.component.html',
  styleUrls: ['./labs-list-item.component.css'],
  imports: []
})
export class LabsListItemComponent {
  private moonService = inject(MoonsService)

  lab = input.required<Lab>();

  moonName = rxResource({
    params: () => ({ moonId: this.lab().details.moonId }),
    stream: ({params}) => this.moonService.getMoonName(params.moonId),
    defaultValue: ''
  })
}
