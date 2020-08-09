import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { AkiRoutingModule } from '@aki/aki-routing.module';
import { components } from '@aki/components';
import { containers } from '@aki/containers';
import { AkiState } from '@aki/store';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [...containers, ...components],
  imports: [
    CommonModule,
    SharedModule,
    AkiRoutingModule,
    NgxsModule.forFeature([AkiState]),
  ],
})
export class AkiModule {}
