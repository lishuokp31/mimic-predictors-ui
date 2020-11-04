import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  label: string;
  value: number;
  unit: string | null;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-feature-value-editor',
  styleUrls: ['./feature-value-editor.dialog.scss'],
  templateUrl: './feature-value-editor.dialog.html',
})
export class FeatureValueEditorDialog {
  public form = this.fb.group({
    featureValue: [
      '',
      [Validators.required, Validators.pattern('[0-9]+(?:\\.[0-9]+)?')],
    ],
  });

  public constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FeatureValueEditorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form.patchValue({ featureValue: data.value.toString() });
  }

  public saveValue() {
    if (this.form.valid) {
      const value = +this.form.value.featureValue;
      this.dialogRef.close(value);
    }
  }

  public get featureValueIsInvalid(): boolean {
    return this.form.get('featureValue')!.invalid;
  }

  public get featureValueIsEmpty(): boolean {
    return this.form.get('featureValue')!.hasError('required');
  }

  public get featureValueIsNotNumeric(): boolean {
    return this.form.get('featureValue')!.hasError('pattern');
  }
}
