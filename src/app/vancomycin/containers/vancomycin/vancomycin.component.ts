import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Feature } from '@core/types';
import { VancomycinState } from '@vancomycin/store';
import * as actions from '@vancomycin/store/actions';
import { FeatureValueChangeEvent } from '@shared/components';
import { Userinfo } from '@login/models';
import { LoginState} from '../../../store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vancomycin',
  templateUrl: './vancomycin.component.html',
  styleUrls: ['./vancomycin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VancomycinComponent {
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

  public features$: Observable<Feature[]>;
  public x$: Observable<number[][]>;
  public formattedX$: Observable<string[][]>;
  public weights$: Observable<object[][]>;
  public slicedPredictions$: Observable<number[]>;
  public showPredictions$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public disableInfer$: Observable<boolean>;

  // 权限信息
  public isVisible_level_modal : boolean = false;

  constructor(private store: Store,private router: Router) {
    var tmp = setInterval(() => {
      if(!this.userinfo.login){
        this.router.navigate(['/login'])
      }
    } , 20)
    this.login$ = this.store.select(LoginState.login);
    this.username$ = this.store.select(LoginState.username);
    this.email$ = this.store.select(LoginState.email);
    this.phone$ = this.store.select(LoginState.phone);
    this.level$ = this.store.select(LoginState.level);

    this.features$ = this.store.select(VancomycinState.features);
    this.x$ = this.store.select(VancomycinState.x);
    this.formattedX$ = this.store.select(VancomycinState.formattedX);
    this.weights$ = this.store.select(VancomycinState.computedWeights);
    this.slicedPredictions$ = this.store.select(
      VancomycinState.slicedPredictions
    );
    this.showPredictions$ = this.store.select(VancomycinState.showPredictions);
    this.isLoading$ = this.store.select(VancomycinState.isLoading);
    this.disableInfer$ = this.store.select(VancomycinState.disableInfer);
  }

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

    if(this.userinfo.level > 2){
      console.log("权限不足！" + this.userinfo.level)
      this.isVisible_level_modal = true;
    }
  }

  public onLoadSample() {
    this.store.dispatch(new actions.LoadSample());
  }

  public onReset() {
    this.store.dispatch(new actions.Reset());
  }

  public onPredict() {
    this.store.dispatch(new actions.Predict());
  }

  public onChange(event: FeatureValueChangeEvent) {
    this.store.dispatch(
      new actions.Change(event.feature, event.day, event.newValue)
    );
  }

  handleCancel_level_modal(){
    this.isVisible_level_modal = false;
    this.router.navigate(['/user']);
  }

  handleOk_level_modal(){
    this.isVisible_level_modal = false;
    this.router.navigate(['/user']);
  }
}
