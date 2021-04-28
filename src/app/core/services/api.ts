import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import produce from 'immer';
import { Userinfo } from '@core/models';

import { environment } from 'src/environments/environment';
import {
  addPaddingDays1d,
  addPaddingDays2d,
  truncatePaddingDays,
} from '@core/utils';
import { nDays } from '@core/constants';

export type TargetModel = 'aki' | 'sepsis' | 'mi' | 'vancomycin';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  public loadSample(target: TargetModel): Promise<LoadSampleResponse> {
    const url = `${environment.apiUrl}/load-sample`;
    const params = new HttpParams().set('target', target);

    return this.http
      .get<LoadSampleResponse>(url, { params })
      .toPromise()
      .then((response) =>
        // the API server only returns the days with actual data
        // but the UI displays up to `nDays` days, so we pad them
        produce(response, (draft) => {
          draft.x = addPaddingDays2d(draft.x, nDays);
        })
      );
  }

  public predict(target: TargetModel, x: number[][]): Promise<PredictResponse> {
    const url = `${environment.apiUrl}/predict`;
    const truncatedX = truncatePaddingDays(x);
    const body = JSON.stringify({ target, x: truncatedX });

    return this.http
      .post<PredictResponse>(url, body)
      .toPromise()
      .then((response) =>
        // same reason as the loadSample function, we pad extra days
        produce(response, (draft) => {
          draft.predictions = addPaddingDays1d(draft.predictions, nDays);
          draft.weights = addPaddingDays2d(draft.weights, nDays);
        })
      );
  }

  userinfo: Userinfo = {
    login: false,
    username: '',
    email: '',
    phone: '',
    level: -1,
  };

  logout(): void {
    this.userinfo = {
      login: false,
      username: '',
      email: '',
      phone: '',
      level: -1,
    };
  }

}

export interface LoadSampleResponse {
  id: number;
  x: number[][];
}

export interface PredictResponse {
  predictions: number[];
  weights: number[][];
}
