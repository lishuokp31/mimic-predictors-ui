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
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  declarations: [...containers, ...components , ...dialogs, ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    AkiRoutingModule,
    NzDrawerModule,
    NzModalModule,
    NzCheckboxModule,
    FormsModule,
    NzInputModule,
    NzSelectModule,
    // AKIMaterialModule,
    NzGridModule,
    NzPopconfirmModule,
    NgxsModule.forFeature([AkiState]),
  ],
})
export class AkiModule {}
