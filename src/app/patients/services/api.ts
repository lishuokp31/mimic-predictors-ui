import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Patient } from '@patients/models';

import { environment } from 'src/environments/environment';

@Injectable()
export class PatientsApiService {
  constructor(private http: HttpClient) {}

  public loadAll(): Observable<Patient[]> {
    const url = `${environment.apiUrl}/patients`;
    return this.http.get<Patient[]>(url);
  }

  public getById(id: string): Observable<Patient> {
    const url = `${environment.apiUrl}/patients/${id}`;
    return this.http.get<Patient>(url);
  }
}
