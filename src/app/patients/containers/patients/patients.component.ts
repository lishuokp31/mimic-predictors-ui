import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Patient } from '@patients/models';
import * as actions from '@patients/store/actions';
import { PatientsState } from '@patients/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewPatientFormDialog } from '@patients/dialogs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patients',
  styleUrls: ['./patients.component.scss'],
  templateUrl: './patients.component.html',
})
export class PatientsComponent {
  public patients$: Observable<Patient[]>;
  public isLoading$: Observable<boolean>;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
  ) {
    this.patients$ = this.store.select(PatientsState.patients);
    this.isLoading$ = this.store.select(PatientsState.isLoading);
  }

  public refresh() {
    this.store.dispatch(new actions.LoadAll());
  }

  public importPatient() {
    // initialize config for the dialog
    const config = new MatDialogConfig();
    config.data = undefined;
    config.width = '600px';

    const dialogRef = this.dialog.open(NewPatientFormDialog, config);
    dialogRef.afterClosed().subscribe(console.log);
  }

  public onPatientClicked(event: Patient) {
    const { id } = event;
    this.router.navigate(['/patients', id]);
  }
}
