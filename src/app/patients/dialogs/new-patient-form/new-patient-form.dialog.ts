import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { Ethnicity, ImportPatientPayload } from '@patients/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-new-patient-form',
  styleUrls: ['./new-patient-form.dialog.scss'],
  templateUrl: './new-patient-form.dialog.html',
})
export class NewPatientFormDialog {
  public readonly ethnicities = Object.keys(Ethnicity);
  public readonly fileInputHint = '请选择导入文件 (*.csv)';

  public form: FormGroup;
  public currentSelectedFilename: string | null = null;
  public currentSelectedFile: File | null = null;

  constructor(
    private dialogRef: MatDialogRef<NewPatientFormDialog>,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      ethnicity: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  public onFileSelectedChanged(event: any) {
    const selectedFiles: FileList = event.target.files;

    if (selectedFiles.length > 0) {
      this.currentSelectedFile = selectedFiles[0];
      this.currentSelectedFilename = selectedFiles[0].name;
    } else {
      this.currentSelectedFile = null;
      this.currentSelectedFilename = null;
    }
  }

  public import() {
    if (this.form.valid && this.currentSelectedFile) {
      const { id, name, age, ethnicity, gender } = this.form.value;
      const importfile = this.currentSelectedFile;
      const outData: ImportPatientPayload = {
        id,
        name,
        age,
        ethnicity,
        gender,
        weight: 0,
        height: 0,
        importfile,
      };

      this.dialogRef.close(outData);
    }
  }
}
