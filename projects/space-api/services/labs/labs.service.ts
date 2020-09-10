import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lab } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class LabsService {
  private http = inject(HttpClient);

  getLabs(): Observable<Lab[]> {
    return this.http.get<Lab[]>(`/api/labs`);
  }

  getLab(id: number): Observable<Lab> {
    return this.http.get<Lab>(`/api/labs/${id}`);
  }

  saveLab(lab: Lab): Observable<Lab> {
    return lab.id ? this.updateLab(lab) : this.createLab(lab);
  }

  removeLab(id: number): Observable<void> {
    return this.http.delete<void>(`/api/labs/${id}`);
  }

  private updateLab(lab: Lab): Observable<Lab> {
    return this.http.put<Lab>(`/api/labs/${lab.id}`, lab);
  }

  private createLab(lab: Lab): Observable<Lab> {
    return this.http.post<Lab>(`/api/labs`, lab);
  }
}
