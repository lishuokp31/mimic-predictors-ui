import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngxs/store';

import { Favorite } from '@user/models';
import * as actions from '@user/store/actions';

import { Userinfo } from '@login/models';
import { Observable } from 'rxjs';
import { LoginState } from '../../store';

@Injectable()
export class FavoritesResolver implements Resolve<Favorite[]> {
  constructor(private store: Store) {
    this.login$ = this.store.select(LoginState.login);
    this.username$ = this.store.select(LoginState.username);
    this.email$ = this.store.select(LoginState.email);
    this.phone$ = this.store.select(LoginState.phone);
    this.level$ = this.store.select(LoginState.level);
  }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Favorite[]{
    // TODO:
    // this.store.dispatch(new actions.LoadAll(this.userinfo.username))
    return []
  }

  userinfo: Userinfo = {
    login: false,
    username: '',
    email: '',
    phone: '',
    level: -1,
  };
  public login$: Observable<boolean>;
  public username$: Observable<string>;
  public email$: Observable<string>;
  public phone$: Observable<string>;
  public level$: Observable<number>;

  ngOnInit(): void {
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
}








