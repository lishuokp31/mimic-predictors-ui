import { Feature } from '@core/types';

export class LoadSample {
  static readonly type = '[mi] load';
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
    public value: number
  ) {}
}
