import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { SepsisRoutingModule } from '@sepsis/sepsis-routing.module';
import { components } from '@sepsis/components';
import { containers } from '@sepsis/containers';
import { SepsisState } from '@sepsis/store';
import { SharedModule } from '@shared/shared.module';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [...components, ...containers],
  imports: [
    CommonModule,
    SharedModule,
    SepsisRoutingModule,
    NzModalModule,
    NgxsModule.forFeature([SepsisState]),
  ],
})
export class SepsisModule {}
