import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import produce from 'immer';

import { nDays, wr, wg, wb } from '@core/constants';
import { ApiService } from '@core/services';
import { StateModel, Feature, isUnaryValue } from '@core/types';
import {
  zeros1d,
  zeros2d,
  format,
  getFeatureWeight,
  getEmptyDayStart,
} from '@core/utils';

import miFeatures from '@mi/mapping.json';
import * as actions from '@mi/store/actions';

const nFeatures = 221;
const staticFeatureIds = [
  144, // ethnicity
  145, // age
  146, // gender
];
const initialState: StateModel = {
  features: miFeatures,
  x: zeros2d(nDays, nFeatures),
  predictions: zeros1d(nDays),
  weights: zeros2d(nDays, nFeatures),
  isLoading: false,
};

@State<StateModel>({
  name: 'mi',
  defaults: initialState,
})
@Injectable()
export class MiState {
  @Selector()
  static features(state: StateModel) {
    return state.features;
  }

  @Selector()
  static x(state: StateModel) {
    return state.x;
  }

  @Selector([MiState.features, MiState.x, MiState.emptyDayStart])
  static formattedX(
    _: StateModel,
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

  @Selector([MiState.x])
  static emptyDayStart(_: StateModel, x: number[][]): number {
    return getEmptyDayStart(x);
  }

  @Selector()
  static predictions(state: StateModel) {
    return state.predictions;
  }

  @Selector([MiState.predictions, MiState.emptyDayStart])
  static slicedPredictions(
    _: StateModel,
    predictions: number[],
    emptyDayStart: number
  ): number[] {
    return predictions.slice(0, emptyDayStart);
  }

  @Selector()
  static weights(state: StateModel) {
    return state.weights;
  }

  @Selector([MiState.showWeights, MiState.features, MiState.weights])
  static computedWeights(
    _: StateModel,
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
            'background-color': `rgba(${wr}, ${wg}, ${wb}, ${weight})`,
          }))
      );
  }

  @Selector()
  static showPredictions(state: StateModel) {
    return state.predictions.every((probability) => probability != 0);
  }

  @Selector()
  static showWeights(state: StateModel) {
    return state.weights.some((day) => day.some((weight) => weight != 0));
  }

  @Selector()
  static isLoading(state: StateModel) {
    return state.isLoading;
  }

  constructor(private api: ApiService) {}

  @Action(actions.LoadSample)
  public async loadSample({ patchState }: StateContext<StateModel>) {
    patchState({ isLoading: true });

    const response = await this.api.loadSample('mi');

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
    const response = await this.api.predict('mi', x);

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
        // static feature
        if (staticFeatureIds.includes(feature.id)) {
          // only features that doesn't have aggregate values
          // are allowed to be static features
          if (!isUnaryValue(value)) {
            const valueAsJson = JSON.stringify(value);
            const featureAsJson = JSON.stringify(feature);
            throw `Invalid value=${valueAsJson} for feature=${featureAsJson}`;
          }

          // static feature values doesn't change every day
          // so updating it means we should update other days too
          const emptyDayStart = getEmptyDayStart(x);
          for (let i = 0; i < emptyDayStart; i++) {
            draft[i][feature.id] = value;
          }
        }
        // dynamic feature
        else {
          if (isUnaryValue(value)) {
            draft[day][feature.id] = value;
          }
          // update feature aggregate values
          else {
            draft[day][feature.id] = value.mean;
            draft[day][feature.aggregates!.min] = value.min;
            draft[day][feature.aggregates!.max] = value.max;
            draft[day][feature.aggregates!.std] = value.std;
          }
        }
      }),
    });
  }
}
