import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export type TargetModel = 'aki' | 'sepsis' | 'mi' | 'vancomycin';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  public loadSample(target: TargetModel): Observable<LoadSampleResponse> {
    const url = `${environment.apiUrl}/load-samples/`;
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
    const url = `${environment.apiUrl}/predict/`;
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
