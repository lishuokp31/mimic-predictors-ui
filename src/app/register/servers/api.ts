import { Injectable , EventEmitter } from '@angular/core';
import { Userinfo } from '@login/models';
import { BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterApiService {
  private userinfo: Userinfo = {
    login: false,
    username: '',
    email: '',
    phone: '',
    level: -1,
  };

  // private userinfo = new Subject<Userinfo>();

  userinfoEvent$ = new BehaviorSubject<Userinfo>(this.userinfo);

  setuserinfo(userinfo: Userinfo){
    this.userinfo = userinfo;
    this.userinfoEvent$.next(userinfo);
  }

  getuserinfo() : Userinfo{
    return this.userinfo;
  }

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
