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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-aki',
  templateUrl: './aki.component.html',
  styleUrls: ['./aki.component.scss'],
})
export class AkiComponent {
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

  public objectid: string = '';
  public days: number = 14;
  // 重点医疗指标
  // public AKIThresholdIndicators = ['creatinine'];
  public AKIThresholdIndicators = ['肌酸酐'];
  // 原始数据的下标
  public AKIThresholdindex = [3];
  // 重点指标的阈值，超过即预警
  public AKIThreshold = [1.3];
  public ThresholdResult: Array<Array<number>> = new Array<Array<number>>();
  public result_string : string[] = []

  constructor(private store: Store, private dialog: MatDialog) {
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
    console.log('objectid:' + objectid);
    const outData: LoadSpecifiedSamplePayload = {
      objectid: objectid,
    };
    this.store.dispatch(new actions.LoadSpecifiedSample(outData));
  }

  onAKIThreshold(){

  }

  public onThresholdWarning() {
    console.log('this.x:' + this.x);
    for (var i = 0; i < 14; i++) {
      if (this.x[i][0] == 0) {
        this.days = i;
        break;
      }
    }
    console.log('this.days:' + this.days);
    // 开始筛查重点指标是否有超标的天数
    var result_string: Array<string> = new Array<string>();
    for (var i = 0; i < this.days; i++) {
      var day_result = new Array<number>();
      for (var j = 0; j < this.AKIThresholdindex.length; j++) {
        // console.log( "day" + i + ":" + this.x[i][this.AKIThresholdindex[j]])
        // console.log( "AKIThreshold:" + this.AKIThreshold[j])
        if (this.x[i][this.AKIThresholdindex[j]] > this.AKIThreshold[j]) {
          day_result.push(this.x[i][this.AKIThresholdindex[j]]);
          result_string.push(
            '第' +
              (i + 1) +
              '天时，病人的 ' +
              this.AKIThresholdIndicators[j] +
              ' 指标出现异常，' +
              this.AKIThresholdIndicators[j] +
              '指标 ' +
              this.x[i][this.AKIThresholdindex[j]] +
              ' 超出正常值 ' +
              this.AKIThreshold[j]
          );
          // console.log("AKIThreshold:" + this.x[i][this.AKIThresholdindex[j]])
        } else {
          day_result.push(0);
        }
      }
      console.log('day_result:' + day_result);
      this.ThresholdResult.push(day_result);
    }
    console.log('this.ThresholdResult:' + this.ThresholdResult);
    console.log('result_string:' + result_string);
    this.result_string = result_string
    // 将结果转换为列表
    if(this.result_string.length == 0){
      this.result_string.push("无异常生理指标")
    }
    this.open()
  }

  public onReset() {
    this.store.dispatch(new actions.Reset());
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

  ngOnInit(): void {
    this.x$.subscribe((value) => {
      this.x = value;
    });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
