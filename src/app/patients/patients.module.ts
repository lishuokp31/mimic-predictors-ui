import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { AgGridModule } from 'ag-grid-angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { PatientsMaterialModule } from '@patients/patients-material.module';
import { PatientsRoutingModule } from '@patients/patients-routing.module';
import { components } from '@patients/components';
import { containers } from '@patients/containers';
import { dialogs } from '@patients/dialogs';
import { services } from '@patients/services';
import { resolvers } from '@patients/resolvers';
import { guards } from '@patients/guards';
import { pipes } from '@patients/pipes';
import { PatientsEntitiesState, PatientsState } from '@patients/store';
import { SharedModule } from '@shared/shared.module';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [...components, ...containers, ...dialogs, ...pipes],
  imports: [
    CommonModule,
    SharedModule,
    PatientsMaterialModule,
    PatientsRoutingModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    NgxChartsModule,
    NzModalModule,
    NgxsModule.forFeature([PatientsEntitiesState, PatientsState]),
  ],
  providers: [...services, ...guards, ...resolvers],
})
export class PatientsModule {}
