import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { SepsisRoutingModule } from '@sepsis/sepsis-routing.module';
import { components } from '@sepsis/components';
import { containers } from '@sepsis/containers';
import { SepsisState } from '@sepsis/store';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [...components, ...containers],
  imports: [
    CommonModule,
    SharedModule,
    SepsisRoutingModule,
    NgxsModule.forFeature([SepsisState]),
  ],
})
export class SepsisModule {}
