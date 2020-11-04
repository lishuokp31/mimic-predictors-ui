export interface StateModel {
  features: Feature[];
  x: number[][];
  predictions: number[];
  weights: number[][];
  isLoading: boolean;
}

export interface Feature {
  id: number;
  identifier: string;
  group: string;
  label: string;
  unit: string | null;
  relatedIDs: number[];
}
