import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsComponent } from '@patients/containers';
import { PatientsResolver } from '@patients/resolvers';

const routes: Routes = [
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
