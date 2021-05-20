import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { Userinfo } from '@login/models';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginState} from '../../../store';
import  * as actions_log  from '../../../store'
import { Favorite } from '@user/models';

import * as actions from '@user/store/actions';
import { FavoritesState } from '@user/store';
import { DeleteFavoritePayload } from '@user/models'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  date: any;
  public login$: Observable<boolean>;
  public username$: Observable<string>;
  public email$: Observable<string>;
  public phone$: Observable<string>;
  public level$: Observable<number>;

  public favorites$: Observable<Favorite[]>;
  public isLoading$: Observable<boolean>;

  public favorites: Favorite[] = [];

  userinfo: Userinfo = {
    login: false,
    username: '',
    email: '',
    phone: '',
    level: -1,
  };

  public isVisible_fav_modal: boolean = false;

  public selected_favinfo: Favorite = {
    id: '',
    fav_type: 'aki',
    remark: '',
    value: '',
  };

  constructor(private router: Router, private store: Store , private ref : ChangeDetectorRef) {
    this.date = new Date();
    var tmp = setInterval(() => {
      this.date = new Date();
      this.ref.markForCheck()
    } , 500)
    var tmp2 = setInterval(() => {
      if(!this.userinfo.login){
        this.router.navigate(['/login'])
      }
    } , 20)
    this.login$ = this.store.select(LoginState.login);
    this.username$ = this.store.select(LoginState.username);
    this.email$ = this.store.select(LoginState.email);
    this.phone$ = this.store.select(LoginState.phone);
    this.level$ = this.store.select(LoginState.level);

    this.favorites$ = this.store.select(FavoritesState.favorites);
    this.isLoading$ = this.store.select(FavoritesState.isLoading);
  }

  public refresh() {
    this.store.dispatch(new actions.LoadAll(this.userinfo.username));
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

    this.favorites$.subscribe((value) => {
      this.favorites = value;
    });
  }

  public onFavoriteClicked(event: Favorite) {
    const { id } = event;
    // console.log("selected_id:" + id);
    // console.log("this.favorites:")
    // console.log(this.favorites)
    for (var i = 0; i < this.favorites.length; ++ i) {
      // console.log(this.favorites[i].id)
      // console.log(this.favorites[i].id == id)
      if (this.favorites[i].id == id) {
        this.selected_favinfo = this.favorites[i];
        // console.log("this.selected_favinfo:")
        // console.log(this.selected_favinfo)
        break;
      }
    }
    this.isVisible_fav_modal = true;
  }

  handleOk_fav_modal() {
    this.isVisible_fav_modal = false;
  }

  handleCancel_fav_modal() {
    this.isVisible_fav_modal = false;
  }

  loadSelectedFavorite() {
    // console.log('this.selected_favinfo:');
    // console.log(this.selected_favinfo);
    switch (this.selected_favinfo.fav_type) {
      case 'aki':
        this.router.navigate(['/aki'], {
          queryParams: { value : this.selected_favinfo.value },
        });
        break;
    }
  }

  deleteFavorite(){
    const outData: DeleteFavoritePayload = {
      username : this.userinfo.username,
      id : this.selected_favinfo.id,
    }
    this.store.dispatch(new actions.DeleteFavoriteAction(outData))
    this.isVisible_fav_modal = false;
  }

  logout(){
    this.store.dispatch(new actions_log.LogoutAction());
    this.router.navigate(['/login'])
  }
}
