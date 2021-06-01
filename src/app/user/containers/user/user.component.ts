import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { Userinfo } from '@login/models';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginState} from '../../../store';
import  * as actions_log  from '../../../store'
import { FavoritePayload , Favorite } from '@user/models';

import * as actions from '@user/store/actions';
import { FavoritesState , UsersState } from '@user/store';
import { DeleteFavoritePayload } from '@user/models'
import {
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  RowClickedEvent,
} from 'ag-grid-community';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  private gridApi?: GridApi;
  public readonly columnDefs = [
    {
      headerName: '用户名',
      field: 'username',
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      lockPosition: true,
    },
    { headerName: '邮箱', field: 'email', sortable: true, filter: true },
    { headerName: '电话号码', field: 'phone', sortable: true, filter: true },
    { headerName: '权限等级', field: 'level', sortable: true, filter: true },
  ];

  public modified_level : string = "";

  public users$ : Observable<Userinfo[]>;
  public users : Userinfo[] = [];
  public resizeColumnsCallback = () => setTimeout(() => this.gridApi?.sizeColumnsToFit());

  date: any;
  public login$: Observable<boolean>;
  public username$: Observable<string>;
  public email$: Observable<string>;
  public phone$: Observable<string>;
  public level$: Observable<number>;

  public favorites$: Observable<Favorite[]>;
  public isLoading$: Observable<boolean>;

  public favorites: Favorite[] = [];

  public modify_model : boolean = false;
  public modified_id : string = "";
  public modified_remark : string = "";

  userinfo: Userinfo = {
    login: false,
    username: '',
    email: '',
    phone: '',
    level: -1,
  };

  public isVisible_fav_modal: boolean = false;
  public isVisible_delete_fav_confirm_modal:boolean = false;
  public isVisible_user_modal : boolean = false;

  public selected_favinfo: Favorite = {
    id: '',
    fav_type: 'aki',
    remark: '',
    value: '',
  };

  public selected_userinfo : Userinfo = {
    login: false,
    username: '',
    email: '',
    phone: '',
    level: -1,
  }

  public level_table = {
    "1" : "A",
    "2" : "B",
    "3" : "C",
    "-1" : "Z",
  }

  constructor(private router: Router, private store: Store , private ref : ChangeDetectorRef , private http: HttpClient,) {
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

    this.users$ = this.store.select(UsersState.users)
  }

  public refresh() {
    this.store.dispatch(new actions.LoadAll(this.userinfo.username));
    if(this.userinfo.level == 1){
      this.store.dispatch(new actions.LoadAll_User());
    }
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

    this.users$.subscribe((value) => {
      this.users = value;
    })

    this.refresh();
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

  changeToModifyModel(){
    this.modify_model = true;
  }

  modifySelectedFavorite(){
    const outData: FavoritePayload = {
      username : this.userinfo.username,
      id : this.modified_id,
      fav_type : 'aki',
      remark : this.modified_remark,
      value: this.selected_favinfo.value,
    };
    this.store.dispatch(new actions.ModifyFavoriteAction(outData));
    this.isVisible_fav_modal = false;
    this.modify_model = false;
    this.modified_id = '';
    this.modified_remark = '';
    this.refresh()
  }

  cancelModify(){
    this.modify_model = false;
  }

  showDeleteFavoriteConfirm(){
    this.isVisible_delete_fav_confirm_modal = true;
  }

  deleteFavorite(){
    const outData: DeleteFavoritePayload = {
      username : this.userinfo.username,
      id : this.selected_favinfo.id,
    }
    this.store.dispatch(new actions.DeleteFavoriteAction(outData))
    this.isVisible_fav_modal = false;
    this.isVisible_delete_fav_confirm_modal = false;
  }

  cancelDelete(){
    this.isVisible_delete_fav_confirm_modal = false;
  }

  logout(){
    this.store.dispatch(new actions_log.LogoutAction());
    this.router.navigate(['/login'])
  }

  public onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', this.resizeColumnsCallback);
  }

  public ngOnDestroy() {
    window.removeEventListener('resize', this.resizeColumnsCallback);
  }

  public onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  public onRowClicked(event: any) {
    console.log("flag")
    console.log(event)
    console.log(event.rowIndex)

    this.selected_userinfo = event.data
    if(this.selected_userinfo.level == 1){
      this.modified_level = "A";
    }
    else if(this.selected_userinfo.level == 2){
      this.modified_level = "B";
    }
    else if(this.selected_userinfo.level == 3){
      this.modified_level = "C";
    }
    else {
      this.modified_level = "Z";
    }

    this.isVisible_user_modal = true;
  }

  handleCancel_user_modal(){
    this.isVisible_user_modal = false;
  }

  modifySelectedUserLevel(){
    const url = `${environment.apiUrl}/users/update`;
    const formData = new FormData();
    formData.append('username', this.selected_userinfo.username);
    var modified_level = 0;
    if(this.modified_level == "B"){
      modified_level = 2;
    }
    else if(this.modified_level == "C"){
      modified_level = 3;
    }
    else {
      modified_level = -1;
    }
    formData.append('modified_level', modified_level.toString());
    this.http.post<number>(url, formData).subscribe((response) => {})
    this.refresh()
    this.isVisible_user_modal = false;
  }
}
