import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Userinfo } from '@login/models';
import { LoginApiService } from '@login/servers';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  styleUrls: ['./main.component.scss'],
  templateUrl: './main.component.html',
})
export class MainComponent {
  userinfo: Userinfo = {
    login: false,
    username: '',
    email: '',
    phone: '',
    level: -1,
  };
  constructor(private LoginApi: LoginApiService) {
    this.LoginApi.userinfoEvent$.subscribe((result) => {
      this.userinfo = result;
      // console.log("main:"+result)
      // console.log("main:"+this.userinfo.login)
    })
  }




}
