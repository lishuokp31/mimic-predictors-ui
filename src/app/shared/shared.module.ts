import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {FormsModule} from '@angular/forms';

import { SharedMaterialModule } from '@shared/shared-material.module';
import { components } from '@shared/components';
import { dialogs } from '@shared/dialogs';
import { pipes } from '@shared/pipes';

import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    NgxChartsModule,
    FormsModule,
    NzPopconfirmModule,
    NzGridModule,
  ],
  declarations: [...components, ...dialogs, ...pipes],
  exports: [CommonModule, ...components],
})
export class SharedModule {}
