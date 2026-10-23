import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { A2sCommComponent } from 'a2s-comm';
import { APP_CONFIG } from './app-config.token';
import { IfFeatureEnabledDirective } from './modules/shared/if-feature-enabled.directive';
import {
  NAV_ITEM_FEATURE_NAMES,
  NAV_ITEM_LABELS,
  NAV_ITEM_ROUTER_LINKS,
  NavItem,
} from './nav-item';
import { isBusy } from './services/busy.interceptor';
import { toSignal } from '@angular/core/rxjs-interop';
import { UpdateService } from './services/update.service';
import { PushService } from './services/push.service';

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

  protected readonly navItems: NavItem[] = [
    NavItem.Start,
    NavItem.Launches,
    NavItem.Labs,
    NavItem.Moons,
    NavItem.MartianCalendar,
  ];
  protected readonly navItemRouterLinks = NAV_ITEM_ROUTER_LINKS;
  protected readonly navItemFeatureNames = NAV_ITEM_FEATURE_NAMES;
  protected readonly navItemLabels = NAV_ITEM_LABELS;

  updateService = inject(UpdateService);
  pushService = inject(PushService);

  updateAvailable = toSignal(this.updateService.updateAvailable);
  unrecoverableError = toSignal(this.updateService.unrecoverableError);
  busy = toSignal(isBusy);
  isSubscribed = toSignal(this.pushService.isSubscribed);
  protected readonly appVersion = this.appConfig.version;

  activateUpdate(): void {
    this.updateService.activateUpdate();
  }

  reloadApp(): void {
    this.updateService.reloadApp();
  }

  requestSubscription() {
    this.pushService
      .requestSubscription()
      .subscribe(() => alert('Subscribed!'));
  }

  revokeSubscription() {
    this.pushService
      .revokeSubscription()
      .subscribe(() => alert('Unsubscribed!'));
  }
}
