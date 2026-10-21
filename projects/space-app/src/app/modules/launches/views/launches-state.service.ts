import { Injectable, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LaunchesService } from 'space-api/services';
import { LaunchDetailsUpdate } from 'space-api/types';
import { LaunchesQueryParams } from 'space-api/types/launches-query-params';

@Injectable()
export class LaunchesStateService {
  private readonly launchesService = inject(LaunchesService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly DEFAULT_QUERY_PARAMS: LaunchesQueryParams = {
    sort: 'id',
    order: 'ASC',
    query: '',
  };

  public readonly queryParams = toSignal(
    this.activatedRoute.queryParams.pipe(
      map((params) => ({
        ...this.DEFAULT_QUERY_PARAMS,
        ...params,
      })),
    ),
    { requireSync: true },
  );

  public readonly launches = rxResource({
    params: () => ({ queryParams: this.queryParams() }),
    stream: ({ params }) =>
      this.launchesService.getLaunches(params.queryParams),
    defaultValue: [],
  });

  searchLaunches(params: Partial<LaunchesQueryParams>) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        ...this.DEFAULT_QUERY_PARAMS,
        ...params,
      },
    });
  }

  updateLaunchDetails(detailsUpdate: LaunchDetailsUpdate): void {
    this.launchesService.updateDetails(detailsUpdate).subscribe(() => {
      this.launches.reload();
    });
  }
}
