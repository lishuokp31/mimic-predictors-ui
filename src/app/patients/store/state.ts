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

  @Action(actions.LoadAll)
  public async loadAll({ patchState }: StateContext<PatientsStateModel>) {
    patchState({ isLoading: true });

    const patients = await this.api.loadAll();
    this.patientsEntities.setAll(patients);

    patchState({ isLoading: false });
  }
}
