import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  SepsisPage,
  MiPage,
  VancomycinPage,
  AkiPage,
  PageNotFoundPage,
} from './pages';

const routes: Routes = [
  { path: 'sepsis', component: SepsisPage },
  { path: 'mi', component: MiPage },
  { path: 'vancomycin', component: VancomycinPage },
  { path: 'aki', component: AkiPage },
  { path: '', redirectTo: '/sepsis', pathMatch: 'full' },
  { path: '**', component: PageNotFoundPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
