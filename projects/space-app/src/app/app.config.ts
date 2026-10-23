import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  inject,
  provideAppInitializer, isDevMode,
} from '@angular/core';
import { AppConfigService } from 'space-api/services/app-config/app-config.service';
import { NG_STATUS_CLASSES } from '@angular/forms/signals/compat';
import { provideSignalFormsConfig } from '@angular/forms/signals';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { routes } from './app.routes';
import { provideAppImageLoader } from './app-image-loader';
import { AppConfig } from 'space-api/types';
import { Observable } from 'rxjs';
import { busyInterceptor } from './services/busy.interceptor';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appReducer } from './app.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideSignalFormsConfig({ classes: NG_STATUS_CLASSES }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([busyInterceptor])),
    provideAppImageLoader(),
    provideStore({ app: appReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAppInitializer(appConfigInitializer),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};

function appConfigInitializer(): Observable<AppConfig> {
  return inject(AppConfigService).getAppConfig();
}
