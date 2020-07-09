import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { List } from 'immutable';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:5050/';

export type TargetModel = 'sepsis' | 'mi' | 'vancomycin';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  public loadSample(target: TargetModel): Observable<LoadSampleResponse> {
    const url = `${BASE_URL}load-random-sample`;
    const params = new HttpParams().set('target', target);

    return this.http.get<LoadSampleResponse>(url, { params });
  }

  public predict(
    target: TargetModel,
    data: List<List<number>>
  ): Observable<PredictResponse> {
    const url = `${BASE_URL}predict`;
    const params = new HttpParams().set('target', target);
    const body = JSON.stringify(data);

    return this.http.post<PredictResponse>(url, body, { params });
  }
}

export interface LoadSampleResponse {
  index: number;
  x: number[][];
  y: number[];
}

export interface PredictResponse {
  predictions: number[];
  weights: number[][];
}
