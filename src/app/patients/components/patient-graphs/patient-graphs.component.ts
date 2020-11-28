import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { curveMonotoneX } from 'd3-shape';

import { PatientProbabilities, Target } from '@patients/models';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PatientFeatureTableDialog, DialogData } from '@patients/dialogs';
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
  public isLoading: boolean | null = false;

  @Input()
  public probs: PatientProbabilities | null = null;

  public data: any[] = [];
  public nMissingAki = 0;
  public nMissingSepsis = 0;
  public nMissingMi = 0;
  public nMissingVancomycin = 0;

  constructor(private dialog: MatDialog) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.probs && changes.probs.currentValue) {
      const probs = changes.probs.currentValue as PatientProbabilities;
      const { aki, sepsis, mi, vancomycin } = probs;

      this.nMissingAki = aki.nMissingFeatures;
      this.nMissingSepsis = sepsis.nMissingFeatures;
      this.nMissingMi = mi.nMissingFeatures;
      this.nMissingVancomycin = vancomycin.nMissingFeatures;

      // construct graph data
      this.data = [
        {
          name: '急性肾损伤',
          series: (aki.predictions ?? zeros1d(8)).map((x, i) => ({
            name: (i + 1).toString(),
            value: x,
          })),
        },
        {
          name: '脓毒症',
          series: (sepsis.predictions ?? zeros1d(14)).map((x, i) => ({
            name: (i + 1).toString(),
            value: x,
          })),
        },
        {
          name: '心肌梗塞',
          series: (mi.predictions ?? zeros1d(14)).map((x, i) => ({
            name: (i + 1).toString(),
            value: x,
          })),
        },
        {
          name: '万古霉素',
          series: (vancomycin.predictions ?? zeros1d(14)).map((x, i) => ({
            name: (i + 1).toString(),
            value: x,
          })),
        },
      ];
    }
  }

  public showFeatureTable(target: Target) {
    const data: DialogData = { target };
    const config = new MatDialogConfig();
    config.data = data;

    this.dialog.open(PatientFeatureTableDialog, config);
  }
}
