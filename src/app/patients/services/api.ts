import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ImportPatientPayload, Patient } from '@patients/models';

import { environment } from 'src/environments/environment';

@Injectable()
// 数据交互
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

  public import(payload: ImportPatientPayload): Observable<Patient> {
    const url = `${environment.apiUrl}/patients`;
    const formData = toFormData(payload);

    return this.http.post<Patient>(url, formData);
  }

  // TODO:
}

function toFormData(payload: ImportPatientPayload): FormData {
  const formData = new FormData();
  formData.append('id', payload.id);
  formData.append('name', payload.name);
  formData.append('age', payload.age.toString());
  formData.append('gender', payload.gender);
  formData.append('weight', payload.weight.toString());
  formData.append('height', payload.height.toString());
  formData.append('ethnicity', payload.ethnicity);
  formData.append('importfile', payload.importfile);

  return formData;
}
