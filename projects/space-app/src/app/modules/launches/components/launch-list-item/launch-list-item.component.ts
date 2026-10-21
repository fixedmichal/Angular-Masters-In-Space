import { Component, input, InputSignal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Launch } from 'space-api/types';

@Component({
  selector: 'tbody[appLaunchesListItem]',
  imports: [DatePipe],
  templateUrl: './launch-list-item.component.html',
  styleUrl: './launch-list-item.component.scss',
})
export class LaunchListItemComponent {
  public readonly launch: InputSignal<Launch> = input.required()
}
