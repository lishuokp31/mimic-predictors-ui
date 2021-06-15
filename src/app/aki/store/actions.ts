import { Feature, FeatureUnaryValue } from '@core/types';
import {LoadSpecifiedSamplePayload} from '@shared/models';
export class LoadSample {
  static readonly type = '[AKI] load';
}

export class LoadSpecifiedSample {
  static readonly type = '[AKI] LoadSpecified';
  constructor(public payload: LoadSpecifiedSamplePayload) {}
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
