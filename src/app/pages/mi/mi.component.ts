import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AppState, Mi } from '../../store';
import { Feature } from '../../typings';

@Component({
  selector: 'app-mi',
  templateUrl: './mi.component.html',
  styleUrls: ['./mi.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiPage {
  public features$: Observable<Feature[]>;
  public x$: Observable<number[][]>;
  public predictions$: Observable<number[]>;
  public weights$: Observable<object[][]>;
  public showPredictions$: Observable<boolean>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.features$ = this.store.select(AppState.miFeatures);
    this.x$ = this.store.select(AppState.miX);
    this.predictions$ = this.store.select(AppState.miPredictions);
    this.weights$ = this.store.select(AppState.miComputedWeights);
    this.showPredictions$ = this.store.select(AppState.showMiPredictions);
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
