import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Feature, FeatureUnaryValue } from '@core/types';
import { AkiState } from '@aki/store';
import * as actions from '@aki/store/actions';
import { FeatureValueChangeEvent } from '@shared/components';

import { ObjectIdFormDialog } from '@aki/dialogs';
import { LoadSpecifiedSamplePayload } from '@aki/models';

import { mapping } from './../../mapping-aki';
import { FocusTrapManager } from '@angular/cdk/a11y/focus-trap/focus-trap-manager';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-aki',
  templateUrl: './aki.component.html',
  styleUrls: ['./aki.component.scss'],
})
export class AkiComponent {
  public readonly features_num = 16;
  public features$: Observable<Feature[]>;
  public x$: Observable<number[][]>;
  public formattedX$: Observable<string[][]>;
  public weights$: Observable<object[][]>;
  public slicedPredictions$: Observable<number[]>;
  public showPredictions$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public disableInfer$: Observable<boolean>;

  public x: number[][] = [];
  visible = false;
  isVisible_setting = false;

  public showThreshold: boolean = false;
  public threshold_data: any[] = [];
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

  constructor(private store: Store, private dialog: MatDialog) {
    this.mapping = mapping;
    for (let i = 0; i < this.features_num; i++) {
      this.thresholdOptionArray.push(false);
    }
    this.thresholdOptionArray[3] = true; // 默认肌酸酐
    this.features$ = this.store.select(AkiState.features);
    this.x$ = this.store.select(AkiState.x);
    this.formattedX$ = this.store.select(AkiState.formattedX);
    this.weights$ = this.store.select(AkiState.computedWeights);
    this.slicedPredictions$ = this.store.select(AkiState.slicedPredictions);
    this.showPredictions$ = this.store.select(AkiState.showPredictions);
    this.isLoading$ = this.store.select(AkiState.isLoading);
    this.disableInfer$ = this.store.select(AkiState.disableInfer);
  }

  public onLoadSample() {
    this.store.dispatch(new actions.LoadSample());
  }

  public onLoadSpecifiedSample(objectid: string) {
    // const config = new MatDialogConfig();
    // config.width = '600px';

    // const dialogRef = this.dialog.open(ObjectIdFormDialog, config);
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result !== undefined && result !== '') {
    //     this.store.dispatch(new actions.LoadSpecifiedSample(result));
    //   }
    // });
    const outData: LoadSpecifiedSamplePayload = {
      objectid: objectid,
    };
    this.store.dispatch(new actions.LoadSpecifiedSample(outData));
  }

  public onReset() {
    this.store.dispatch(new actions.Reset());
    this.showThreshold = false;
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
    }

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

  ngOnInit(): void {
    this.x$.subscribe((value) => {
      this.x = value;
    });
  }

  open(): void {
    // this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
