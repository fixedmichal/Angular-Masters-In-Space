import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  private http = inject(HttpClient);

  addSubscription(subscription: PushSubscription): Observable<void> {
    return this.http.post<PushSubscription>(`/api/subscriptions`, subscription).pipe(
      map(() => undefined)
    )
  }

  removeSubscription(subscription: PushSubscription): Observable<void> {
    return this.http.get<{id: number}[]>(`/api/subscriptions?endpoint=${subscription.endpoint}`).pipe(
      map((records) => records[0]?.id),
      switchMap((id) => id ? this.http.delete<void>(`/api/subscriptions/${id}`) : of(undefined))
    )
  }
}
