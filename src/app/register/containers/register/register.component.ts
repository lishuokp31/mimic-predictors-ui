import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Registerinfo } from '@register/models';
import { RegisterApiService } from '@register/servers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };
  registerinfo: Registerinfo = {
    username: '',
    password: '',
    email: '',
    phone: '',
  };
  registersucceed: number = -1;
  isVisible_failed = false;
  isVisible_successed = false;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value);
    const url = `${environment.apiUrl}/register`;
    this.http
      .post<number>(url, this.toFormData(this.validateForm))
      .subscribe((res) => {
        console.log(res);
        this.registersucceed = res;
        if (this.registersucceed == 1) {
          console.log("注册成功！")
          this.showModal_successed();
        } else if (this.registersucceed == 0) {
          console.log("注册失败！用户名重复！")
          this.showModal_failed();
        }
        else if (this.registersucceed == -1) {
          console.log("注册失败！请联系管理员！")
          this.showModal_failed();
        }
        console.log("isVisible_successed:" + this.isVisible_successed)
        console.log("isVisible_failed:" + this.isVisible_failed)
      });
  }

  onRegister(){

  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  toFormData(validateForm: FormGroup): FormData {
    const formData = new FormData();
    console.log('username:' + validateForm.value.username);
    formData.append('username', validateForm.value.username);
    console.log('password:' + validateForm.value.password);
    formData.append('password', validateForm.value.password);
    console.log('email:' + validateForm.value.email);
    formData.append('email', validateForm.value.email);
    console.log('phone:' + validateForm.value.phone);
    formData.append('phone', validateForm.value.phone);
    return formData;
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      username: [null, [Validators.required]],
      // phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      // website: [null, [Validators.required]],
      // captcha: [null, [Validators.required]],
      // agree: [false]
    });
  }

  showModal_successed(): void {
    this.isVisible_successed = true;
  }

  handleOk_successed(): void {
    this.isVisible_successed = false;
    this.router.navigateByUrl('login');
  }

  handleCancel_successed(): void {
    this.isVisible_successed = false;
    this.router.navigateByUrl('login');
  }

  showModal_failed(): void {
    this.isVisible_failed = true;
  }

  handleOk_failed(): void {
    this.isVisible_failed = false;
  }

  handleCancel_failed(): void {
    this.isVisible_failed = false;
  }
}
