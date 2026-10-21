import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { NG_STATUS_CLASSES } from '@angular/forms/signals/compat';
import { provideSignalFormsConfig } from '@angular/forms/signals';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAppImageLoader } from './app-image-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideSignalFormsConfig({ classes: NG_STATUS_CLASSES }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideAppImageLoader(),
  ],
};
