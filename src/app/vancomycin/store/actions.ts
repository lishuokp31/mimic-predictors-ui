import { Feature, FeatureMultipleValues, FeatureUnaryValue } from '@core/types';

export class LoadSample {
  static readonly type = '[vancomycin] load';
}

export class Reset {
  static readonly type = '[vancomycin] reset';
}

export class Predict {
  static readonly type = '[vancomycin] predict';
}

export class Change {
  static readonly type = '[vancomycin] change';
  constructor(
    public feature: Feature,
    public day: number,
    public value: FeatureUnaryValue | FeatureMultipleValues
  ) {}
}
