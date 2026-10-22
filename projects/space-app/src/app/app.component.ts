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
}
