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

import nerFeatures from '@aki/mapping.json';
import * as actions from '@ner/store/actions';

const nFeatures = 16;
const staticFeatureIds = [
  13, // age
  14, // gender
  15, // ethnicity
];
const initialState: StateModel = {
  features: nerFeatures,
  x: zeros2d(nDays, nFeatures),
  predictions: zeros1d(nDays),
  weights: zeros2d(nDays, nFeatures),
  isLoading: false,
};

@State<StateModel>({
  name: 'ner',
  defaults: initialState,
})
@Injectable()
export class NerState {
  @Selector([NerState])
  static features(state: StateModel): Feature[] {
    return state.features;
  }

  @Selector([NerState])
  static x(state: StateModel): number[][] {
    return state.x;
  }

  @Selector([NerState.features, NerState.x, NerState.emptyDayStart])
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

  @Selector([NerState.x])
  static emptyDayStart(x: number[][]): number {
    return getEmptyDayStart(x);
  }

  @Selector([NerState.emptyDayStart])
  static disableInfer(emptyDayStart: number): boolean {
    return emptyDayStart === 0;
  }

  @Selector([NerState])
  static predictions(state: StateModel): number[] {
    return state.predictions;
  }

  @Selector([NerState.predictions, NerState.emptyDayStart])
  static slicedPredictions(
    predictions: number[],
    emptyDayStart: number
  ): number[] {
    return predictions.slice(0, emptyDayStart);
  }

  @Selector([NerState])
  static weights(state: StateModel): number[][] {
    return state.weights;
  }

  @Selector([NerState.showWeights, NerState.features, NerState.weights])
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

  @Selector([NerState.predictions])
  static showPredictions(predictions: number[]): boolean {
    return predictions.some((probability) => probability != 0);
  }

  @Selector([NerState.weights])
  static showWeights(weights: number[][]): boolean {
    return weights.some((day) => day.some((weight) => weight != 0));
  }

  @Selector([NerState])
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
