import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
} from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Launch, LaunchDetailsUpdate } from 'space-api/types';
import { LaunchListItemComponent } from '../launch-list-item/launch-list-item.component';
import { LaunchDetailsComponent } from '../launch-details/launch-details.component';

@Component({
  selector: 'app-launches-list',
  imports: [LaunchListItemComponent, LaunchDetailsComponent, ScrollingModule],
  templateUrl: './launches-list.component.html',
  styleUrl: './launches-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchesListComponent {
  public readonly launches: InputSignal<Launch[] | null> = input.required();

  launchDetailsUpdate = output<LaunchDetailsUpdate>();

  updateDetails(launch: Launch, $event: string): void {
    this.launchDetailsUpdate.emit({ id: launch.id, details: $event });
  }
}
