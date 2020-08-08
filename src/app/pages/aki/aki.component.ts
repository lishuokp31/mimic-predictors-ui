import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AppState, Aki } from '../../store';
import { Feature } from '../../typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-aki',
  templateUrl: './aki.component.html',
  styleUrls: ['./aki.component.scss'],
})
export class AkiPage {
  public features$: Observable<Feature[]>;
  public x$: Observable<number[][]>;
  public formattedX$: Observable<string[][]>;
  public predictions$: Observable<number[]>;
  public weights$: Observable<object[][]>;
  public showPredictions$: Observable<boolean>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.features$ = this.store.select(AppState.akiFeatures);
    this.x$ = this.store.select(AppState.akiX);
    this.formattedX$ = this.store.select(AppState.akiFormattedX);
    this.predictions$ = this.store.select(AppState.akiPredictions);
    this.weights$ = this.store.select(AppState.akiComputedWeights);
    this.showPredictions$ = this.store.select(AppState.showAkiPredictions);
    this.isLoading$ = this.store.select(AppState.isAkiLoading);
  }

  public onLoadSample() {
    this.store.dispatch(new Aki.LoadSample());
  }

  public onReset() {
    this.store.dispatch(new Aki.Reset());
  }

  public onPredict() {
    this.store.dispatch(new Aki.Predict());
  }
}
