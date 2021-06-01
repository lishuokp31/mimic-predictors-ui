import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Feature, FeatureUnaryValue } from '@core/types';
import { AkiState } from '@aki/store';
import * as actions from '@aki/store/actions';
import * as actions_user from '@user/store/actions';
import * as actions_similarity from '@shared/store/actions'
import { FeatureValueChangeEvent } from '@shared/components';


import { LoadSpecifiedSamplePayload } from '@aki/models';
import { mapping } from './../../mapping-aki';
import { FavoritePayload, Favorite } from '@user/models';
import {SimilaritiesState} from '@shared/store';

import { Similarity } from '@shared/models';

import { Userinfo } from '@login/models';
import { LoginState } from '../../../store';
import { Router } from '@angular/router';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-aki',
  templateUrl: './aki.component.html',
  styleUrls: ['./aki.component.scss'],
})
export class AkiComponent {
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

  public readonly features_num = 16;
  public id$: Observable<number>;
  public features$: Observable<Feature[]>;
  public x$: Observable<number[][]>;
  public formattedX$: Observable<string[][]>;
  public weights$: Observable<object[][]>;
  public slicedPredictions$: Observable<number[]>;
  public showPredictions$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public disableInfer$: Observable<boolean>;

  public x: number[][] = [];
  public id: number = 0;
  visible = false;
  isVisible_setting = false;

  public showThreshold: boolean = false;
  public threshold_data: any[] = [];
  public threshold_data_array: any[] = [];
  public threshold_data_length_array: any[] = [];
  public threshold_title: any[] = [];
  public mapping: any[];
  // 选项表映射
  public thresholdOptionArray: boolean[] = [];
  // 从选项框中获取的原始选项信息，默认选中肌酸酐
  public thresholdOptionMessage: string[] = ['3'];
  // 重点医疗指标名称
  public thresholdName: string[] = [];
  // 原始数据的下标
  public thresholdIndex: number[] = [];
  public enableThreshold = true;

  public objectid: string = '';

  // 重点指标的阈值，超过即预警
  public AKIThreshold = [1.3];
  public ThresholdResult: Array<Array<number>> = new Array<Array<number>>();
  public result_string: string[] = [];


  // 收藏信息
  public isVisible_fav_modal : boolean = false;
  public favinfo : Favorite = {
    id : '',
    fav_type : 'aki',
    remark : '',
    value: '',
  };
  public select_label = {
    importment : "重点观察样例"
  }
  public value = '';

  // 权限信息
  public isVisible_level_modal : boolean = false;

  // 相似病例信息
  public similarity_drawer_visible : boolean = false;
  public similarities$: Observable<Similarity[]>;
  // public isLoading$: Observable<boolean>;
  public similarities: Similarity[] = [];
  public previous_id : number[] = [];

  constructor(private store: Store, private dialog: MatDialog , public route: ActivatedRoute , private router: Router,) {
    this.login$ = this.store.select(LoginState.login);
    this.username$ = this.store.select(LoginState.username);
    this.email$ = this.store.select(LoginState.email);
    this.phone$ = this.store.select(LoginState.phone);
    this.level$ = this.store.select(LoginState.level);

    this.mapping = mapping;
    for (let i = 0; i < this.features_num; i++) {
      this.thresholdOptionArray.push(false);
    }
    this.thresholdOptionArray[3] = true; // 默认肌酸酐

    this.id$ = this.store.select(AkiState.id);
    this.features$ = this.store.select(AkiState.features);
    this.x$ = this.store.select(AkiState.x);
    this.formattedX$ = this.store.select(AkiState.formattedX);
    this.weights$ = this.store.select(AkiState.computedWeights);
    this.slicedPredictions$ = this.store.select(AkiState.slicedPredictions);
    this.showPredictions$ = this.store.select(AkiState.showPredictions);
    this.isLoading$ = this.store.select(AkiState.isLoading);
    this.disableInfer$ = this.store.select(AkiState.disableInfer);

    this.similarities$ = this.store.select(SimilaritiesState.similarities)
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.value = params["value"];
    })
    console.log("this.value:" + this.value)
    if(this.value){
      console.log("加载收藏病例")
      this.onLoadSpecifiedSample(this.value);
    }
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

    this.id$.subscribe((value) => {
      this.id = value;
    });
    this.x$.subscribe((value) => {
      this.x = value;
    });

    this.similarities$.subscribe((value) => {
      this.similarities = value;
    })

    if(this.userinfo.level > 2){
      console.log("权限不足！" + this.userinfo.level)
      this.isVisible_level_modal = true;
    }
  }

  public onLoadSample() {
    this.store.dispatch(new actions.LoadSample());
    this.showThreshold = false;
  }

  public onLoadSpecifiedSample(objectid: string) {
    const outData: LoadSpecifiedSamplePayload = {
      objectid: objectid,
    };
    this.store.dispatch(new actions.LoadSpecifiedSample(outData));
    this.showThreshold = false;
  }

  public onReset() {
    this.store.dispatch(new actions.Reset());
    this.showThreshold = false;
    this.id = 0;
  }

  public onPredict() {
    this.store.dispatch(new actions.Predict());
  }

  public onChange(event: FeatureValueChangeEvent) {
    this.store.dispatch(
      new actions.Change(
        event.feature,
        event.day,
        event.newValue as FeatureUnaryValue
      )
    );
  }

  onThresholdWarning(): void {
    this.isVisible_setting = true;
  }

  handleOk(): void {
    this.thresholdIndex = [];
    for (var i = 0; i < this.thresholdOptionArray.length; i++) {
      if(this.thresholdOptionArray[i] && !(i == 15 || i == 14 || i == 13 || i == 12 || i == 5)){
        this.thresholdIndex.push(i);
      }
    }

    // 获取指标名称
    this.thresholdName = [];
    for (var i = 0; i < this.thresholdIndex.length; i++) {
      for (var j = 0; j < mapping.length; j++) {
        if (mapping[j].id == this.thresholdIndex[i]) {
          this.thresholdName.push(mapping[j].label);
          break;
        }
      }
    }

    // 开始构造图表数据
    this.threshold_data = [];
    this.threshold_data_array = [];
    this.threshold_data_length_array = [];
    this.threshold_title = [];
    for (var i = 0; i < this.thresholdIndex.length; i++) {
      let tmp = [];
      for (var j = 0; j < this.x.length; j++) {
        if(this.x[j][this.thresholdIndex[i]] != 0){
          tmp.push({
            name: 'day' + (j + 1),
            value: this.x[j][this.thresholdIndex[i]],
          });
        }
      }
      this.threshold_data.push({
        name: this.thresholdName[i],
        series: tmp,
      });
      this.threshold_data_array.push([{
        name: this.thresholdName[i],
        series: tmp,
      }])
      this.threshold_data_length_array.push(i)
      this.threshold_title.push("指标 " + this.thresholdName[i] + " 的筛查结果如下：")
    }

    console.log(this.threshold_data_length_array)
    this.isVisible_setting = false;
    this.showThreshold = true;
  }

  handleCancel(): void {
    this.isVisible_setting = false;
  }

  handleAll(): void {
    for(var i = 0; i < this.thresholdOptionArray.length; i++) {
      this.thresholdOptionArray[i] = true;
    }
    this.onChangeThreshold(["0", "2", "3", "4", "7", "9", "10", "1", "6", "8", "11"])
  }

  handleAllNot() : void {
    for(var i = 0; i < this.thresholdOptionArray.length; i++) {
      this.thresholdOptionArray[i] = false;
    }
    this.onChangeThreshold([]);
  }

  onChangeThreshold(thresholdOption: string[]): void {
    this.thresholdOptionMessage = thresholdOption;
    // 修改选定的指标组
    for (var i = 0; i < this.features_num; i++) {
      this.thresholdOptionArray[i] = false;
    }
    for (var i = 0; i < this.thresholdOptionArray.length; i++) {
      this.thresholdOptionArray[Number(this.thresholdOptionMessage[i])] = true;
    }

    this.enableThreshold = false;
    for(var i = 0; i < this.thresholdOptionArray.length; i++){
      this.enableThreshold = this.enableThreshold || this.thresholdOptionArray[i];
    }
  }

  open(): void {
    // this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  onAddFavorite(){
    this.isVisible_fav_modal = true;
  }

  handleCancel_fav_modal(){
    this.isVisible_fav_modal = false;
  }
  handleOk_fav_modal(){
    const outData: FavoritePayload = {
      username : this.userinfo.username,
      id : this.favinfo.id,
      fav_type : 'aki',
      remark : this.favinfo.remark,
      value: this.id.toString(),
    };

    console.log(this.favinfo)
    console.log(outData)
    this.store.dispatch(new actions_user.AddFavoriteAction(outData));
    this.isVisible_fav_modal = false;
    this.favinfo.id = '';
    this.favinfo.remark = '';
  }

  handleCancel_level_modal(){
    this.isVisible_level_modal = false;
    this.router.navigate(['/user']);
  }

  handleOk_level_modal(){
    this.isVisible_level_modal = false;
    this.router.navigate(['/user']);
  }

  similarity_drawer_open(){
    this.store.dispatch(new actions_similarity.LoadAll(this.id.toString()))
    this.similarity_drawer_visible = true;
  }

  similarity_drawer_close(){
    this.similarity_drawer_visible = false;
  }

  onBackCurrent(){
    this.onLoadSpecifiedSample(this.previous_id[this.previous_id.length - 1].toString());
  }

  onSimilarityClicked(event : Similarity){
    const { id } = event;
    for (var i = 0; i < this.similarities.length; ++ i) {
      if(this.similarities[i].id == id) {
        this.previous_id.push(this.id)
        this.onLoadSpecifiedSample(this.similarities[i].value)
        this.select_label
        break;
      }
    }
  }
}
