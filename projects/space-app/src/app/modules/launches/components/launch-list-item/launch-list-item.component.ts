import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Launch } from 'space-api/types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tbody[appLaunchesListItem]',
  imports: [DatePipe, NgOptimizedImage, RouterLink],
  templateUrl: './launch-list-item.component.html',
  styleUrl: './launch-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchListItemComponent {
  public readonly launch: InputSignal<Launch> = input.required();
}
