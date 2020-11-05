import { Feature, FeatureMultipleValues, FeatureUnaryValue } from '@core/types';

export class LoadSample {
  static readonly type = '[sepsis] load';
}

export class Reset {
  static readonly type = '[sepsis] reset';
}

export class Predict {
  static readonly type = '[sepsis] predict';
}

export class Change {
  static readonly type = '[sepsis] change';
  constructor(
    public feature: Feature,
    public day: number,
    public value: FeatureUnaryValue | FeatureMultipleValues
  ) {}
}
