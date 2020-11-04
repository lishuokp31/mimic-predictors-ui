import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { MiState } from '@mi/store';
import * as actions from '@mi/store/actions';
import { Feature } from '@core/types';
import { FeatureValueChangeEvent } from '@shared/components';

@Component({
  selector: 'app-mi',
  templateUrl: './mi.component.html',
  styleUrls: ['./mi.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiComponent {
  public features$: Observable<Feature[]>;
  public x$: Observable<number[][]>;
  public formattedX$: Observable<string[][]>;
  public weights$: Observable<object[][]>;
  public slicedPredictions$: Observable<number[]>;
  public showPredictions$: Observable<boolean>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.features$ = this.store.select(MiState.features);
    this.x$ = this.store.select(MiState.x);
    this.formattedX$ = this.store.select(MiState.formattedX);
    this.weights$ = this.store.select(MiState.computedWeights);
    this.slicedPredictions$ = this.store.select(MiState.slicedPredictions);
    this.showPredictions$ = this.store.select(MiState.showPredictions);
    this.isLoading$ = this.store.select(MiState.isLoading);
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

  public onChange(event: FeatureValueChangeEvent) {
    this.store.dispatch(
      new actions.Change(event.feature, event.day, event.newValue)
    );
  }
}
