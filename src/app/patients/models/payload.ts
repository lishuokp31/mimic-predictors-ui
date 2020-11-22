import { Ethnicity, Gender } from './patient';

export interface ImportPatientPayload {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  weight: number;
  height: number;
  ethnicity: Ethnicity;
  importfile: File;
}
