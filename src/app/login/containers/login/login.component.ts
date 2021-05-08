import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Userinfo } from '@login/models';
import { LoginApiService } from '@login/servers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userinfo: Userinfo = {
    login: false,
    username: '',
    email: '',
    phone: '',
    level: -1,
  };
  validateForm!: FormGroup;
  public logged: boolean = false;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const url = `${environment.apiUrl}/ner/login`;
    console.log(this.validateForm.value);
    this.http
      .post<Userinfo>(url, this.toFormData(this.validateForm))
      .subscribe((res) => {
        console.log(res);
        this.userinfo = res;
        console.log(this.userinfo);

        // 登陆成功，将用户信息记录到服务,并路由至用户中心
        if (this.userinfo.login) {
          this.LoginApi.setuserinfo(this.userinfo);
          this.router.navigateByUrl('user');
        }
      });
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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private LoginApi: LoginApiService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
}
