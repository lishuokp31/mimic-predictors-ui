import { ImportPatientPayload, Patient } from '@patients/models';

export class LoadAll {
  static readonly type = '[patients] load all';
}

export class PatientLoadedAction {
  static readonly type = '[patients] patient loaded';
  constructor(public patient: Patient) {}
}

export class SelectedPatientChangedAction {
  static readonly type = '[patients] selected patient changed';
  constructor(public id: string) {}
}

export class ImportPatientAction {
  static readonly type = '[patients] import';
  constructor(public payload: ImportPatientPayload) {}
}
