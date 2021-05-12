import { Component } from '@angular/core';
import { Userinfo } from '@core/models';
@Component({
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.component.scss'],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public isCollapsed : boolean = false;
  public theme : boolean = true;
  userinfo: Userinfo = {
    login: false,
    username: '',
    email: '',
    phone: '',
    level: -1,
  };

  constructor() {}

  getUserinfo(userinfo: Userinfo){
      this.userinfo = userinfo;
      console.log(this.userinfo);
  }


}

