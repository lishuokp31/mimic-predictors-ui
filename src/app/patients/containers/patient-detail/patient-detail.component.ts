import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Patient, PatientMetric, PatientProbabilities } from '@patients/models';
import { PatientsState } from '@patients/store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-detail',
  styleUrls: ['./patient-detail.component.scss'],
  templateUrl: './patient-detail.component.html',
})
export class PatientDetailComponent {
  public patient$: Observable<Patient | null>;
  public isLoading$: Observable<boolean>;
  public metrics$: Observable<PatientMetric[]>;
  public metrics1$: Observable<PatientMetric[]>;
  public metrics2$: Observable<PatientMetric[]>;
  public probabilities$: Observable<PatientProbabilities>;

  constructor(private store: Store) {
    this.patient$ = this.store.select(PatientsState.selectedPatient);
    this.isLoading$ = this.patient$.pipe(
      map(
        (patient) =>
          patient !== null &&
          (!('metrics' in (patient as Patient)) ||
            !('probabilities' in (patient as Patient)))
      )
    );
    this.metrics$ = combineLatest([this.patient$, this.isLoading$]).pipe(
      filter(([_, isLoading]) => !isLoading),
      map(([patient, _]) => patient!.metrics!)
    );
    this.metrics1$ = this.metrics$.pipe(map((metrics) => metrics.slice(0, 2)));
    this.metrics2$ = this.metrics$.pipe(map((metrics) => metrics.slice(2, 4)));
    this.probabilities$ = combineLatest([this.patient$, this.isLoading$]).pipe(
      filter(([_, isLoading]) => !isLoading),
      map(([patient, _]) => patient!.probabilities!)
    );
  }
}
