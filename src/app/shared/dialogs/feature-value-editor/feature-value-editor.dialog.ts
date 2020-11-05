import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  Feature,
  FeatureMultipleValues,
  FeatureUnaryValue,
  isUnaryValue,
} from '@core/types';
import {
  beingIdentifiers,
  existentialIdentifiers,
  genderIdentifiers,
} from '@core/constants';

export interface DialogData {
  feature: Feature;
  value: FeatureUnaryValue | FeatureMultipleValues;
}

type EditorType = 'multi' | 'being' | 'existential' | 'gender' | 'default';
const numericPattern = '[0-9]+(?:\\.[0-9]+)?';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-feature-value-editor',
  styleUrls: ['./feature-value-editor.dialog.scss'],
  templateUrl: './feature-value-editor.dialog.html',
})
export class FeatureValueEditorDialog {
  public editorType: EditorType;
  public form: FormGroup;

  public constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FeatureValueEditorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.editorType = determineEditorType(data);
    this.form = this.buildFormGroup();
  }

  private buildFormGroup(): FormGroup {
    if (isUnaryValue(this.data.value)) {
      const group = this.fb.group({
        value: [
          this.data.value.toString(),
          [Validators.required, Validators.pattern(numericPattern)],
        ],
      });

      return group;
    }

    // form group for values with aggregate values
    return this.fb.group({
      mean: [
        this.data.value.mean.toString(),
        [Validators.required, Validators.pattern(numericPattern)],
      ],
      min: [
        this.data.value.min.toString(),
        [Validators.required, Validators.pattern(numericPattern)],
      ],
      max: [
        this.data.value.max.toString(),
        [Validators.required, Validators.pattern(numericPattern)],
      ],
      std: [
        this.data.value.std.toString(),
        [Validators.required, Validators.pattern(numericPattern)],
      ],
    });
  }

  public saveValue() {
    if (this.form.valid) {
      const values = this.collectFeatureValues();
      this.dialogRef.close(values);
    }
  }

  private collectFeatureValues(): FeatureUnaryValue | FeatureMultipleValues {
    if (this.editorType == 'multi') {
      return {
        mean: +this.form.get('mean')!.value,
        min: +this.form.get('min')!.value,
        max: +this.form.get('max')!.value,
        std: +this.form.get('std')!.value,
      };
    }

    return +this.form.get('value')!.value;
  }

  // For single valued features use

  public get valueIsInvalid(): boolean {
    return this.form.get('value')!.invalid;
  }

  public get valueIsEmpty(): boolean {
    return this.form.get('value')!.hasError('required');
  }

  public get valueIsNotNumeric(): boolean {
    return this.form.get('value')!.hasError('pattern');
  }

  // For multi feature value editor use

  public get meanIsInvalid(): boolean {
    return this.form.get('mean')!.invalid;
  }

  public get meanIsEmpty(): boolean {
    return this.form.get('mean')!.hasError('required');
  }

  public get meanIsNotNumeric(): boolean {
    return this.form.get('mean')!.hasError('pattern');
  }

  public get minIsInvalid(): boolean {
    return this.form.get('min')!.invalid;
  }

  public get minIsEmpty(): boolean {
    return this.form.get('min')!.hasError('required');
  }

  public get minIsNotNumeric(): boolean {
    return this.form.get('min')!.hasError('pattern');
  }

  public get maxIsInvalid(): boolean {
    return this.form.get('max')!.invalid;
  }

  public get maxIsEmpty(): boolean {
    return this.form.get('max')!.hasError('required');
  }

  public get maxIsNotNumeric(): boolean {
    return this.form.get('max')!.hasError('pattern');
  }

  public get stdIsInvalid(): boolean {
    return this.form.get('std')!.invalid;
  }

  public get stdIsEmpty(): boolean {
    return this.form.get('std')!.hasError('required');
  }

  public get stdIsNotNumeric(): boolean {
    return this.form.get('std')!.hasError('pattern');
  }
}

function determineEditorType(data: DialogData): EditorType {
  // data with derived values (e.g., std, min, max)
  if (data.feature.aggregates) {
    return 'multi';
  }

  // data that requires to be shown as either "to be" or "to not be"
  if (beingIdentifiers.includes(data.feature.identifier)) {
    return 'being';
  }

  // data that requires to be shown as either "to have" or "to not have"
  if (existentialIdentifiers.includes(data.feature.identifier)) {
    return 'existential';
  }

  // data that requires to be shown as biological gender
  if (genderIdentifiers.includes(data.feature.identifier)) {
    return 'gender';
  }

  return 'default';
}
