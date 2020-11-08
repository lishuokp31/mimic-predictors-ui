import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Patient } from '@patients/models';
import * as actions from '@patients/store/actions';
import { PatientsState } from '@patients/store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patients',
  styleUrls: ['./patients.component.scss'],
  templateUrl: './patients.component.html',
})
export class PatientsComponent {
  public patients$: Observable<Patient[]>;

  constructor(private store: Store) {
    this.patients$ = this.store.select(PatientsState.patients);
  }

  public loadAll() {
    this.store.dispatch(new actions.LoadAll());
  }
}
