import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ModelFeature } from '../../data';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-feature-table',
  styleUrls: ['./feature-table.component.scss'],
  templateUrl: './feature-table.component.html',
})
export class FeatureTableComponent {
  public readonly days: number[] = Array(14)
    .fill(0)
    .map((_, i) => i + 1);

  @Input()
  public features: ModelFeature[] = [];

  @Input()
  public featureCount: number = 0;
}
