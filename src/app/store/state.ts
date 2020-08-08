import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';

import {
  akiFeatures,
  sepsisFeatures,
  miFeatures,
  vancomycinFeatures,
} from '../mapping.json';
import { AppStateModel } from './types';
import { ApiService } from '../services';
import * as actions from './actions';
import { Feature } from '../typings';
import { format } from './formatter';

const nDays = 14;
const nFeaturesAki = 16;
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
  akiFeatures,
  akiX: zeros2d(nDays, nFeaturesAki),
  akiY: zeros1d(nDays),
  akiPredictions: zeros1d(nDays),
  akiWeights: zeros2d(nDays, nFeaturesAki),
  akiLoading: false,
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

  @Selector([
    AppState.sepsisFeatures,
    AppState.sepsisX,
    AppState.sepsisEmptyDayStart,
  ])
  static sepsisFormattedX(
    _: AppStateModel,
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

  @Selector([AppState.sepsisX])
  static sepsisEmptyDayStart(_: AppStateModel, x: number[][]): number {
    for (let i = 0; i < x.length; i++) {
      if (x[i].every((value) => value === 0)) {
        // treat empty data as full
        return i === 0 ? Number.POSITIVE_INFINITY : i;
      }
    }

    return Number.POSITIVE_INFINITY;
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
  static showSepsisPredictions(state: AppStateModel) {
    return state.sepsisPredictions.every((probability) => probability != 0);
  }

  @Selector()
  static showSepsisWeights(state: AppStateModel) {
    return state.sepsisWeights.some((day) => day.some((weight) => weight != 0));
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

  @Selector([AppState.miFeatures, AppState.miX, AppState.miEmptyDayStart])
  static miFormattedX(
    _: AppStateModel,
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

  @Selector([AppState.miX])
  static miEmptyDayStart(_: AppStateModel, x: number[][]): number {
    for (let i = 0; i < x.length; i++) {
      if (x[i].every((value) => value === 0)) {
        // treat empty data as full
        return i === 0 ? Number.POSITIVE_INFINITY : i;
      }
    }

    return Number.POSITIVE_INFINITY;
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
  static showMiPredictions(state: AppStateModel) {
    return state.miPredictions.every((probability) => probability != 0);
  }

  @Selector()
  static showMiWeights(state: AppStateModel) {
    return state.miWeights.some((day) => day.some((weight) => weight != 0));
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

  @Selector([
    AppState.vancomycinFeatures,
    AppState.vancomycinX,
    AppState.vancomycinEmptyDayStart,
  ])
  static vancomycinFormattedX(
    _: AppStateModel,
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

  @Selector([AppState.vancomycinX])
  static vancomycinEmptyDayStart(_: AppStateModel, x: number[][]): number {
    for (let i = 0; i < x.length; i++) {
      if (x[i].every((value) => value === 0)) {
        // treat empty data as full
        return i === 0 ? Number.POSITIVE_INFINITY : i;
      }
    }

    return Number.POSITIVE_INFINITY;
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
  static showVancomycinPredictions(state: AppStateModel) {
    return state.vancomycinPredictions.every((probability) => probability != 0);
  }

  @Selector()
  static showVancomycinWeights(state: AppStateModel) {
    return state.vancomycinWeights.some((day) =>
      day.some((weight) => weight != 0)
    );
  }

  @Selector()
  static isVancomycinLoading(state: AppStateModel) {
    return state.vancomycinLoading;
  }

  @Selector()
  static akiFeatures(state: AppStateModel) {
    return state.akiFeatures;
  }

  @Selector()
  static akiX(state: AppStateModel) {
    return state.akiX;
  }

  @Selector([AppState.akiFeatures, AppState.akiX, AppState.akiEmptyDayStart])
  static akiFormattedX(
    _: AppStateModel,
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

  @Selector([AppState.akiX])
  static akiEmptyDayStart(_: AppStateModel, x: number[][]): number {
    for (let i = 0; i < x.length; i++) {
      if (x[i].every((value) => value === 0)) {
        // treat empty data as full
        return i === 0 ? Number.POSITIVE_INFINITY : i;
      }
    }

    return Number.POSITIVE_INFINITY;
  }

  @Selector()
  static akiY(state: AppStateModel) {
    return state.akiY;
  }

  @Selector()
  static akiPredictions(state: AppStateModel) {
    return state.akiPredictions;
  }

  @Selector()
  static akiWeights(state: AppStateModel) {
    return state.akiWeights;
  }

  @Selector([
    AppState.showAkiWeights,
    AppState.akiFeatures,
    AppState.akiWeights,
  ])
  static akiComputedWeights(
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
  static showAkiPredictions(state: AppStateModel) {
    return state.akiPredictions.every((probability) => probability != 0);
  }

  @Selector()
  static showAkiWeights(state: AppStateModel) {
    return state.akiWeights.some((day) => day.some((weight) => weight != 0));
  }

  @Selector()
  static isAkiLoading(state: AppStateModel) {
    return state.akiLoading;
  }

  constructor(private api: ApiService) {}

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

  @Action(actions.Aki.LoadSample)
  public async akiLoadSample({ patchState }: StateContext<AppStateModel>) {
    patchState({ akiLoading: true });

    const response = await this.api.loadSample('aki').toPromise();
    patchState({
      akiX: response.x,
      akiY: response.y,
      akiPredictions: zeros1d(nDays),
      akiWeights: zeros2d(nDays, nFeaturesAki),
      akiLoading: false,
    });
  }

  @Action(actions.Aki.Reset)
  public akiReset({ patchState }: StateContext<AppStateModel>) {
    patchState({
      akiX: zeros2d(nDays, nFeaturesAki),
      akiY: zeros1d(nDays),
      akiPredictions: zeros1d(nDays),
      akiWeights: zeros2d(nDays, nFeaturesAki),
    });
  }

  @Action(actions.Aki.Predict)
  public async akiPredict({
    patchState,
    getState,
  }: StateContext<AppStateModel>) {
    patchState({ akiLoading: true });

    const { akiX } = getState();
    const response = await this.api.predict('aki', akiX).toPromise();
    patchState({
      akiPredictions: response.predictions,
      akiWeights: response.weights,
      akiLoading: false,
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
  const ids = [feature.id, ...feature.relatedIDs];
  const totalWeight = ids
    .map((id) => weights[day][id])
    .reduce((a, v) => a + v, 0);

  return totalWeight;
}
