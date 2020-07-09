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
  public showPredictions$: Observable<boolean>;
  public predictions$: Observable<List<number>>;
  public showWeights$: Observable<boolean>;
  public weights$: Observable<List<List<number>>>;

  constructor(private store: Store) {
    this.x$ = this.store.select(AppState.sepsisX);
    this.showPredictions$ = this.store.select(AppState.showSepsisPredictions);
    this.predictions$ = this.store.select(AppState.sepsisPredictions);
    this.showWeights$ = this.store.select(AppState.showSepsisWeights);
    this.weights$ = this.store.select(AppState.sepsisWeights);
  }

  public onLoadSample() {
    this.store.dispatch(new Sepsis.LoadSample());
  }

  public onReset() {}

  public onPredict() {
    this.store.dispatch(new Sepsis.Predict());
  }
}
