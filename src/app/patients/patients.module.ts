import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { AgGridModule } from 'ag-grid-angular';

import { PatientsMaterialModule } from '@patients/patients-material.module';
import { PatientsRoutingModule } from '@patients/patients-routing.module';
import { components } from '@patients/components';
import { containers } from '@patients/containers';
import { services } from '@patients/services';
import { resolvers } from '@patients/resolvers';
import { guards } from '@patients/guards';
import { PatientsEntitiesState, PatientsState } from '@patients/store';

@NgModule({
  declarations: [...components, ...containers],
  imports: [
    CommonModule,
    PatientsMaterialModule,
    PatientsRoutingModule,
    AgGridModule.withComponents([]),
    NgxsModule.forFeature([PatientsEntitiesState, PatientsState]),
  ],
  providers: [...services, ...guards, ...resolvers],
})
export class PatientsModule {}
