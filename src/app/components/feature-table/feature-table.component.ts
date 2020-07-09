import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { List } from 'immutable';

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
    .map((_, i) => i);

  @Input()
  public features: ModelFeature[] = [];

  @Input()
  public x: List<List<number>> | null = null;

  public formatValue(value: number | undefined) {
    if (typeof value !== 'number') {
      return value;
    }

    if (Number.isInteger(value)) {
      return value;
    }

    return Number(value).toFixed(2);
  }
}
