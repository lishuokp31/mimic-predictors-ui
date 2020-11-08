import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Patient } from '@patients/models';
import { PatientsApiService } from '@patients/services';
import * as actions from '@patients/store/actions';
import { PatientsStateModel } from '@patients/store/types';

@State<PatientsStateModel>({
  name: 'patients',
  defaults: {
    isLoading: false,
    patients: [],
  },
})
@Injectable()
export class PatientsState {
  constructor(private api: PatientsApiService) {}

  @Selector()
  public static patients(state: PatientsStateModel): Patient[] {
    return state.patients;
  }

  @Action(actions.LoadAll)
  public async loadAll({ patchState }: StateContext<PatientsStateModel>) {
    patchState({ isLoading: true });

    const patients = await this.api.loadAll();
    patchState({ isLoading: false, patients });
  }
}
