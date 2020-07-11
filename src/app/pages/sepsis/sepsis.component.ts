import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AppState, Sepsis } from '../../store';
import { Feature } from '../../typings';

@Component({
  selector: 'app-sepsis',
  templateUrl: './sepsis.component.html',
  styleUrls: ['./sepsis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SepsisPage {
  public features$: Observable<Feature[]>;
  public x$: Observable<number[][]>;
  public formattedX$: Observable<string[][]>;
  public predictions$: Observable<number[]>;
  public weights$: Observable<object[][]>;
  public showPredictions$: Observable<boolean>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.features$ = this.store.select(AppState.sepsisFeatures);
    this.x$ = this.store.select(AppState.sepsisX);
    this.formattedX$ = this.store.select(AppState.sepsisFormattedX);
    this.predictions$ = this.store.select(AppState.sepsisPredictions);
    this.weights$ = this.store.select(AppState.sepsisComputedWeights);
    this.showPredictions$ = this.store.select(AppState.showSepsisPredictions);
    this.isLoading$ = this.store.select(AppState.isSepsisLoading);
  }

  public onLoadSample() {
    this.store.dispatch(new Sepsis.LoadSample());
  }

  public onReset() {
    this.store.dispatch(new Sepsis.Reset());
  }

  public onPredict() {
    this.store.dispatch(new Sepsis.Predict());
  }
}
