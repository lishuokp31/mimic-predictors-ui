import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { UserRoutingModule } from '@user/user-routing.module';
import { components } from '@user/components';
import { containers } from '@user/containers';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AgGridModule } from 'ag-grid-angular';

import { FavoritesEntitiesState, FavoritesState } from '@user/store';
import { services } from '@user/services';
import { resolvers } from '@user/resolvers';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [...containers, ...components],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzCardModule,
    NzGridModule,
    NzModalModule,
    NzInputModule,
    FormsModule,
    AgGridModule.withComponents([]),
    NgxsModule.forFeature([FavoritesEntitiesState, FavoritesState]),
  ],
  providers: [...services , ...resolvers],
})
export class UserModule {}
