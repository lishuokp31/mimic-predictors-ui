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
  aggregates: FeatureAggregateIDs | null;
}

export interface FeatureAggregateIDs {
  min: number;
  max: number;
  std: number;
}

export type FeatureUnaryValue = number;
export interface FeatureMultipleValues {
  mean: number;
  min: number;
  max: number;
  std: number;
}

export function isUnaryValue(
  obj: FeatureUnaryValue | FeatureMultipleValues
): obj is FeatureUnaryValue {
  return typeof obj === 'number';
}
