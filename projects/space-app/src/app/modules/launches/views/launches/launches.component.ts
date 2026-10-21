import { Component, inject } from '@angular/core';
import { LaunchesService } from 'space-api/services';
import { LaunchDetailsUpdate } from 'space-api/types';
import { AsyncPipe } from '@angular/common';
import { LaunchesListComponent } from '../../components/launches-list/launches-list.component';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss'],
  imports: [AsyncPipe, LaunchesListComponent]
})
export class LaunchesComponent {
  private launchesService = inject(LaunchesService);

  protected readonly launches = this.launchesService.getLaunches()

  onLaunchDetailsUpdate($event: LaunchDetailsUpdate): void {
   this.launchesService.updateDetails($event).subscribe();
  }

}
