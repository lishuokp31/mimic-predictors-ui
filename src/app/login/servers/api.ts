import { Injectable } from '@angular/core';
import { Userinfo } from '@login/models';

@Injectable()

export class LoginApiService {
  userinfo: Userinfo = {
    login: false,
    username: '',
    email: '',
    phone: '',
    level: -1,
  };

  logout(): void {
    this.userinfo = {
      login: false,
      username: '',
      email: '',
      phone: '',
      level: -1,
    };
  }


  constructor() {}
}
