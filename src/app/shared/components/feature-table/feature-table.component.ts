import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { nDays } from '@core/constants';

import {
  Feature,
  FeatureMultipleValues,
  FeatureUnaryValue,
  isFeatureValueEqual,
} from '@core/types';
import { range } from '@core/utils';
import { FeatureValueEditorDialog, DialogData } from '@shared/dialogs';

export interface FeatureValueChangeEvent {
  feature: Feature;
  day: number;
  newValue: FeatureUnaryValue | FeatureMultipleValues;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-feature-table',
  styleUrls: ['./feature-table.component.scss'],
  templateUrl: './feature-table.component.html',
})
export class FeatureTableComponent {
  @Input() features: Feature[] | null = null;

  @Input() x: (number | null)[][] | null = null;

  @Input() formattedX: string[][] | null = null;

  @Input() weights: object[][] | null = null;

  public _days = range(nDays);
  @Input() set days(value: number | undefined) {
    if (value === undefined) {
      value = nDays;
    }

    this._days = range(value);
  }

  @Output() change = new EventEmitter<FeatureValueChangeEvent>();

  public constructor(public dialog: MatDialog) {}

  public showFeatureValueEditor(feature: Feature, day: number) {
    // initialize data for the dialog
    const value = this.collateFeatureValue(feature, day);
    const data: DialogData = { feature, value };

    // initialize config for the dialog
    const config = new MatDialogConfig();
    config.data = data;
    config.width = '400px';

    const dialogRef = this.dialog.open(FeatureValueEditorDialog, config);
    dialogRef.afterClosed().subscribe((result) => {
      // closing the dialog by clicking outside its area will yield an undefined result
      // clicking the cancel button yields an empty string as a result
      // we only process a result with a valid value
      if (result !== undefined && result !== '') {
        // dispatch a change event if and only if the new value
        // actually changed (that is, different from the previous value)
        if (!isFeatureValueEqual(value, result)) {
          this.change.emit({ feature, day, newValue: result });
        }
      }
    });
  }

  private collateFeatureValue(
    feature: Feature,
    day: number
  ): FeatureUnaryValue | FeatureMultipleValues {
    if (feature.aggregates !== null) {
      return {
        mean: this.x![day][feature.id]!,
        min: this.x![day][feature.aggregates.min]!,
        max: this.x![day][feature.aggregates.max]!,
        std: this.x![day][feature.aggregates.std]!,
      };
    }

    return this.x![day][feature.id]!;
  }
}
