import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { AgGridModule } from 'ag-grid-angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { NerMaterialModule } from '@ner/ner-material.module';
import { NerRoutingModule } from '@ner/ner-routing.module';
import { components } from '@ner/components';
import { containers } from '@ner/containers';
import { NerState } from '@ner/store';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [...containers, ...components],
  imports: [
    CommonModule,
    SharedModule,
    NerMaterialModule,
    NerRoutingModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    NgxChartsModule,
    NgxsModule.forFeature([NerState]),
  ],
  // providers: [...services, ...guards, ...resolvers],
})
export class NerModule {}
