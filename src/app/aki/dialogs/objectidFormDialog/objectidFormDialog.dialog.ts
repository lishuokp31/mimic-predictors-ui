import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { LoadSpecifiedSamplePayload } from '@aki/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-objectidFormDialog',
  styleUrls: ['./objectidFormDialog.dialog.scss'],
  templateUrl: './objectidFormDialog.dialog.html',
})
export class ObjectIdFormDialog {
  public form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ObjectIdFormDialog>,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      objectid: ['', [Validators.required]],
    });
  }

  public import() {
    if (this.form.valid) {
      const { objectid } = this.form.value;
      const outData: LoadSpecifiedSamplePayload = {
        objectid,
      };
      this.dialogRef.close(outData);
    }
  }
}
