import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { PatientsRoutingModule } from '@patients/patients-routing.module';
import { components } from '@patients/components';
import { containers } from '@patients/containers';
import { services } from '@patients/services';
import { PatientsEntitiesState, PatientsState } from '@patients/store';

import { SharedModule } from '@shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [...components, ...containers],
  imports: [
    CommonModule,
    SharedModule,
    PatientsRoutingModule,
    AgGridModule.withComponents([]),
    NgxsModule.forFeature([PatientsEntitiesState, PatientsState]),
  ],
  providers: [...services],
})
export class PatientsModule {}
