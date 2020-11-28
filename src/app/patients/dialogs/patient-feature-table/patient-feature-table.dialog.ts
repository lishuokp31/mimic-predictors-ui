import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import akiFeatures from '@aki/mapping.json';
import sepsisFeatures from '@sepsis/mapping.json';
import miFeatures from '@mi/mapping.json';
import vancomycinFeatures from '@vancomycin/mapping.json';

import { Target } from '@patients/models';
import { PatientsState } from '@patients/store';
import { filter, map } from 'rxjs/operators';
import { Feature } from '@core/types';
import { format } from '@core/utils';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private store: Store
  ) {
    const { target } = data;
    const patient = this.store.select(PatientsState.selectedPatient);

    this.x$ = patient.pipe(
      filter((patient) => patient != null && patient.probabilities != null),
      map((patient) => patient!.probabilities![target].x)
    );
    this.formattedX$ = this.x$.pipe(
      map((x) => {
        return x!.map((_, day) =>
          this.features.map((feature) =>
            format(feature.identifier, feature.group, x![day][feature.id])
          )
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

  public get weights() {
    return Array(this.days).fill(Array(this.features.length).fill(0));
  }

  public onChange(event: any) {}
}
