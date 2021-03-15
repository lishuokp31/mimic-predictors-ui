import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { AgGridModule } from 'ag-grid-angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DBMaterialModule } from '@DB/DB-material.module';
import { DBRoutingModule } from '@DB/DB-routing.module';
import { components } from '@DB/components';
import { containers } from '@DB/containers';
// import { DBState } from '@DB/store';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [...containers, ...components],
  imports: [
    CommonModule,
    SharedModule,
    DBMaterialModule,
    DBRoutingModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    NgxChartsModule,
    // NgxsModule.forFeature([DBState]),
  ],
  // providers: [...services, ...guards, ...resolvers],
})
export class DBModule {}
