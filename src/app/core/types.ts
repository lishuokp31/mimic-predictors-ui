export interface StateModel {
  id: number;
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
  header?: string;
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

export function isFeatureValueEqual(
  obj1: FeatureUnaryValue | FeatureMultipleValues,
  obj2: FeatureUnaryValue | FeatureMultipleValues
): boolean {
  // FeatureUnaryValue is just a number so using the built-in
  // equality operator works just fine
  if (isUnaryValue(obj1)) {
    return isUnaryValue(obj2) && obj1 === obj2;
  }

  // At this point, obj1 is guaranteed to be a FeatureMultipleValues
  // if obj2 is not FeatureMultipleValues, then they're not equal
  if (isUnaryValue(obj2)) {
    return false;
  }

  // At this point, both obj1 and obj2 and are instances of FeatureMultipleValues
  // so we just compare their respective aggregate values
  return (
    obj1.mean === obj2.mean &&
    obj1.min === obj2.min &&
    obj1.max === obj2.max &&
    obj1.std === obj2.std
  );
}
