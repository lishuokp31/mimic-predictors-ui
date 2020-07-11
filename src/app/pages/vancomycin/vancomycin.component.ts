import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { List } from 'immutable';
import { Observable } from 'rxjs';

import { vancomycinFeatures } from '../../mapping.json';
import { AppState, Vancomycin } from '../../store';

@Component({
  selector: 'app-vancomycin',
  templateUrl: './vancomycin.component.html',
  styleUrls: ['./vancomycin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VancomycinPage {
  public readonly features = vancomycinFeatures;

  public x$: Observable<List<List<number>>>;
  public predictions$: Observable<List<number>>;
  public weights$: Observable<List<List<number>>>;
  public showPredictions$: Observable<boolean>;
  public showWeights$: Observable<boolean>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.x$ = this.store.select(AppState.vancomycinX);
    this.predictions$ = this.store.select(AppState.vancomycinPredictions);
    this.weights$ = this.store.select(AppState.vancomycinWeights);
    this.showPredictions$ = this.store.select(
      AppState.showVancomycinPredictions
    );
    this.showWeights$ = this.store.select(AppState.showVancomycinWeights);
    this.isLoading$ = this.store.select(AppState.isVancomycinLoading);
  }

  public onLoadSample() {
    this.store.dispatch(new Vancomycin.LoadSample());
  }

  public onReset() {
    this.store.dispatch(new Vancomycin.Reset());
  }

  public onPredict() {
    this.store.dispatch(new Vancomycin.Predict());
  }
}
