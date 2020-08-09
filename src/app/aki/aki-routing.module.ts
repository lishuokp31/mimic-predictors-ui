import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AkiComponent } from '@aki/containers';

const routes: Routes = [{ path: '', component: AkiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AkiRoutingModule {}
