import {
  Directive,
  effect,
  inject,
  input,
  InputSignal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { APP_CONFIG } from '../../app-config.token';
import { AppConfig } from 'space-api/types';

@Directive({
  selector: '[appIfFeatureEnabled]',
})
export class IfFeatureEnabledDirective {
  templateRef = inject(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);
  appConfig = inject(APP_CONFIG);

  featureName: InputSignal<keyof AppConfig['features']> = input.required();

  constructor() {
    effect(() => {
      const hasAccess = this.appConfig.features[this.featureName()];

      if (hasAccess) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
