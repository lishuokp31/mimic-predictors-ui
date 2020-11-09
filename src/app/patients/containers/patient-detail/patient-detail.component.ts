import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

import { Patient } from '@patients/models';
import { PatientsState } from '@patients/store';
import { nDays } from '@core/constants';
import { range } from '@core/utils';
import { PatientMetric } from '@patients/components';

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
  public tempRespRateMetrics$: Observable<PatientMetric[]>;
  public bpHeartRateMetrics$: Observable<PatientMetric[]>;

  constructor(private store: Store) {
    this.patient$ = this.store.select(PatientsState.selectedPatient);

    // init prob values for a quick overview of predictions
    this.akiProbs$ = of(range(8).map(() => Math.random()));
    this.sepsisProbs$ = of(range(nDays).map(() => Math.random()));
    this.miProbs$ = of(range(nDays).map(() => Math.random()));
    this.vancomycinProbs$ = of(range(nDays).map(() => Math.random()));

    // init vital metrics for a quick overview of patient's situation
    this.tempRespRateMetrics$ = of([
      { label: '体温', unit: '℃', mean: 36.2, min: 35.8, max: 37.3, std: 0.63 },
      { label: '心率', unit: 'bpm', mean: 63, min: 60, max: 70, std: 4.19 },
    ]);
    this.bpHeartRateMetrics$ = of([
      {
        label: '收缩压',
        unit: 'mmHg',
        mean: 120,
        min: 112,
        max: 130,
        std: 7.36,
      },
      { label: '舒张压', unit: 'mmHg', mean: 80, min: 79, max: 94, std: 6.85 },
    ]);
  }
}
