import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngxs/store';

import { Patient } from '@patients/models';
import * as actions from '@patients/store/actions';

@Injectable()
export class PatientsResolver implements Resolve<Patient[]> {
  constructor(private store: Store) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Patient[] {
    this.store.dispatch(new actions.LoadAll());
    return [];
  }
}
