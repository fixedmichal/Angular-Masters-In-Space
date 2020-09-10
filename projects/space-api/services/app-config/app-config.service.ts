import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppConfig } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private http = inject(HttpClient);

  currentAppConfig: AppConfig = {
    features: {labs: true, launches: true, moons: true, martianCalendar: true, start: true},
    version: 'unknown'
  };

  getAppConfig(): Observable<AppConfig> {
    return this.http.get<AppConfig>(`/api/app-config`).pipe(
      catchError(error => {
        const cachedAppConfig = JSON.parse(localStorage.getItem('app-config') ?? 'null');
        return cachedAppConfig ? of(cachedAppConfig) : throwError(error);
      }),
      tap(appConfig => {
        localStorage.setItem('app-config', JSON.stringify(appConfig));
        this.currentAppConfig = appConfig;
      })
    );
  }
}
