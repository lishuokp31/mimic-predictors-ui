import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AppState, Vancomycin } from '../../store';
import { Feature } from '../../typings';

@Component({
  selector: 'app-vancomycin',
  templateUrl: './vancomycin.component.html',
  styleUrls: ['./vancomycin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VancomycinPage {
  public features$: Observable<Feature[]>;
  public x$: Observable<number[][]>;
  public formattedX$: Observable<string[][]>;
  public predictions$: Observable<number[]>;
  public weights$: Observable<object[][]>;
  public showPredictions$: Observable<boolean>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.features$ = this.store.select(AppState.vancomycinFeatures);
    this.x$ = this.store.select(AppState.vancomycinX);
    this.formattedX$ = this.store.select(AppState.vancomycinFormattedX);
    this.predictions$ = this.store.select(AppState.vancomycinPredictions);
    this.weights$ = this.store.select(AppState.vancomycinComputedWeights);
    this.showPredictions$ = this.store.select(
      AppState.showVancomycinPredictions
    );
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
