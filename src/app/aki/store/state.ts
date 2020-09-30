import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';

import { nDays, wr, wg, wb } from '@core/constants';
import { ApiService } from '@core/services';
import { StateModel, Feature } from '@core/types';
import { zeros1d, zeros2d, format, getFeatureWeight } from '@core/utils';

import akiFeatures from '@aki/mapping.json';
import * as actions from '@aki/store/actions';

const nFeatures = 16;
const nAkiDays = 8;
const initialState: StateModel = {
  features: akiFeatures,
  x: zeros2d(nDays, nFeatures),
  y: zeros1d(nDays),
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
  @Selector()
  static features(state: StateModel) {
    return state.features;
  }

  @Selector()
  static x(state: StateModel) {
    return state.x;
  }

  @Selector([AkiState.features, AkiState.x, AkiState.emptyDayStart])
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

  @Selector([AkiState.x])
  static emptyDayStart(_: StateModel, x: number[][]): number {
    for (let i = 0; i < x.length; i++) {
      if (x[i].every((value) => value === 0)) {
        // treat empty data as full
        return i === 0 ? Number.POSITIVE_INFINITY : i;
      }
    }

    return Number.POSITIVE_INFINITY;
  }

  @Selector()
  static y(state: StateModel) {
    return state.y;
  }

  @Selector()
  static predictions(state: StateModel) {
    return state.predictions;
  }

  @Selector()
  static weights(state: StateModel) {
    return state.weights;
  }

  @Selector([AkiState.showWeights, AkiState.features, AkiState.weights])
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
            'background-color': `rgba(${wr}, ${wg}, ${wb}, ${weight / 0.5})`,
          }))
      );
  }

  @Selector()
  static showPredictions(state: StateModel) {
    return state.predictions.some((probability) => probability != 0);
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

    const response = await this.api.loadSample('aki').toPromise();

    // AKI load sample returns only data for 8 days
    // so we fill other days with zeros
    const nExtraDays = nDays - nAkiDays;
    for (let i = 0; i < nExtraDays; i++) {
      response.x.push(Array(nFeatures).fill(0));
    }

    patchState({
      x: response.x,
      y: response.y,
      predictions: zeros1d(nDays),
      weights: zeros2d(nDays, nFeatures),
      isLoading: false,
    });
  }

  @Action(actions.Reset)
  public reset({ patchState }: StateContext<StateModel>) {
    patchState({
      x: zeros2d(nDays, nFeatures),
      y: zeros1d(nDays),
      predictions: zeros1d(nDays),
      weights: zeros2d(nDays, nFeatures),
    });
  }

  @Action(actions.Predict)
  public async predict({ patchState, getState }: StateContext<StateModel>) {
    patchState({ isLoading: true });

    const { x } = getState();
    const slicedX = x.slice(0, nAkiDays);
    const response = await this.api.predict('aki', slicedX).toPromise();

    // AKI model will only return inference results for 8 days
    // so we fill other days with zeros
    const nExtraDays = nDays - nAkiDays;
    for (let i = 0; i < nExtraDays; i++) {
      response.predictions.push(0);
      response.weights.push(Array(nFeatures).fill(0));
    }

    patchState({
      predictions: response.predictions,
      weights: response.weights,
      isLoading: false,
    });
  }
}
