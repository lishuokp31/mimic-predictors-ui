import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VancomycinComponent } from '@vancomycin/containers';

const routes: Routes = [{ path: '', component: VancomycinComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VancomycinRoutingModule {}
