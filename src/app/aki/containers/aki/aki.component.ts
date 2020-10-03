import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Feature } from '@core/types';
import { AkiState } from '@aki/store';
import * as actions from '@aki/store/actions';

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

  constructor(private store: Store) {
    this.features$ = this.store.select(AkiState.features);
    this.x$ = this.store.select(AkiState.x);
    this.formattedX$ = this.store.select(AkiState.formattedX);
    this.weights$ = this.store.select(AkiState.computedWeights);
    this.slicedPredictions$ = this.store.select(AkiState.slicedPredictions);
    this.showPredictions$ = this.store.select(AkiState.showPredictions);
    this.isLoading$ = this.store.select(AkiState.isLoading);
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
}
