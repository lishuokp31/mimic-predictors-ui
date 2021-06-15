import { Feature, FeatureMultipleValues, FeatureUnaryValue } from '@core/types';
import {LoadSpecifiedSamplePayload} from '@shared/models';

export class LoadSample {
  static readonly type = '[mi] load';
}

export class LoadSpecifiedSample {
  static readonly type = '[mi] LoadSpecified';
  constructor(public payload: LoadSpecifiedSamplePayload) {}
}

export class Reset {
  static readonly type = '[mi] reset';
}

export class Predict {
  static readonly type = '[mi] predict';
}

export class Change {
  static readonly type = '[mi] change';
  constructor(
    public feature: Feature,
    public day: number,
    public value: FeatureUnaryValue | FeatureMultipleValues
  ) {}
}
