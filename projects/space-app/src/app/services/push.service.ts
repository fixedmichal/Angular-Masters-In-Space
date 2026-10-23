import { inject, Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { filter, from, map, Observable, switchMap, take } from 'rxjs';
import { SubscriptionsService } from 'space-api/services';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PushService {
  private swPush = inject(SwPush);
  private subscriptionsService = inject(SubscriptionsService);

  isSubscribed = this.swPush.subscription.pipe(map(Boolean));

  constructor() {
    if (!this.swPush.isEnabled) {
      return;
    }

    this.swPush.messages.subscribe(console.log);
  }

  requestSubscription(): Observable<void> {
    return from(
      this.swPush.requestSubscription({
        serverPublicKey: environment.publicVapidKey,
      }),
    ).pipe(
      switchMap((subscription) =>
        this.subscriptionsService.addSubscription(subscription),
      ),
    );
  }

  revokeSubscription(): Observable<void> {
    return this.swPush.subscription.pipe(
      take(1),
      filter(Boolean),
      switchMap((subscription) =>
        from(this.swPush.unsubscribe()).pipe(
          switchMap(() =>
            this.subscriptionsService.removeSubscription(subscription),
          ),
        ),
      ),
    );
  }
}
