import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { MiRoutingModule } from '@mi/mi-routing.module';
import { components } from '@mi/components';
import { containers } from '@mi/containers';
import { MiState } from '@mi/store';
import { SharedModule } from '@shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  declarations: [...components, ...containers],
  imports: [
    CommonModule,
    SharedModule,
    MiRoutingModule,
    NzModalModule,
    MatDialogModule,
    NzDrawerModule,
    NzModalModule,
    NzCheckboxModule,
    FormsModule,
    NzInputModule,
    NzSelectModule,
    NzGridModule,
    NzPopconfirmModule,
    NgxsModule.forFeature([MiState]),
  ],
})
export class MiModule {}
