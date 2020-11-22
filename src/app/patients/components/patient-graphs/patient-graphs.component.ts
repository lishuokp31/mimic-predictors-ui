import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { curveMonotoneX } from 'd3-shape';

import { PatientProbabilities } from '@patients/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-graphs',
  styleUrls: ['./patient-graphs.component.scss'],
  templateUrl: './patient-graphs.component.html',
})
export class PatientGraphsComponent implements OnChanges {
  public readonly yAxisTicks = [0.0, 0.2, 0.4, 0.6, 0.8, 1.0];
  public readonly colorScheme = {
    domain: ['#FF6485', '#2196F3', '#AFB42B', '#FF9800'],
  };
  public readonly referenceLines = [{ name: '阳性', value: 0.5 }];
  public readonly curve = curveMonotoneX;

  @Input()
  public isLoading: boolean | null = false;

  @Input()
  public probs: PatientProbabilities | null = null;

  public data: any[] = [];

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.probs && changes.probs.currentValue) {
      const probs = changes.probs.currentValue as PatientProbabilities;
      console.log(probs);
      const { aki, sepsis, mi, vancomycin } = probs;

      this.data = [
        {
          name: '急性肾损伤',
          series: aki.map((x, i) => ({ name: (i + 1).toString(), value: x })),
        },
        {
          name: '脓毒症',
          series: sepsis.map((x, i) => ({
            name: (i + 1).toString(),
            value: x,
          })),
        },
        {
          name: '心肌梗塞',
          series: mi.map((x, i) => ({ name: (i + 1).toString(), value: x })),
        },
        {
          name: '万古霉素',
          series: vancomycin.map((x, i) => ({
            name: (i + 1).toString(),
            value: x,
          })),
        },
      ];
    }
  }
}
