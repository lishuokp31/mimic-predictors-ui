import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-model-results',
  styleUrls: ['./model-results.component.scss'],
  templateUrl: './model-results.component.html',
})
export class ModelResultsComponent {
  public readonly yAxisTicks = [0.0, 0.2, 0.4, 0.6, 0.8, 1.0];
  public readonly colorScheme = { domain: ['#FF6485'] };

  @Input()
  public label: string = 'Prediction Results';

  @Input()
  public showResults: boolean = false;

  public data: any[] = [];
  @Input() set probabilities(value: number[]) {
    this.data = [
      {
        name: this.label,
        series: value.map((x, i) => ({ name: (i + 1).toString(), value: x })),
      },
    ];
  }
}
