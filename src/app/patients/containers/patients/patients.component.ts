import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Patient } from '@patients/models';
import * as actions from '@patients/store/actions';
import { PatientsState } from '@patients/store';
import { NewPatientFormDialog } from '@patients/dialogs';

import { Userinfo } from '@login/models';
import { LoginState } from '../../../store';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patients',
  styleUrls: ['./patients.component.scss'],
  templateUrl: './patients.component.html',
})
export class PatientsComponent {
  userinfo: Userinfo = {
    login: false,
    username: '',
    email: '',
    phone: '',
    level: -1,
  };
  public login$: Observable<boolean>;
  public username$: Observable<string>;
  public email$: Observable<string>;
  public phone$: Observable<string>;
  public level$: Observable<number>;

  public patients$: Observable<Patient[]>;
  public isLoading$: Observable<boolean>;

  // 权限信息
  public isVisible_level_modal : boolean = false;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store
  ) {
    var tmp = setInterval(() => {
      if (!this.userinfo.login) {
        this.router.navigate(['/login']);
      }
    }, 20);
    this.login$ = this.store.select(LoginState.login);
    this.username$ = this.store.select(LoginState.username);
    this.email$ = this.store.select(LoginState.email);
    this.phone$ = this.store.select(LoginState.phone);
    this.level$ = this.store.select(LoginState.level);

    this.patients$ = this.store.select(PatientsState.patients);
    this.isLoading$ = this.store.select(PatientsState.isLoading);
  }

  ngOnInit(): void {
    this.login$.subscribe((value) => {
      this.userinfo.login = value;
    });
    this.username$.subscribe((value) => {
      this.userinfo.username = value;
    });
    this.email$.subscribe((value) => {
      this.userinfo.email = value;
    });
    this.phone$.subscribe((value) => {
      this.userinfo.phone = value;
    });
    this.level$.subscribe((value) => {
      this.userinfo.level = value;
    });

    if(this.userinfo.level > 5){
      console.log("权限不足！" + this.userinfo.level)
      this.isVisible_level_modal = true;
    }
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

  handleCancel_level_modal(){
    this.isVisible_level_modal = false;
    this.router.navigate(['/user']);
  }

  handleOk_level_modal(){
    this.isVisible_level_modal = false;
    this.router.navigate(['/user']);
  }
}
