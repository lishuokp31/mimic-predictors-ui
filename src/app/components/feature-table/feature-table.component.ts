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

  @Input()
  public weights: List<List<number>> | null = null;

  @Input()
  public showWeights: boolean | null = false;

  public r: number = 13;
  public g: number = 71;
  public b: number = 161;
  @Input() set weightsBaseColor(value: string) {
    this.r = parseInt(value.slice(1, 3), 16);
    this.g = parseInt(value.slice(3, 5), 16);
    this.b = parseInt(value.slice(5, 7), 16);
  }

  public formatValue(value: number | undefined) {
    if (typeof value !== 'number') {
      return value;
    }

    if (Number.isInteger(value)) {
      return value;
    }

    return Number(value).toFixed(2);
  }

  public getBgColor(day: number, id: number) {
    if (!this.showWeights || !this.weights) {
      return null;
    }

    const { r, g, b } = this;
    const weight = this.weights.get(day)!.get(id);
    return {
      'background-color': `rgba(${r}, ${g}, ${b}, ${weight})`,
    };
  }
}
