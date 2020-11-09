import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  PatientDetailComponent,
  PatientsComponent,
} from '@patients/containers';
import { PatientsResolver } from '@patients/resolvers';
import { PatientExistsGuard } from './guards';

const routes: Routes = [
  {
    path: ':id',
    component: PatientDetailComponent,
    canActivate: [PatientExistsGuard],
  },
  {
    path: '',
    component: PatientsComponent,
    resolve: { patients: PatientsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
