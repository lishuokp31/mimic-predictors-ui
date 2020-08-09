import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SepsisComponent } from '@sepsis/containers';

const routes: Routes = [{ path: '', component: SepsisComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SepsisRoutingModule {}
