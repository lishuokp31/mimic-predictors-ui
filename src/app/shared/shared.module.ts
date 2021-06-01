import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';

import { SharedMaterialModule } from '@shared/shared-material.module';
import { components } from '@shared/components';
import { dialogs } from '@shared/dialogs';
import { pipes } from '@shared/pipes';
import { AgGridModule } from 'ag-grid-angular';
import { SimilaritiesEntitiesState , SimilaritiesState } from '@shared/store';
import { services } from '@shared/services';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [...components, ...dialogs, ...pipes],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    NgxChartsModule,
    FormsModule,
    NzModalModule,
    NzGridModule,
    AgGridModule.withComponents([]),
    NgxsModule.forFeature([SimilaritiesEntitiesState,SimilaritiesState]),
  ],
  exports: [CommonModule, ...components],
  providers: [...services],
})
export class SharedModule {}
