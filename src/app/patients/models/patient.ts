export interface Patient {
  id: string;
  name: string;
  ethnicity: Ethnicity;
}

export enum Ethnicity {
  Han,
  Hui,
  Chaoxian,
}
