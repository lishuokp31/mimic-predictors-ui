export interface NerStateModel {
  isLoading: boolean;
  sequence: string;
  entities: string[][];
  file_sequence: string[];
  file_entities: string[][][];
}
