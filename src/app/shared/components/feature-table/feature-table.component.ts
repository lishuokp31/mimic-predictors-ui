import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Feature } from '@core/types';
import { FeatureValueEditorDialog, DialogData } from '@shared/dialogs';

export interface FeatureValueChangeEvent {
  feature: Feature;
  day: number;
  newValue: number;
}

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

  @Input() features: Feature[] | null = null;

  @Input() x: number[][] | null = null;

  @Input() formattedX: string[][] | null = null;

  @Input() weights: object[][] | null = null;

  @Output() change = new EventEmitter<FeatureValueChangeEvent>();

  public constructor(public dialog: MatDialog) {}

  public showFeatureValueEditor(feature: Feature, day: number) {
    const data: DialogData = {
      label: feature.label,
      value: this.x![day][feature.id],
      unit: feature.unit,
    };

    const config = new MatDialogConfig();
    config.data = data;
    config.width = '400px';

    const dialogRef = this.dialog.open(FeatureValueEditorDialog, config);
    dialogRef.afterClosed().subscribe((result) => {
      // closing the dialog by clicking outside its area will yield an undefined result
      // clicking the cancel button yields an empty string as a result
      // we only process a result with a valid value
      if (result !== undefined && result !== '') {
        this.change.emit({ feature, day, newValue: result });
      }
    });
  }
}
