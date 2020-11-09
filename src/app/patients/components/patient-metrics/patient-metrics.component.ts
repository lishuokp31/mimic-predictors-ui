import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface PatientMetric {
  label: string;
  unit: string;
  mean: number;
  min: number;
  max: number;
  std: number;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-metrics',
  styleUrls: ['./patient-metrics.component.scss'],
  templateUrl: './patient-metrics.component.html',
})
export class PatientMetricsComponent {
  public _metrics: PatientMetric[] = [];

  @Input()
  public set metrics(value: PatientMetric[] | null) {
    if (value == null || value.length < 1 || value.length > 3) {
      throw `Only 1-3 metrics are supported per card.`;
    }

    this._metrics = value;
  }
}
