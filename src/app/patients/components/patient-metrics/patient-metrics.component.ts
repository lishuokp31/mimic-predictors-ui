import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PatientMetric } from '@patients/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-metrics',
  styleUrls: ['./patient-metrics.component.scss'],
  templateUrl: './patient-metrics.component.html',
})
export class PatientMetricsComponent {
  public _metrics: PatientMetric[] = [];

  @Input()
  public isLoading: boolean | null = true;

  @Input()
  public set metrics(value: PatientMetric[] | null) {
    // ignore invalid values
    if (value == null || value.length == 0) {
      return;
    }

    // metrics card only supports displaying up to 2 metrics per card
    if (value.length > 2) {
      throw `Only 1-2 metrics are supported per card.`;
    }

    this._metrics = value;
  }
}
