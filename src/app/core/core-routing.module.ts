import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundPage } from '@core/containers';

const routes: Routes = [
  {
    path: 'sepsis',
    loadChildren: () =>
      import('../sepsis/sepsis.module').then((m) => m.SepsisModule),
  },
  {
    path: 'mi',
    loadChildren: () => import('../mi/mi.module').then((m) => m.MiModule),
  },
  {
    path: 'vancomycin',
    loadChildren: () =>
      import('../vancomycin/vancomycin.module').then((m) => m.VancomycinModule),
  },
  {
    path: 'aki',
    loadChildren: () => import('../aki/aki.module').then((m) => m.AkiModule),
  },
  { path: '', redirectTo: '/aki', pathMatch: 'full' },
  { path: '**', component: PageNotFoundPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
