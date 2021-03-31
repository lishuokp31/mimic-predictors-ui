import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NerComponent } from '@ner/containers';

const routes: Routes = [{ path: '', component: NerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NerRoutingModule {}
