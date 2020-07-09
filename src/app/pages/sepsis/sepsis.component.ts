import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { List } from 'immutable';
import { Observable } from 'rxjs';

import { sepsisFeatures } from '../../data';
import { AppState, Sepsis } from '../../store';

@Component({
  selector: 'app-sepsis',
  templateUrl: './sepsis.component.html',
  styleUrls: ['./sepsis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SepsisPage {
  public readonly features = sepsisFeatures;

  public x$: Observable<List<List<number>>>;
  public predictions$: Observable<List<number>>;
  public weights$: Observable<List<List<number>>>;
  public showPredictions$: Observable<boolean>;
  public showWeights$: Observable<boolean>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.x$ = this.store.select(AppState.sepsisX);
    this.predictions$ = this.store.select(AppState.sepsisPredictions);
    this.weights$ = this.store.select(AppState.sepsisWeights);
    this.showPredictions$ = this.store.select(AppState.showSepsisPredictions);
    this.showWeights$ = this.store.select(AppState.showSepsisWeights);
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
