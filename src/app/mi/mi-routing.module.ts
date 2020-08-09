import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiComponent } from '@mi/containers';

const routes: Routes = [{ path: '', component: MiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiRoutingModule {}
