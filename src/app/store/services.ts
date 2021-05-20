import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginPayload , Userinfo } from '@login/models/';
import {  } from '@login/models/';

import { environment } from 'src/environments/environment';

@Injectable()
export class LoginApiService {
  constructor(private http: HttpClient) {}

  public login(payload: LoginPayload) : Promise<Userinfo>{
    console.log("登录")
    console.log('payload:' + payload);
    const url = `${environment.apiUrl}/login`;
    const formData = new FormData();
    formData.append('userName' ,payload.userName);
    formData.append('password' ,payload.password);
    // formData.append('remember' ,payload.remember);
    console.log(formData);
    return this.http.post<Userinfo>(url, formData).toPromise();
  }

}










