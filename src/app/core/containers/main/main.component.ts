import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Userinfo } from '@login/models';
// import { LoginApiService } from '@login/servers';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  styleUrls: ['./main.component.scss'],
  templateUrl: './main.component.html',
})
export class MainComponent {
  // userinfo: Userinfo = this.LoginApi.userinfo;
  // constructor(private LoginApi: LoginApiService) {}
}
