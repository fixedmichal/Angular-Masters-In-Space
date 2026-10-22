import { Routes } from '@angular/router';
import { featureEnabledGuard } from './services/feature-enabled.guard';

export const routes: Routes = [
  {
    path: 'start',
    loadComponent: () => import('./views/start/start.component'),
  },
  {
    path: 'launches',
    loadChildren: () => import('./modules/launches/launches.routes'),
  },
  {
    path: 'labs',
    loadChildren: () => import('./modules/labs/labs.routes'),
    canMatch: [featureEnabledGuard('labs')],
  },
  {
    path: 'moons',
    loadComponent: () => import('./modules/moons/views/moons/moons.component'),
  },
  {
    path: 'martian-calendar',
    loadChildren: () =>
      import('./modules/martian-calendar/martian-calendar.routes'),
  },
  {
    path: 'forbidden',
    loadComponent: () => import('./views/forbidden/forbidden.component'),
  },
  {
    path: '**',
    redirectTo: 'start',
    pathMatch: 'full',
  },
];
