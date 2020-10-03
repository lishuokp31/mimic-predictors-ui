import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Feature } from '@core/types';
import { VancomycinState } from '@vancomycin/store';
import * as actions from '@vancomycin/store/actions';

@Component({
  selector: 'app-vancomycin',
  templateUrl: './vancomycin.component.html',
  styleUrls: ['./vancomycin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VancomycinComponent {
  public features$: Observable<Feature[]>;
  public x$: Observable<number[][]>;
  public formattedX$: Observable<string[][]>;
  public weights$: Observable<object[][]>;
  public slicedPredictions$: Observable<number[]>;
  public showPredictions$: Observable<boolean>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.features$ = this.store.select(VancomycinState.features);
    this.x$ = this.store.select(VancomycinState.x);
    this.formattedX$ = this.store.select(VancomycinState.formattedX);
    this.weights$ = this.store.select(VancomycinState.computedWeights);
    this.slicedPredictions$ = this.store.select(
      VancomycinState.slicedPredictions
    );
    this.showPredictions$ = this.store.select(VancomycinState.showPredictions);
    this.isLoading$ = this.store.select(VancomycinState.isLoading);
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
