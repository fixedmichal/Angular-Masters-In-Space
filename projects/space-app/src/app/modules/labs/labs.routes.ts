import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { createLabResolver } from './resolvers/create-lab.resolver';
import { editLabResolver } from './resolvers/edit-lab.resolver';
import { LabsComponent } from './views/labs/labs.component';
import { LabFormComponent } from './views/lab-form/lab-form.component';

const routes: Routes = [
  {path: 'create/new', component: LabFormComponent, resolve: {lab: createLabResolver}},

  {path: 'edit/:id', component: LabFormComponent, resolve: {lab: editLabResolver}},

  {path: '', component: LabsComponent, pathMatch: 'full'}
];

export default routes;
