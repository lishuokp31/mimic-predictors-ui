import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const BASE_URL = 'http://localhost:5050/';

export type TargetModel = 'sepsis' | 'mi' | 'vancomycin';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  public loadSample(target: TargetModel): Observable<LoadSampleResponse> {
    const url = `${BASE_URL}load-random-sample`;
    const params = new HttpParams().set('target', target);

    return this.http
      .get<LoadSampleResponse>(url, { params })
      .pipe(
        tap((x) =>
          console.log(
            `[loadSample] target=${target} index=${x.index} actual=${x.y}`
          )
        )
      );
  }

  public predict(
    target: TargetModel,
    x: number[][]
  ): Observable<PredictResponse> {
    const url = `${BASE_URL}predict`;
    const params = new HttpParams().set('target', target);
    const body = JSON.stringify({ x });

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
