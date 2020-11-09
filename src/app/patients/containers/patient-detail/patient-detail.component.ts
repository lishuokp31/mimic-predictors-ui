import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

import { Patient } from '@patients/models';
import { PatientsState } from '@patients/store';
import { nDays } from '@core/constants';
import { range } from '@core/utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-detail',
  styleUrls: ['./patient-detail.component.scss'],
  templateUrl: './patient-detail.component.html',
})
export class PatientDetailComponent {
  public patient$: Observable<Patient | null>;
  public akiProbs$: Observable<number[]>;
  public sepsisProbs$: Observable<number[]>;
  public miProbs$: Observable<number[]>;
  public vancomycinProbs$: Observable<number[]>;

  constructor(private store: Store) {
    this.patient$ = this.store.select(PatientsState.selectedPatient);
    this.akiProbs$ = of(range(8).map(() => Math.random()));
    this.sepsisProbs$ = of(range(nDays).map(() => Math.random()));
    this.miProbs$ = of(range(nDays).map(() => Math.random()));
    this.vancomycinProbs$ = of(range(nDays).map(() => Math.random()));
  }
}
