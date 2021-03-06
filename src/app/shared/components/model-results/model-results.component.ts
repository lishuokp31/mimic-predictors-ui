import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { curveMonotoneX } from 'd3-shape';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-model-results',
  styleUrls: ['./model-results.component.scss'],
  templateUrl: './model-results.component.html',
})
export class ModelResultsComponent {
  public readonly yAxisTicks = [0.0, 0.2, 0.4, 0.6, 0.8, 1.0];
  public readonly colorScheme = { domain: ['#FF6485'] };
  public readonly referenceLines = [{ name: '阳性', value: 0.5 }];
  public readonly curve = curveMonotoneX;

  @Input()
  public label: string = 'Prediction Results';

  @Input()
  public showResults: boolean | null = false;

  public data: any[] = [];
  @Input() set probabilities(value: number[] | null) {
    if (value) {
      this.data = [
        {
          name: this.label,
          series: value.map((x, i) => ({ name: (i + 1).toString(), value: x })),
        },
      ];
    }
  }
}
