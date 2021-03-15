import { Feature, FeatureUnaryValue } from '@core/types';

// export class GetInput {
//   static readonly type = '[Ner] GetInput';
// }

// export class Empty {
//   static readonly type = '[Ner] Empty';
// }

// export class Recognition {
//   static readonly type = '[Ner] Recognition';
// }



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
  static readonly type = '[Ner] change';
  constructor(
    public feature: Feature,
    public day: number,
    public value: FeatureUnaryValue
  ) {}
}

