import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AppConfig } from 'space-api/types/app-config';
import { APP_CONFIG } from '../app-config.token';

export const featureEnabledGuard =
  (featureName: keyof AppConfig['features']): CanMatchFn =>
  () =>
    inject(APP_CONFIG).features[featureName] ||
    inject(Router).createUrlTree(['/forbidden']);
