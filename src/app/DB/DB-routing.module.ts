import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DBComponent } from '@DB/containers';

const routes: Routes = [{ path: '', component: DBComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DBRoutingModule {}
