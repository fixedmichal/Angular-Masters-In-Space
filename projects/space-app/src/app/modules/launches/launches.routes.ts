import { Routes } from '@angular/router';
import { LaunchesComponent } from './views/launches/launches.component';

const routes: Routes = [
  {path: '', component: LaunchesComponent, pathMatch: 'full'}
];

export default routes;
