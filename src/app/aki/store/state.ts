import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import produce from 'immer';

import { nDays, wr, wg, wb } from '@core/constants';
import { ApiService } from '@core/services';
import { StateModel, Feature } from '@core/types';
import {
  zeros1d,
  zeros2d,
  format,
  getFeatureWeight,
  getEmptyDayStart,
} from '@core/utils';

import akiFeatures from '@aki/mapping.json';
import * as actions from '@aki/store/actions';

const nFeatures = 16;
const staticFeatureIds = [
  13, // age
  14, // gender
  15, // ethnicity
];
const initialState: StateModel = {
  id: 0,
  features: akiFeatures,
  x: zeros2d(nDays, nFeatures),
  predictions: zeros1d(nDays),
  weights: zeros2d(nDays, nFeatures),
  isLoading: false,
};

@State<StateModel>({
  name: 'aki',
  defaults: initialState,
})
@Injectable()
export class AkiState {
  @Selector([AkiState])
  static id(state: StateModel): number {
    return state.id;
  }

  @Selector([AkiState])
  static features(state: StateModel): Feature[] {
    return state.features;
  }

  @Selector([AkiState])
  static x(state: StateModel): number[][] {
    return state.x;
  }

  @Selector([AkiState.features, AkiState.x, AkiState.emptyDayStart])
  static formattedX(
    features: Feature[],
    x: number[][],
    emptyDayStart: number
  ): string[][] {
    return Array(nDays)
      .fill(0)
      .map((_, day) =>
        features.map((feature) =>
          day >= emptyDayStart
            ? '-'
            : format(feature.identifier, feature.group, x[day][feature.id])
        )
      );
  }

  @Selector([AkiState.x])
  static emptyDayStart(x: number[][]): number {
    return getEmptyDayStart(x);
  }

  @Selector([AkiState.emptyDayStart])
  static disableInfer(emptyDayStart: number): boolean {
    return emptyDayStart === 0;
  }

  @Selector([AkiState])
  static predictions(state: StateModel): number[] {
    return state.predictions;
  }

  @Selector([AkiState.predictions, AkiState.emptyDayStart])
  static slicedPredictions(
    predictions: number[],
    emptyDayStart: number
  ): number[] {
    return predictions.slice(0, emptyDayStart);
  }

  @Selector([AkiState])
  static weights(state: StateModel): number[][] {
    return state.weights;
  }

  @Selector([AkiState.showWeights, AkiState.features, AkiState.weights])
  static computedWeights(
    showWeights: boolean,
    features: Feature[],
    weights: number[][]
  ): object[][] {
    if (!showWeights) {
      return Array(nDays).fill(Array(features.length).fill(null));
    }

    return Array(nDays)
      .fill(0)
      .map((_, day) =>
        features
          .map((feature) => getFeatureWeight(feature, day, weights))
          .map((weight) => ({
            'background-color': `rgba(${wr}, ${wg}, ${wb}, ${weight / 0.5})`,
          }))
      );
  }

  @Selector([AkiState.predictions])
  static showPredictions(predictions: number[]): boolean {
    return predictions.some((probability) => probability != 0);
  }

  @Selector([AkiState.weights])
  static showWeights(weights: number[][]): boolean {
    return weights.some((day) => day.some((weight) => weight != 0));
  }

  @Selector([AkiState])
  static isLoading(state: StateModel): boolean {
    return state.isLoading;
  }

  constructor(private api: ApiService) {}

  @Action(actions.LoadSample)
  public async loadSample({ patchState }: StateContext<StateModel>) {
    patchState({ isLoading: true });

    const response = await this.api.loadSample('aki');

    patchState({
      x: response.x,
      id:response.id,
      predictions: zeros1d(nDays),
      weights: zeros2d(nDays, nFeatures),
      isLoading: false,
    });
  }

  @Action(actions.LoadSpecifiedSample)
  public async loadSpecifiedSample(
    { patchState }: StateContext<StateModel>,
    { payload }: actions.LoadSpecifiedSample
  ) {
    patchState({ isLoading: true });
    const response = await this.api.loadSpecifiedSample('aki' , payload);

    patchState({
      x: response.x,
      id:response.id,
      predictions: zeros1d(nDays),
      weights: zeros2d(nDays, nFeatures),
      isLoading: false,
    });
  }

  @Action(actions.Reset)
  public reset({ patchState }: StateContext<StateModel>) {
    patchState({
      x: zeros2d(nDays, nFeatures),
      predictions: zeros1d(nDays),
      weights: zeros2d(nDays, nFeatures),
    });
  }

  @Action(actions.Predict)
  public async predict({ patchState, getState }: StateContext<StateModel>) {
    patchState({ isLoading: true });

    const { x } = getState();
    const response = await this.api.predict('aki', x);

    patchState({
      predictions: response.predictions,
      weights: response.weights,
      isLoading: false,
    });
  }

  @Action(actions.Change)
  public change(
    { getState, patchState }: StateContext<StateModel>,
    action: actions.Change
  ) {
    const { x } = getState();
    const { feature, day, value } = action;

    patchState({
      x: produce(x, (draft) => {
        if (staticFeatureIds.includes(feature.id)) {
          // static feature values doesn't change every day
          // so updating it means we should update other days too
          const emptyDayStart = getEmptyDayStart(x);
          for (let i = 0; i < emptyDayStart; i++) {
            draft[i][feature.id] = value;
          }
        } else {
          draft[day][feature.id] = value;
        }
      }),
      predictions: zeros1d(nDays),
      weights: zeros2d(nDays, nFeatures),
    });
  }
}
