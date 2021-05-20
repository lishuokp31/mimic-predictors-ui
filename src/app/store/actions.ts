import { Userinfo , LoginPayload } from '@login/models';

export class loginAction{
  static readonly type = '[log] ';
  constructor(public payload : LoginPayload){}
}

export class LogoutAction {
  static readonly type = '[favorites] LogOut';
  constructor() {}
}
