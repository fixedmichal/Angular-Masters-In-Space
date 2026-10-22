import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';
import { AppConfig } from 'space-api/types/app-config';
import { APP_CONFIG } from '../app-config.token';

import { featureEnabledGuard } from './feature-enabled.guard';

describe('featureEnabledGuard', () => {
  const appConfig: AppConfig = {
    version: '1.0.0',
    features: {
      start: true,
      launches: true,
      labs: false,
      moons: true,
      martianCalendar: true,
    },
  };

  const executeGuard =
    (featureName: keyof AppConfig['features']): CanMatchFn =>
      TestBed.runInInjectionContext(() => featureEnabledGuard(featureName));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: APP_CONFIG, useValue: appConfig }],
    });
  });

  it('returns true for an enabled feature', () => {
    expect(executeGuard('launches')({} as never, []))
      .toBeTrue();
  });

  it('returns false for a disabled feature', () => {
    expect(executeGuard('labs')({} as never, []))
      .toBeFalse();
  });
});
