import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import akiFeatures from '@aki/mapping.json';
import sepsisFeatures from '@sepsis/mapping.json';
import miFeatures from '@mi/mapping.json';
import vancomycinFeatures from '@vancomycin/mapping.json';

import { wr, wg, wb } from '@core/constants';
import { Target } from '@patients/models';
import { PatientsState } from '@patients/store';
import { filter, map } from 'rxjs/operators';
import { Feature } from '@core/types';
import { format, getFeatureWeight } from '@core/utils';

export interface DialogData {
  target: Target;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-feature-table',
  styleUrls: ['./patient-feature-table.dialog.scss'],
  templateUrl: './patient-feature-table.dialog.html',
})
export class PatientFeatureTableDialog {
  public x$: Observable<(number | null)[][]>;
  public formattedX$: Observable<string[][]>;
  public weights$: Observable<object[][]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private store: Store
  ) {
    const { target } = data;
    const patient = this.store
      .select(PatientsState.selectedPatient)
      .pipe(
        filter((patient) => patient != null && patient.probabilities != null)
      );

    this.x$ = patient.pipe(map((patient) => patient!.probabilities![target].x));
    this.formattedX$ = this.x$.pipe(
      map((x) => {
        return x!.map((_, day) =>
          this.features.map((feature) =>
            format(feature.identifier, feature.group, x![day][feature.id])
          )
        );
      })
    );
    this.weights$ = patient.pipe(
      map((patient) => {
        const weights = patient!.probabilities![target].weights;

        if (!weights) {
          return Array(this.days).fill(Array(225).fill(null));
        }

        return weights.map((_, day) =>
          this.features
            .map((feature) => getFeatureWeight(feature, day, weights))
            .map((weight) => ({
              'background-color': `rgba(${wr}, ${wg}, ${wb}, ${weight})`,
            }))
        );
      })
    );
  }

  public get dialogTitle() {
    const { target } = this.data;

    switch (target) {
      case 'aki':
        return '急性肾损伤';
      case 'sepsis':
        return '脓毒症';
      case 'mi':
        return '心肌梗塞';
      case 'vancomycin':
        return '万古霉素';
    }
  }

  public get features(): Feature[] {
    const { target } = this.data;

    switch (target) {
      case 'aki':
        return akiFeatures;
      case 'sepsis':
        return sepsisFeatures;
      case 'mi':
        return miFeatures;
      case 'vancomycin':
        return vancomycinFeatures;
    }
  }

  public get days() {
    const { target } = this.data;
    return target === 'aki' ? 8 : 14;
  }

  public onChange(event: any) {}
}
