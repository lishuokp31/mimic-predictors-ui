import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-metrics',
  styleUrls: ['./patient-metrics.component.scss'],
  templateUrl: './patient-metrics.component.html',
})
export class PatientMetricsComponent {}
