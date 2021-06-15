import { Feature, FeatureMultipleValues, FeatureUnaryValue } from '@core/types';
import {LoadSpecifiedSamplePayload} from '@shared/models';

export class LoadSample {
  static readonly type = '[vancomycin] load';
}

export class LoadSpecifiedSample {
  static readonly type = '[vancomycin] LoadSpecified';
  constructor(public payload: LoadSpecifiedSamplePayload) {}
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
