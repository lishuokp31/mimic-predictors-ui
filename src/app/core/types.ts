export interface StateModel {
  features: Feature[];
  x: number[][];
  y: number[];
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
