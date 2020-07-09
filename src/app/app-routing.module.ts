import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiPage, SepsisPage, VancomycinPage, PageNotFoundPage } from './pages';

const routes: Routes = [
    { path: 'mi', component: MiPage },
    { path: 'sepsis', component: SepsisPage },
    { path: 'vancomycin', component: VancomycinPage },
    { path: '', redirectTo: '/sepsis', pathMatch: 'full' },
    { path: '**', component: PageNotFoundPage },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
