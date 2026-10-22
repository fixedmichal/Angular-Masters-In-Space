import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { A2sCommComponent } from 'a2s-comm';
import { APP_CONFIG } from './app-config.token';
import { IfFeatureEnabledDirective } from './modules/shared/if-feature-enabled.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterLink,
    RouterOutlet,
    A2sCommComponent,
    RouterLinkActive,
    IfFeatureEnabledDirective,
  ],
})
export class AppComponent {
  protected readonly appConfig = inject(APP_CONFIG);

  protected readonly appVersion = this.appConfig.version;
}
