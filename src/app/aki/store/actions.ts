import { Feature, FeatureUnaryValue } from '@core/types';

export class LoadSample {
  static readonly type = '[AKI] load';
}

export class Reset {
  static readonly type = '[AKI] reset';
}

export class Predict {
  static readonly type = '[AKI] predict';
}

export class Change {
  static readonly type = '[AKI] change';
  constructor(
    public feature: Feature,
    public day: number,
    public value: FeatureUnaryValue
  ) {}
}
