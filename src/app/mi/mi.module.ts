import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { MiRoutingModule } from '@mi/mi-routing.module';
import { components } from '@mi/components';
import { containers } from '@mi/containers';
import { MiState } from '@mi/store';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [...components, ...containers],
  imports: [
    CommonModule,
    SharedModule,
    MiRoutingModule,
    NgxsModule.forFeature([MiState]),
  ],
})
export class MiModule {}
