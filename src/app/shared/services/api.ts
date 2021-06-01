import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import{ Similarity } from '@shared/models'

@Injectable()
export class SimilaritiesApiService {
  constructor(private http: HttpClient) {}

  public loadAll(current_id: string): Observable<Similarity[]> {
    console.log("current_id:" + current_id)
    const url = `${environment.apiUrl}/similarity/${current_id}`;
    return this.http.get<Similarity[]>(url);
  }
}









