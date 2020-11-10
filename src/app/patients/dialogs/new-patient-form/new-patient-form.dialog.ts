import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-new-patient-form',
  styleUrls: ['./new-patient-form.dialog.scss'],
  templateUrl: './new-patient-form.dialog.html',
})
export class NewPatientFormDialog {
  public form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      ethnicity: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  public onFileSelected(event: any) {
    console.log(event);
  }

  public import() {}
}
