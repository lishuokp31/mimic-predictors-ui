import { Injectable } from '@angular/core';
import {
  createEntityCollections,
  EntityDictionary,
} from '@angular-ru/common/entity';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataEntityCollectionsRepository } from '@ngxs-labs/data/repositories';
import { Userinfo } from '@login/models';
import * as actions from './actions';
import { LoginApiService } from './services';

@StateRepository()
@State({
  name: 'loginEntities',
  defaults: createEntityCollections(),
})
@State<Userinfo>({
  name: 'login',
  defaults: {
    login: false,
    username: '',
    email: '',
    phone: '',
    level: 0,
  },
})
@Injectable()
export class LoginState {
  constructor(private api: LoginApiService) {}

  @Selector([LoginState])
  public static login(state: Userinfo): boolean {
    return state.login;
  }

  @Selector([LoginState])
  public static username(state: Userinfo): string {
    return state.username;
  }

  @Selector([LoginState])
  public static email(state: Userinfo): string {
    return state.email;
  }

  @Selector([LoginState])
  public static phone(state: Userinfo): string {
    return state.phone;
  }

  @Selector([LoginState])
  public static level(state: Userinfo): number {
    return state.level;
  }

  @Action(actions.loginAction)
  public async login(
    { patchState }: StateContext<Userinfo>,
    { payload }: actions.loginAction
  ) {
    try {
      const result = await this.api.login(payload);
      console.log(result);
      patchState({
        login: result.login,
        username: result.username,
        email: result.email,
        phone: result.phone,
        level: result.level,
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Action(actions.LogoutAction)
  public async logOut({ patchState }: StateContext<Userinfo>) {
    patchState({
      login: false,
      username: '',
      email: '',
      phone: '',
      level: -1,
    });
  }
}
