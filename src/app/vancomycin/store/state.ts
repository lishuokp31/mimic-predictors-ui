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

import vancomycinFeatures from '@vancomycin/mapping.json';
import * as actions from '@vancomycin/store/actions';

const nFeatures = 224;
const staticFeatureIds = [
  148, // ethnicity
  149, // age
  150, // gender
];
const initialState: StateModel = {
  id: 0,
  features: vancomycinFeatures,
  x: zeros2d(nDays, nFeatures),
  predictions: zeros1d(nDays),
  weights: zeros2d(nDays, nFeatures),
  isLoading: false,
};

@State<StateModel>({
  name: 'vancomycin',
  defaults: initialState,
})
@Injectable()
export class VancomycinState {
  @Selector([VancomycinState])
  static features(state: StateModel): Feature[] {
    return state.features;
  }

  @Selector([VancomycinState])
  static x(state: StateModel): number[][] {
    return state.x;
  }

  @Selector([
    VancomycinState.features,
    VancomycinState.x,
    VancomycinState.emptyDayStart,
  ])
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

  @Selector([VancomycinState.x])
  static emptyDayStart(x: number[][]): number {
    return getEmptyDayStart(x);
  }

  @Selector([VancomycinState.emptyDayStart])
  static disableInfer(emptyDayStart: number): boolean {
    return emptyDayStart === 0;
  }

  @Selector([VancomycinState])
  static predictions(state: StateModel): number[] {
    return state.predictions;
  }

  @Selector([VancomycinState.predictions, VancomycinState.emptyDayStart])
  static slicedPredictions(
    predictions: number[],
    emptyDayStart: number
  ): number[] {
    return predictions.slice(0, emptyDayStart);
  }

  @Selector([VancomycinState])
  static weights(state: StateModel): number[][] {
    return state.weights;
  }

  @Selector([
    VancomycinState.showWeights,
    VancomycinState.features,
    VancomycinState.weights,
  ])
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
            'background-color': `rgba(${wr}, ${wg}, ${wb}, ${weight})`,
          }))
      );
  }

  @Selector([VancomycinState.predictions])
  static showPredictions(predictions: number[]): boolean {
    return predictions.every((probability) => probability != 0);
  }

  @Selector([VancomycinState.weights])
  static showWeights(weights: number[][]): boolean {
    return weights.some((day) => day.some((weight) => weight != 0));
  }

  @Selector([VancomycinState])
  static isLoading(state: StateModel): boolean {
    return state.isLoading;
  }

  constructor(private api: ApiService) {}

  @Action(actions.LoadSample)
  public async loadSample({ patchState }: StateContext<StateModel>) {
    patchState({ isLoading: true });

    const response = await this.api.loadSample('vancomycin');

    patchState({
      id: response.id,
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
    const response = await this.api.predict('vancomycin', x);

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
      predictions: zeros1d(nDays),
      weights: zeros2d(nDays, nFeatures),
    });
  }
}
