import { Component } from '@angular/core';
import { Userinfo } from '@login/models';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoginState } from '../../../store';
@Component({
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.component.scss'],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public isCollapsed : boolean = false;
  public theme : boolean = true;

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

  constructor(private store: Store) {
    this.login$ = this.store.select(LoginState.login);
    this.username$ = this.store.select(LoginState.username);
    this.email$ = this.store.select(LoginState.email);
    this.phone$ = this.store.select(LoginState.phone);
    this.level$ = this.store.select(LoginState.level);
  }

  ngOnInit() {
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

  showuserinfo(){
    console.log("sidebar里的userinfo：")
    console.log(this.userinfo)
  }


}

