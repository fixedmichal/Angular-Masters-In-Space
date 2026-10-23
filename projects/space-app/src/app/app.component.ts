import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { A2sCommComponent } from 'a2s-comm';
import { APP_CONFIG } from './app-config.token';
import {
  hideNavigation as hideNavigationAction,
  showNavigation as showNavigationAction,
} from './app.actions';
import { IfFeatureEnabledDirective } from './modules/shared/if-feature-enabled.directive';
import {
  NAV_ITEM_FEATURE_NAMES,
  NAV_ITEM_LABELS,
  NAV_ITEM_ROUTER_LINKS,
  NavItem,
} from './nav-item';
import { isBusy } from './services/busy.interceptor';
import { UpdateService } from './services/update.service';
import { PushService } from './services/push.service';
import { selectNavigationVisible } from './app.selectors';

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
  private readonly store = inject(Store);
  protected readonly navigationVisible = toSignal(
    this.store.select(selectNavigationVisible),
    { initialValue: true },
  );

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

  showNavigation(): void {
    this.store.dispatch(showNavigationAction());
  }

  hideNavigation(): void {
    this.store.dispatch(hideNavigationAction());
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
