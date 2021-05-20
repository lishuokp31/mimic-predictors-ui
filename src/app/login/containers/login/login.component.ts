import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Userinfo, LoginPayload } from '@login/models';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoginState } from '../../../store';
import * as actions from '../../../store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() getUserinfo = new EventEmitter<Userinfo>();

  public login$: Observable<boolean>;
  public username$: Observable<string>;
  public email$: Observable<string>;
  public phone$: Observable<string>;
  public level$: Observable<number>;

  userinfo: Userinfo = {
    login: false,
    username: '',
    email: '',
    phone: '',
    level: -1,
  };
  validateForm!: FormGroup;
  public autojump: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    var tmp = setInterval(() => {
      if(this.userinfo.login && !this.autojump){
        this.router.navigate(['/user'])
        this.autojump = true
      }
    } , 20)
    this.login$ = this.store.select(LoginState.login);
    this.username$ = this.store.select(LoginState.username);
    this.email$ = this.store.select(LoginState.email);
    this.phone$ = this.store.select(LoginState.phone);
    this.level$ = this.store.select(LoginState.level);
  }

  public onGetUserinfo(userinfo: Userinfo) {
    this.getUserinfo.emit(userinfo);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm.value);

    const outData: LoginPayload = {
      userName: this.validateForm.value.userName,
      password: this.validateForm.value.password,
      // remember: this.validateForm.value.remember,
    };

    const action = new actions.loginAction(outData);
    this.store.dispatch(action);
  }

  toFormData(validateForm: FormGroup): FormData {
    const formData = new FormData();
    console.log('userName:' + validateForm.value.userName);
    formData.append('userName', validateForm.value.userName);
    console.log('password:' + validateForm.value.password);
    formData.append('password', validateForm.value.password);
    console.log('remember:' + validateForm.value.remember);
    formData.append('remember', validateForm.value.remember);
    return formData;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });

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
  }
}
