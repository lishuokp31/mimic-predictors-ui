import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from '@user/containers';

import {AkiComponent } from '@aki/containers'
import { MiComponent} from '@mi/containers'
import { SepsisComponent} from '@sepsis/containers'
import { VancomycinComponent} from '@vancomycin/containers'

import{FavoritesResolver} from '@user/resolvers'

const routes: Routes = [{ path: '', component: UserComponent,
resolve: { favorites: FavoritesResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
