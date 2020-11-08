import { Patient } from '@patients/models';

export interface PatientsStateModel {
  isLoading: boolean;
  patients: Patient[];
}
