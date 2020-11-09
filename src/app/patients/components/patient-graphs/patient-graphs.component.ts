import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { curveMonotoneX } from 'd3-shape';
import produce from 'immer';

import { nDays } from '@core/constants';
import { zeros1d } from '@core/utils';

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
  public akiProbs: number[] | null = zeros1d(nDays);

  @Input()
  public sepsisProbs: number[] | null = zeros1d(nDays);

  @Input()
  public miProbs: number[] | null = zeros1d(nDays);

  @Input()
  public vancomycinProbs: number[] | null = zeros1d(nDays);

  public data: any[] = [
    {
      name: '急性肾损伤',
      series: zeros1d(nDays).map((x, i) => ({
        name: (i + 1).toString(),
        value: x,
      })),
    },
    {
      name: '脓毒症',
      series: zeros1d(nDays).map((x, i) => ({
        name: (i + 1).toString(),
        value: x,
      })),
    },
    {
      name: '心肌梗塞',
      series: zeros1d(nDays).map((x, i) => ({
        name: (i + 1).toString(),
        value: x,
      })),
    },
    {
      name: '万古霉素',
      series: zeros1d(nDays).map((x, i) => ({
        name: (i + 1).toString(),
        value: x,
      })),
    },
  ];

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.akiProbs) {
      this.data = produce(this.data, (draft) => {
        draft[0].series = changes.akiProbs.currentValue.map(
          (x: number, i: number) => ({
            name: (i + 1).toString(),
            value: x,
          })
        );
      });
    }

    if (changes.sepsisProbs) {
      this.data = produce(this.data, (draft) => {
        draft[1].series = changes.sepsisProbs.currentValue.map(
          (x: number, i: number) => ({
            name: (i + 1).toString(),
            value: x,
          })
        );
      });
    }

    if (changes.miProbs) {
      this.data = produce(this.data, (draft) => {
        draft[2].series = changes.miProbs.currentValue.map(
          (x: number, i: number) => ({
            name: (i + 1).toString(),
            value: x,
          })
        );
      });
    }

    if (changes.vancomycinProbs) {
      this.data = produce(this.data, (draft) => {
        draft[3].series = changes.vancomycinProbs.currentValue.map(
          (x: number, i: number) => ({
            name: (i + 1).toString(),
            value: x,
          })
        );
      });
    }
  }
}
