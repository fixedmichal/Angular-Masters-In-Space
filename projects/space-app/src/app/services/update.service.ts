import { inject, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { filter, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private swUpdate = inject(SwUpdate);

  updateAvailable = this.swUpdate.versionUpdates.pipe(
    filter((event) => event.type === 'VERSION_READY'),
  );
  unrecoverableError = this.swUpdate.unrecoverable;

  constructor() {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    interval(1000 * 60 * 60).subscribe(() => this.swUpdate.checkForUpdate());
  }

  reloadApp(): void {
    document.location.reload();
  }

  activateUpdate(): void {
    this.swUpdate.activateUpdate().then((activated) => {
      if (activated) {
        this.reloadApp();
      }
    });
  }
}
