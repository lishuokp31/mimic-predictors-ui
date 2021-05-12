import { Component } from '@angular/core';
import { Userinfo } from '@login/models';
import { LoginApiService } from '@login/servers';
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

  constructor(private LoginApi: LoginApiService) {}

  ngOnInit() {
    this.LoginApi.userinfoEvent$.subscribe((result) => {
      this.userinfo = result;
      console.log(result)
      console.log(this.userinfo)
    })
  }

  showuserinfo(){
    this.LoginApi.userinfoEvent$.subscribe((result) => {
      this.userinfo = result;
      console.log(result)
      console.log(this.userinfo)
    })
  }

  getUserinfo(userinfo: Userinfo){
      this.userinfo = userinfo;
      console.log(this.userinfo);
  }


}

