import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Feature } from '@core/types';
import { VancomycinState } from '@vancomycin/store';
import * as actions from '@vancomycin/store/actions';
import * as actions_user from '@user/store/actions';
import * as actions_similarity from '@shared/store/actions';
import { FeatureValueChangeEvent } from '@shared/components';

import { LoadSpecifiedSamplePayload } from '@shared/models';
import { mapping } from './../../mapping-vancomycin';
import { FavoritePayload, Favorite } from '@user/models';
import { SimilaritiesState } from '@shared/store';
import { Similarity } from '@shared/models';

import { Userinfo } from '@login/models';
import { LoginState } from '../../../store';
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

  public readonly features_num = 116;
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
  public id: string = '';
  visible = false;
  isVisible_setting = false;

  public showThreshold: boolean = false;
  public threshold_data: any[] = [];
  public threshold_data_array: any[] = [];
  public threshold_data_length_array: any[] = [];
  public threshold_title: any[] = [];
  public mapping: any[];

  public thresholdOptionMessage: string[] = [];
  public enableThreshold = false;
  public threshold_mapping_array: any[] = [];
  public threshold_mapping_array_index: any[] = [];
  public threshold_mapping_array_index1: any[] = [];
  public threshold_mapping_array_index2: any[] = [];
  public threshold_mapping_array_index3: any[] = [];
  public threshold_mapping_array_index4: any[] = [];

  public objectid: string = '';

  // 收藏信息
  public isVisible_fav_modal: boolean = false;
  public favinfo: Favorite = {
    id: '',
    fav_type: 'vancomycin',
    remark: '',
    value: '',
  };
  public select_label = {
    importment: '重点观察样例',
  };
  public value = '';

  // 权限信息
  public isVisible_level_modal: boolean = false;

  // 相似病例信息
  public similarity_drawer_visible: boolean = false;
  public similarities$: Observable<Similarity[]>;
  // public isLoading$: Observable<boolean>;
  public similarities: Similarity[] = [];
  public previous_id: string[] = [];

  constructor(
    private store: Store,
    public route: ActivatedRoute,
    private router: Router
  ) {
    // var tmp = setInterval(() => {
    //   if (!this.userinfo.login) {
    //     this.router.navigate(['/login']);
    //   }
    // }, 20);
    this.login$ = this.store.select(LoginState.login);
    this.username$ = this.store.select(LoginState.username);
    this.email$ = this.store.select(LoginState.email);
    this.phone$ = this.store.select(LoginState.phone);
    this.level$ = this.store.select(LoginState.level);

    this.mapping = mapping;
    for (let i = 6; i < this.features_num && i<=42; i++) {
      this.threshold_mapping_array.push([
        this.mapping[i].id,
        this.mapping[i].label,
        this.mapping[i].group,
        false,
      ]);
      this.threshold_mapping_array_index.push(i);
      switch (this.mapping[i].group) {
        case '主要生命体征':
          this.threshold_mapping_array_index1.push(i - 6);
          break;
        case '血常规':
          this.threshold_mapping_array_index2.push(i - 6);
          break;
        case '实验数据':
          this.threshold_mapping_array_index3.push(i - 6);
          break;
        case '药物':
          this.threshold_mapping_array_index4.push(i - 6);
          break;
      }
    }

    this.id$ = this.store.select(VancomycinState.id);
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

    this.similarities$ = this.store.select(SimilaritiesState.similarities);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.value = params['value'];
    });
    console.log('this.value:' + this.value);
    if (this.value) {
      console.log('加载收藏病例');
      this.onLoadSpecifiedSample(this.value);
    }
    this.login$.subscribe((value) => {
      this.userinfo.login = value;
    });
    if (!this.userinfo.login) {
      this.router.navigate(['/login']);
    }
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
      this.id = value.toString();
    });
    this.x$.subscribe((value) => {
      this.x = value;
    });

    this.similarities$.subscribe((value) => {
      this.similarities = value;
    });

    if (this.userinfo.level > 2 || this.userinfo.level == -1) {
      console.log('权限不足！' + this.userinfo.level);
      this.isVisible_level_modal = true;
    }
  }

  public onLoadSample() {
    this.store.dispatch(new actions.LoadSample());
    this.showThreshold = false;
  }

  public onLoadSpecifiedSample(objectid: string) {
    this.id = objectid;
    const outData: LoadSpecifiedSamplePayload = {
      objectid: objectid,
    };
    this.store.dispatch(new actions.LoadSpecifiedSample(outData));
    this.showThreshold = false;
  }

  public onReset() {
    this.store.dispatch(new actions.Reset());
    this.showThreshold = false;
    this.id = '';
  }

  public onPredict() {
    this.store.dispatch(new actions.Predict());
  }

  public onChange(event: FeatureValueChangeEvent) {
    this.store.dispatch(
      new actions.Change(event.feature, event.day, event.newValue)
    );
  }

  onThresholdWarning(): void {
    this.isVisible_setting = true;
  }

  handleOk(): void {
    // 开始构造图表数据
    this.threshold_data = [];
    this.threshold_data_array = [];
    this.threshold_data_length_array = [];
    this.threshold_title = [];

    for (var i = 0; i < this.threshold_mapping_array.length; i++) {
      if (this.threshold_mapping_array[i][3] == true) {
        let tmp = [];
        for (var j = 0; j < this.x.length; j++) {
          if (this.x[j][35] != 0) {
            tmp.push({
              name: 'day' + (j + 1),
              value: this.x[j][this.threshold_mapping_array[i][0]],
            });
          }
        }
        this.threshold_data.push({
          name: this.threshold_mapping_array[i][1],
          series: tmp,
        });
        this.threshold_data_array.push([
          {
            name: this.threshold_mapping_array[i][1],
            series: tmp,
          },
        ]);
        this.threshold_data_length_array.push(
          this.threshold_data_length_array.length
        );
        this.threshold_title.push(
          '指标 ' + this.threshold_mapping_array[i][1] + ' 的筛查结果如下：'
        );
      }
    }

    this.isVisible_setting = false;
    this.showThreshold = true;
  }

  handleCancel(): void {
    this.isVisible_setting = false;
  }

  handleAll(): void {
    for (var i = 0; i < this.threshold_mapping_array.length; i++) {
      if (
        this.threshold_mapping_array[i][0] != 149 &&
        this.threshold_mapping_array[i][0] != 150 &&
        this.threshold_mapping_array[i][0] != 148 &&
        this.threshold_mapping_array[i][0] != 17 &&
        this.threshold_mapping_array[i][0] != 37 &&
        this.threshold_mapping_array[i][0] != 18
      ) {
        this.threshold_mapping_array[i][3] = true;
      }
    }

    this.enableThreshold = false;
    for (var i = 0; i < this.threshold_mapping_array.length; i++) {
      this.enableThreshold =
        this.enableThreshold || this.threshold_mapping_array[i][3];
    }
  }

  handleAllNot(): void {
    for (var i = 0; i < this.threshold_mapping_array.length; i++) {
      this.threshold_mapping_array[i][3] = false;
    }

    this.enableThreshold = false;
    for (var i = 0; i < this.threshold_mapping_array.length; i++) {
      this.enableThreshold =
        this.enableThreshold || this.threshold_mapping_array[i][3];
    }
  }

  onChangeThreshold(thresholdOption: string[]): void {
    this.thresholdOptionMessage = thresholdOption;
    console.log(this.thresholdOptionMessage);
    // 修改选定的指标组
    for (var i = 0; i < this.features_num; i++) {
      this.threshold_mapping_array[i][3] = false;
    }

    for (var i = 0; i < this.thresholdOptionMessage.length; i++) {
      for (var j = 0; j < this.threshold_mapping_array.length; j++) {
        if (
          this.thresholdOptionMessage[i] == this.threshold_mapping_array[j][0]
        ) {
          this.threshold_mapping_array[j][3] = true;
        }
      }
    }

    this.enableThreshold = false;
    for (var i = 0; i < this.threshold_mapping_array.length; i++) {
      this.enableThreshold =
        this.enableThreshold || this.threshold_mapping_array[i][3];
    }
  }

  open(): void {
    // this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  onAddFavorite() {
    this.isVisible_fav_modal = true;
  }

  handleCancel_fav_modal() {
    this.isVisible_fav_modal = false;
  }

  handleOk_fav_modal() {
    const outData: FavoritePayload = {
      username: this.userinfo.username,
      id: this.favinfo.id,
      fav_type: 'vancomycin',
      remark: this.favinfo.remark,
      value: this.id.toString(),
    };

    console.log(this.favinfo);
    console.log(outData);
    this.store.dispatch(new actions_user.AddFavoriteAction(outData));
    this.isVisible_fav_modal = false;
    this.favinfo.id = '';
    this.favinfo.remark = '';
  }

  handleCancel_level_modal() {
    this.isVisible_level_modal = false;
    this.router.navigate(['/user']);
  }

  handleOk_level_modal() {
    this.isVisible_level_modal = false;
    this.router.navigate(['/user']);
  }

  similarity_drawer_open() {
    this.store.dispatch(new actions_similarity.LoadAll(this.id.toString()));
    this.similarity_drawer_visible = true;
  }

  similarity_drawer_close() {
    this.similarity_drawer_visible = false;
  }

  onBackCurrent() {
    this.onLoadSpecifiedSample(
      this.previous_id[this.previous_id.length - 1].toString()
    );
  }

  onSimilarityClicked(event: Similarity) {
    const { id } = event;
    for (var i = 0; i < this.similarities.length; ++i) {
      if (this.similarities[i].id == id) {
        this.previous_id.push(this.id);
        this.onLoadSpecifiedSample(this.similarities[i].value);
        this.select_label;
        break;
      }
    }
  }
}
