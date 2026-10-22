import { inject, InjectionToken } from '@angular/core';
import { AppConfigService } from 'space-api/services/app-config/app-config.service';
import { AppConfig } from 'space-api/types';

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG', {
  providedIn: 'root',
  factory: () => inject(AppConfigService).currentAppConfig,
});
