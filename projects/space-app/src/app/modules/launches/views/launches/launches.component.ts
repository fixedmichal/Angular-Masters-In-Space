import { Component, inject } from '@angular/core';
import { LaunchesService } from 'space-api/services';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss'],
  imports: [DatePipe, AsyncPipe]
})
export class LaunchesComponent {
  private launchesService = inject(LaunchesService);

  launches = this.launchesService.getLaunches()

}
