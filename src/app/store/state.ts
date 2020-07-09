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

  constructor(public api: ApiService) {}

  @Action(actions.Sepsis.LoadSample)
  public async sepsisLoadSample({ patchState }: StateContext<AppStateModel>) {
    patchState({ sepsisLoading: true });

    const response = await this.api.loadSample('sepsis').toPromise();
    patchState({
      sepsisX: toList2d(response.x),
      sepsisY: List(response.y),
      sepsisLoading: false,
    });
  }
}
