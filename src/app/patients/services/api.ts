import { Injectable } from '@angular/core';

import { Patient, Ethnicity } from '@patients/models';

@Injectable()
export class PatientsApiService {
  public loadAll(): Promise<Patient[]> {
    return Promise.resolve([
      { id: '#1', name: '刘怡怡', ethnicity: Ethnicity.Han },
      { id: '#2', name: '刘然然', ethnicity: Ethnicity.Han },
      { id: '#3', name: '刘依然', ethnicity: Ethnicity.Han },
    ]);
  }
}
