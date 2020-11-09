import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Patient } from '@patients/models';

import { environment } from 'src/environments/environment';

@Injectable()
export class PatientsApiService {
  constructor(private http: HttpClient) {}

  public loadAll(): Promise<Patient[]> {
    const url = `${environment.apiUrl}/patients`;
    return this.http.get<Patient[]>(url).toPromise();
  }
}
