import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Feature } from '@core/types';
import { SepsisState } from '@sepsis/store';
import * as actions from '@sepsis/store';

@Component({
  selector: 'app-sepsis',
  templateUrl: './sepsis.component.html',
  styleUrls: ['./sepsis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SepsisComponent {
  public features$: Observable<Feature[]>;
  public x$: Observable<number[][]>;
  public formattedX$: Observable<string[][]>;
  public weights$: Observable<object[][]>;
  public slicedPredictions$: Observable<number[]>;
  public showPredictions$: Observable<boolean>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.features$ = this.store.select(SepsisState.features);
    this.x$ = this.store.select(SepsisState.x);
    this.formattedX$ = this.store.select(SepsisState.formattedX);
    this.weights$ = this.store.select(SepsisState.computedWeights);
    this.slicedPredictions$ = this.store.select(SepsisState.slicedPredictions);
    this.showPredictions$ = this.store.select(SepsisState.showPredictions);
    this.isLoading$ = this.store.select(SepsisState.isLoading);
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
