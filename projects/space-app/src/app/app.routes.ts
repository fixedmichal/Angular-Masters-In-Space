import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'start',
    loadComponent: () => import('./views/start/start.component')
  },
  {
    path: 'launches',
    loadChildren: () => import('./modules/launches/launches.routes')
  },
  {
    path: 'labs',
    loadChildren: () => import('./modules/labs/labs.routes')
  },
  {
    path: 'moons',
    loadComponent: () => import('./modules/moons/views/moons/moons.component'),
  },
  {
    path: 'martian-calendar',
    loadChildren: () => import('./modules/martian-calendar/martian-calendar.routes')
  },
  {
    path: '**',
    redirectTo: 'start',
    pathMatch: 'full'
  }
];
