import { Component, computed, inject } from '@angular/core';
import { LaunchDetailsUpdate, LaunchesQueryParams } from 'space-api/types';
import { LaunchesListComponent } from '../../components/launches-list/launches-list.component';
import { LaunchesStateService } from '../launches-state.service';
import { ResourceWrapperComponent } from '../../../../components/resource-wrapper/resource-wrapper.component';
import { LaunchesFiltersComponent } from '../../components/launches-filters/launches-filters.component';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss'],
  imports: [
    // ResourceWrapperComponent,
    LaunchesListComponent,
    LaunchesFiltersComponent,
  ],
  providers: [LaunchesStateService],
})
export class LaunchesComponent {
  private launchesStateService = inject(LaunchesStateService);

  protected readonly queryParams = this.launchesStateService.queryParams;
  protected readonly launches = computed(() =>
    this.launchesStateService.launches.hasValue()
      ? this.launchesStateService.launches.value()
      : undefined,
  );

  onLaunchDetailsUpdate($event: LaunchDetailsUpdate): void {
    this.launchesStateService.updateLaunchDetails($event);
  }

  searchLaunches(params: LaunchesQueryParams): void {
    this.launchesStateService.searchLaunches(params);
  }
}
