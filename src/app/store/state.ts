import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';

import {
  sepsisFeatures,
  miFeatures,
  vancomycinFeatures,
} from '../mapping.json';
import { AppStateModel } from './types';
import { ApiService } from '../services';
import * as actions from './actions';
import { Feature } from '../typings';

const nDays = 14;
const nFeaturesSepsis = 225;
const nFeaturesMi = 221;
const nFeaturesVancomycin = 224;
const weightBaseColor = '#2196F3';
const [wr, wg, wb] = [
  parseInt(weightBaseColor.slice(1, 3), 16),
  parseInt(weightBaseColor.slice(3, 5), 16),
  parseInt(weightBaseColor.slice(5, 7), 16),
];

export const initialState: AppStateModel = {
  sepsisFeatures,
  sepsisX: zeros2d(nDays, nFeaturesSepsis),
  sepsisY: zeros1d(nDays),
  sepsisPredictions: zeros1d(nDays),
  sepsisWeights: zeros2d(nDays, nFeaturesSepsis),
  sepsisLoading: false,
  miX: zeros2d(nDays, nFeaturesMi),
  miY: zeros1d(nDays),
  miFeatures,
  miPredictions: zeros1d(nDays),
  miWeights: zeros2d(nDays, nFeaturesMi),
  miLoading: false,
  vancomycinFeatures,
  vancomycinX: zeros2d(nDays, nFeaturesVancomycin),
  vancomycinY: zeros1d(nDays),
  vancomycinPredictions: zeros1d(nDays),
  vancomycinWeights: zeros2d(nDays, nFeaturesVancomycin),
  vancomycinLoading: false,
};

@State<AppStateModel>({
  name: 'root',
  defaults: initialState,
})
@Injectable()
export class AppState {
  @Selector()
  static sepsisFeatures(state: AppStateModel) {
    return state.sepsisFeatures;
  }

  @Selector()
  static sepsisX(state: AppStateModel) {
    return state.sepsisX;
  }

  @Selector()
  static sepsisY(state: AppStateModel) {
    return state.sepsisY;
  }

  @Selector()
  static sepsisPredictions(state: AppStateModel) {
    return state.sepsisPredictions;
  }

  @Selector()
  static sepsisWeights(state: AppStateModel) {
    return state.sepsisWeights;
  }

  @Selector()
  static showSepsisPredictions(state: AppStateModel) {
    return state.sepsisPredictions.every((probability) => probability != 0);
  }

  @Selector()
  static showSepsisWeights(state: AppStateModel) {
    return state.sepsisWeights.every((day) =>
      day.every((weight) => weight != 0)
    );
  }

  @Selector([
    AppState.showSepsisWeights,
    AppState.sepsisFeatures,
    AppState.sepsisWeights,
  ])
  static sepsisComputedWeights(
    _: AppStateModel,
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
  static isSepsisLoading(state: AppStateModel) {
    return state.sepsisLoading;
  }

  @Selector()
  static miFeatures(state: AppStateModel) {
    return state.miFeatures;
  }

  @Selector()
  static miX(state: AppStateModel) {
    return state.miX;
  }

  @Selector()
  static miY(state: AppStateModel) {
    return state.miY;
  }

  @Selector()
  static miPredictions(state: AppStateModel) {
    return state.miPredictions;
  }

  @Selector()
  static miWeights(state: AppStateModel) {
    return state.miWeights;
  }

  @Selector()
  static showMiPredictions(state: AppStateModel) {
    return state.miPredictions.every((probability) => probability != 0);
  }

  @Selector()
  static showMiWeights(state: AppStateModel) {
    return state.miWeights.every((day) => day.every((weight) => weight != 0));
  }

  @Selector([AppState.showMiWeights, AppState.miFeatures, AppState.miWeights])
  static miComputedWeights(
    _: AppStateModel,
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
  static isMiLoading(state: AppStateModel) {
    return state.miLoading;
  }

  @Selector()
  static vancomycinFeatures(state: AppStateModel) {
    return state.vancomycinFeatures;
  }

  @Selector()
  static vancomycinX(state: AppStateModel) {
    return state.vancomycinX;
  }

  @Selector()
  static vancomycinY(state: AppStateModel) {
    return state.vancomycinY;
  }

  @Selector()
  static vancomycinPredictions(state: AppStateModel) {
    return state.vancomycinPredictions;
  }

  @Selector()
  static vancomycinWeights(state: AppStateModel) {
    return state.vancomycinWeights;
  }

  @Selector()
  static showVancomycinPredictions(state: AppStateModel) {
    return state.vancomycinPredictions.every((probability) => probability != 0);
  }

  @Selector()
  static showVancomycinWeights(state: AppStateModel) {
    return state.vancomycinWeights.every((day) =>
      day.every((weight) => weight != 0)
    );
  }

  @Selector([
    AppState.showVancomycinWeights,
    AppState.vancomycinFeatures,
    AppState.vancomycinWeights,
  ])
  static vancomycinComputedWeights(
    _: AppStateModel,
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
  static isVancomycinLoading(state: AppStateModel) {
    return state.vancomycinLoading;
  }

  constructor(public api: ApiService) {}

  @Action(actions.Sepsis.LoadSample)
  public async sepsisLoadSample({ patchState }: StateContext<AppStateModel>) {
    patchState({ sepsisLoading: true });

    const response = await this.api.loadSample('sepsis').toPromise();
    patchState({
      sepsisX: response.x,
      sepsisY: response.y,
      sepsisPredictions: zeros1d(nDays),
      sepsisWeights: zeros2d(nDays, nFeaturesSepsis),
      sepsisLoading: false,
    });
  }

  @Action(actions.Sepsis.Reset)
  public sepsisReset({ patchState }: StateContext<AppStateModel>) {
    patchState({
      sepsisX: zeros2d(nDays, nFeaturesSepsis),
      sepsisY: zeros1d(nDays),
      sepsisPredictions: zeros1d(nDays),
      sepsisWeights: zeros2d(nDays, nFeaturesSepsis),
    });
  }

  @Action(actions.Sepsis.Predict)
  public async sepsisPredict({
    patchState,
    getState,
  }: StateContext<AppStateModel>) {
    patchState({ sepsisLoading: true });

    const { sepsisX } = getState();
    const response = await this.api.predict('sepsis', sepsisX).toPromise();
    patchState({
      sepsisPredictions: response.predictions,
      sepsisWeights: response.weights,
      sepsisLoading: false,
    });
  }

  @Action(actions.Mi.LoadSample)
  public async miLoadSample({ patchState }: StateContext<AppStateModel>) {
    patchState({ miLoading: true });

    const response = await this.api.loadSample('mi').toPromise();
    patchState({
      miX: response.x,
      miY: response.y,
      miPredictions: zeros1d(nDays),
      miWeights: zeros2d(nDays, nFeaturesMi),
      miLoading: false,
    });
  }

  @Action(actions.Mi.Reset)
  public miReset({ patchState }: StateContext<AppStateModel>) {
    patchState({
      miX: zeros2d(nDays, nFeaturesMi),
      miY: zeros1d(nDays),
      miPredictions: zeros1d(nDays),
      miWeights: zeros2d(nDays, nFeaturesMi),
    });
  }

  @Action(actions.Mi.Predict)
  public async miPredict({
    patchState,
    getState,
  }: StateContext<AppStateModel>) {
    patchState({ miLoading: true });

    const { miX } = getState();
    const response = await this.api.predict('mi', miX).toPromise();
    patchState({
      miPredictions: response.predictions,
      miWeights: response.weights,
      miLoading: false,
    });
  }

  @Action(actions.Vancomycin.LoadSample)
  public async vancomycinLoadSample({
    patchState,
  }: StateContext<AppStateModel>) {
    patchState({ vancomycinLoading: true });

    const response = await this.api.loadSample('vancomycin').toPromise();
    patchState({
      vancomycinX: response.x,
      vancomycinY: response.y,
      vancomycinPredictions: zeros1d(nDays),
      vancomycinWeights: zeros2d(nDays, nFeaturesVancomycin),
      vancomycinLoading: false,
    });
  }

  @Action(actions.Vancomycin.Reset)
  public vancomycinReset({ patchState }: StateContext<AppStateModel>) {
    patchState({
      vancomycinX: zeros2d(nDays, nFeaturesVancomycin),
      vancomycinY: zeros1d(nDays),
      vancomycinPredictions: zeros1d(nDays),
      vancomycinWeights: zeros2d(nDays, nFeaturesVancomycin),
    });
  }

  @Action(actions.Vancomycin.Predict)
  public async vancomycinPredict({
    patchState,
    getState,
  }: StateContext<AppStateModel>) {
    patchState({ vancomycinLoading: true });

    const { vancomycinX } = getState();
    const response = await this.api
      .predict('vancomycin', vancomycinX)
      .toPromise();
    patchState({
      vancomycinPredictions: response.predictions,
      vancomycinWeights: response.weights,
      vancomycinLoading: false,
    });
  }
}

function zeros1d(length: number): number[] {
  return Array(length).fill(0);
}

function zeros2d(a1: number, a2: number): number[][] {
  return Array(a1).fill(Array(a2).fill(0));
}

function getFeatureWeight(feature: Feature, day: number, weights: number[][]) {
  return [feature.id, ...feature.relatedIDs]
    .map((id) => weights[day][id])
    .reduce((a, v) => a + v, 0);
}
