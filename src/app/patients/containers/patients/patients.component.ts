import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
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
  public isLoading$: Observable<boolean>;

  constructor(private router: Router, private store: Store) {
    this.patients$ = this.store.select(PatientsState.patients);
    this.isLoading$ = this.store.select(PatientsState.isLoading);
  }

  public refresh() {
    this.store.dispatch(new actions.LoadAll());
  }

  public onPatientClicked(event: Patient) {
    const { id } = event;
    this.router.navigate(['/patients', id]);
  }
}
