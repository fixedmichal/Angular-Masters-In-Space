import { AppConfig } from 'space-api/types';

export enum NavItem {
  Start,
  Launches,
  Labs,
  Moons,
  MartianCalendar,
}

export const NAV_ITEM_ROUTER_LINKS: Record<NavItem, string> = {
  [NavItem.Start]: '/start',
  [NavItem.Launches]: '/launches',
  [NavItem.Labs]: '/labs',
  [NavItem.Moons]: '/moons',
  [NavItem.MartianCalendar]: '/martian-calendar',
};

export const NAV_ITEM_FEATURE_NAMES: Record<NavItem, keyof AppConfig['features']> = {
  [NavItem.Start]: 'start',
  [NavItem.Launches]: 'launches',
  [NavItem.Labs]: 'labs',
  [NavItem.Moons]: 'moons',
  [NavItem.MartianCalendar]: 'martianCalendar',
};

export const NAV_ITEM_LABELS: Record<NavItem, string> = {
  [NavItem.Start]: 'Space App',
  [NavItem.Launches]: 'Loty kosmiczne',
  [NavItem.Labs]: 'Laboratoria',
  [NavItem.Moons]: 'Księżyce',
  [NavItem.MartianCalendar]: 'Czas marsjański',
};
