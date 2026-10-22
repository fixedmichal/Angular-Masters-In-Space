import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { AppConfigService } from 'space-api/services/app-config/app-config.service';
import { NG_STATUS_CLASSES } from '@angular/forms/signals/compat';
import { provideSignalFormsConfig } from '@angular/forms/signals';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAppImageLoader } from './app-image-loader';
import { AppConfig } from 'space-api/types';
import { Observable } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideSignalFormsConfig({ classes: NG_STATUS_CLASSES }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideAppImageLoader(),
    provideAppInitializer(appConfigInitializer),
  ],
};

function appConfigInitializer(): Observable<AppConfig> {
  return inject(AppConfigService).getAppConfig();
}
