import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';
import { RequestStagesComponent } from './request-stages/request-stages.component'

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: 'stages', component: RequestStagesComponent },
  { path: '', redirectTo: 'stages', pathMatch: 'full'},
  { path: '**',    component: NoContentComponent },
];
