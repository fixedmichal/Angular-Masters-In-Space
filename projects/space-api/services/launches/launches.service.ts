import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Launch, LaunchDetailsUpdate, LaunchesQueryParams } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class LaunchesService {
  private http = inject(HttpClient);

  getLaunches(params: Partial<LaunchesQueryParams> = {}): Observable<Launch[]> {
    const { sort, order, query } = params;
    return this.http.get<Launch[]>(`/api/launches`, {
      params: {
        ...(sort ? { _sort: sort.toString() } : {}),
        ...(order ? { _order: order } : {}),
        ...(query ? { q: query } : {}),
      },
    });
  }

  getLaunch(id: number): Observable<Launch> {
    return this.http.get<Launch>(`/api/launches/${id}`);
  }

  updateDetails(detailsUpdate: LaunchDetailsUpdate): Observable<Launch> {
    const {id, details} = detailsUpdate;

    console.log('details', details);
    return this.http.post<Launch>(`/api/launches/${id}/details`, {details});
  }
}
