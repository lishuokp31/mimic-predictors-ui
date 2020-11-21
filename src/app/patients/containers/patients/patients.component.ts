import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Patient } from '@patients/models';
import * as actions from '@patients/store/actions';
import { PatientsState } from '@patients/store';
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
    private store: Store
  ) {
    this.patients$ = this.store.select(PatientsState.patients);
    this.isLoading$ = this.store.select(PatientsState.isLoading);
  }

  public refresh() {
    this.store.dispatch(new actions.LoadAll());
  }

  public importPatient() {
    const config = new MatDialogConfig();
    config.width = '600px';

    const dialogRef = this.dialog.open(NewPatientFormDialog, config);
    dialogRef.afterClosed().subscribe((result) => {
      // closing the dialog by clicking outside its area will yield an undefined result
      // clicking the cancel button yields an empty string as a result
      // we only process a result with a valid value
      if (result !== undefined && result !== '') {
        const action = new actions.ImportPatientAction(result);
        this.store.dispatch(action);
      }
    });
  }

  public onPatientClicked(event: Patient) {
    const { id } = event;
    this.router.navigate(['/patients', id]);
  }
}
