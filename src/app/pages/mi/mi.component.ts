import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { List } from 'immutable';
import { Observable } from 'rxjs';

import { miFeatures } from '../../data';
import { AppState, Mi } from '../../store';

@Component({
  selector: 'app-mi',
  templateUrl: './mi.component.html',
  styleUrls: ['./mi.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiPage {
  public readonly features = miFeatures;

  public x$: Observable<List<List<number>>>;
  public predictions$: Observable<List<number>>;
  public weights$: Observable<List<List<number>>>;
  public showPredictions$: Observable<boolean>;
  public showWeights$: Observable<boolean>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.x$ = this.store.select(AppState.miX);
    this.predictions$ = this.store.select(AppState.miPredictions);
    this.weights$ = this.store.select(AppState.miWeights);
    this.showPredictions$ = this.store.select(AppState.showMiPredictions);
    this.showWeights$ = this.store.select(AppState.showMiWeights);
    this.isLoading$ = this.store.select(AppState.isMiLoading);
  }

  public onLoadSample() {
    this.store.dispatch(new Mi.LoadSample());
  }

  public onReset() {
    this.store.dispatch(new Mi.Reset());
  }

  public onPredict() {
    this.store.dispatch(new Mi.Predict());
  }
}
