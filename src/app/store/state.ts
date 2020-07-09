import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { List } from 'immutable';

import { AppStateModel } from './types';
import { zeros1d, zeros2d, toList2d } from './utils';
import { ApiService } from '../services';
import * as actions from './actions';

export const initialState: AppStateModel = {
  sepsisX: zeros2d(14, 225),
  sepsisY: zeros1d(14),
  sepsisPredictions: zeros1d(14),
  sepsisWeights: zeros2d(14, 225),
  sepsisLoading: false,
  miX: zeros2d(14, 221),
  miY: zeros1d(14),
  miPredictions: zeros1d(14),
  miWeights: zeros2d(14, 221),
  miLoading: false,
  vancomycinX: zeros2d(14, 224),
  vancomycinY: zeros1d(14),
  vancomycinPredictions: zeros1d(14),
  vancomycinWeights: zeros2d(14, 224),
  vancomycinLoading: false,
};

@State<AppStateModel>({
  name: 'root',
  defaults: initialState,
})
@Injectable()
export class AppState {
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

  @Selector()
  static isSepsisLoading(state: AppStateModel) {
    return state.sepsisLoading;
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

  @Selector()
  static isMiLoading(state: AppStateModel) {
    return state.miLoading;
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
      sepsisX: toList2d(response.x),
      sepsisY: List(response.y),
      sepsisPredictions: zeros1d(14),
      sepsisWeights: zeros2d(14, 225),
      sepsisLoading: false,
    });
  }

  @Action(actions.Sepsis.Reset)
  public sepsisReset({ patchState }: StateContext<AppStateModel>) {
    patchState({
      sepsisX: zeros2d(14, 225),
      sepsisY: zeros1d(14),
      sepsisPredictions: zeros1d(14),
      sepsisWeights: zeros2d(14, 225),
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
      sepsisPredictions: List(response.predictions),
      sepsisWeights: toList2d(response.weights),
      sepsisLoading: false,
    });
  }

  @Action(actions.Mi.LoadSample)
  public async miLoadSample({ patchState }: StateContext<AppStateModel>) {
    patchState({ miLoading: true });

    const response = await this.api.loadSample('mi').toPromise();
    patchState({
      miX: toList2d(response.x),
      miY: List(response.y),
      miPredictions: zeros1d(14),
      miWeights: zeros2d(14, 221),
      miLoading: false,
    });
  }

  @Action(actions.Mi.Reset)
  public miReset({ patchState }: StateContext<AppStateModel>) {
    patchState({
      miX: zeros2d(14, 221),
      miY: zeros1d(14),
      miPredictions: zeros1d(14),
      miWeights: zeros2d(14, 221),
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
      miPredictions: List(response.predictions),
      miWeights: toList2d(response.weights),
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
      vancomycinX: toList2d(response.x),
      vancomycinY: List(response.y),
      vancomycinPredictions: zeros1d(14),
      vancomycinWeights: zeros2d(14, 221),
      vancomycinLoading: false,
    });
  }

  @Action(actions.Vancomycin.Reset)
  public vancomycinReset({ patchState }: StateContext<AppStateModel>) {
    patchState({
      vancomycinX: zeros2d(14, 224),
      vancomycinY: zeros1d(14),
      vancomycinPredictions: zeros1d(14),
      vancomycinWeights: zeros2d(14, 224),
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
      vancomycinPredictions: List(response.predictions),
      vancomycinWeights: toList2d(response.weights),
      vancomycinLoading: false,
    });
  }
}
