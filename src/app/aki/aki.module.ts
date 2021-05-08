import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { AkiRoutingModule } from '@aki/aki-routing.module';
import { components } from '@aki/components';
import { containers } from '@aki/containers';
import { AkiState } from '@aki/store';
import { dialogs } from '@aki/dialogs';
import { SharedModule } from '@shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
// import { AKIMaterialModule } from '@aki/aki-material.module';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@NgModule({
  declarations: [...containers, ...components , ...dialogs, ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    AkiRoutingModule,
    NzDrawerModule,
    // AKIMaterialModule,
    NgxsModule.forFeature([AkiState]),
  ],
})
export class AkiModule {}
