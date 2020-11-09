import { Injectable } from '@angular/core';
import {
  createEntityCollections,
  EntityDictionary,
} from '@angular-ru/common/entity';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataEntityCollectionsRepository } from '@ngxs-labs/data/repositories';

import { Patient } from '@patients/models';
import * as actions from '@patients/store/actions';
import { PatientsStateModel } from '@patients/store/types';
import { PatientsApiService } from '@patients/services';

@StateRepository()
@State({
  name: 'patientsEntities',
  defaults: createEntityCollections(),
})
@Injectable()
export class PatientsEntitiesState extends NgxsDataEntityCollectionsRepository<
  Patient,
  string
> {
  public primaryKey: string = 'id';
}

@State<PatientsStateModel>({
  name: 'patients',
  defaults: {
    isLoading: false,
    selectedPatientId: null,
  },
})
@Injectable()
export class PatientsState {
  constructor(
    private api: PatientsApiService,
    private patientsEntities: PatientsEntitiesState
  ) {}

  @Selector([PatientsState])
  public static isLoading(state: PatientsStateModel) {
    return state.isLoading;
  }

  @Selector([PatientsEntitiesState])
  public static patientsCollection(
    state: PatientsEntitiesState
  ): EntityDictionary<string, Patient> {
    return state.entities;
  }

  @Selector([PatientsState.patientsCollection])
  public static patients(
    patientsCollection: EntityDictionary<string, Patient>
  ): Patient[] {
    return Object.values(patientsCollection);
  }

  @Selector([PatientsState])
  private static selectedPatientId(state: PatientsStateModel): string | null {
    return state.selectedPatientId;
  }

  @Selector([PatientsState.selectedPatientId, PatientsState.patientsCollection])
  public static selectedPatient(
    selectedPatientId: string | null,
    patients: EntityDictionary<string, Patient>
  ): Patient | null {
    return selectedPatientId ? patients[selectedPatientId] : null;
  }

  @Action(actions.LoadAll)
  public async loadAll({ patchState }: StateContext<PatientsStateModel>) {
    patchState({ isLoading: true });

    const patients = await this.api.loadAll().toPromise();
    this.patientsEntities.setAll(patients);

    patchState({ isLoading: false });
  }

  @Action(actions.PatientLoadedAction)
  public patientLoaded(
    {}: StateContext<PatientsStateModel>,
    { patient }: actions.PatientLoadedAction
  ) {
    this.patientsEntities.addOne(patient);
  }

  @Action(actions.SelectedPatientChangedAction)
  public selectedPatientChanged(
    { patchState }: StateContext<PatientsStateModel>,
    { id }: actions.SelectedPatientChangedAction
  ) {
    patchState({ selectedPatientId: id });
  }
}
