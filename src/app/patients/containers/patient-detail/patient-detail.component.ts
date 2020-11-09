import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Patient } from '@patients/models';
import { PatientsState } from '@patients/store';
import { Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-detail',
  styleUrls: ['./patient-detail.component.scss'],
  templateUrl: './patient-detail.component.html',
})
export class PatientDetailComponent {
  public patient$: Observable<Patient | null>;

  constructor(private store: Store) {
    this.patient$ = this.store.select(PatientsState.selectedPatient);
  }
}
