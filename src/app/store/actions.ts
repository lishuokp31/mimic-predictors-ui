export namespace Sepsis {
  export class LoadSample {
    static readonly type = '[sepsis] load';
  }

  export class Predict {
    static readonly type = '[sepsis] predict';
  }
}

export namespace Mi {
  export class LoadSample {
    static readonly type = '[mi] load';
  }

  export class Predict {
    static readonly type = '[mi] predict';
  }
}

export namespace Vancomycin {
  export class LoadSample {
    static readonly type = '[vancomycin] load';
  }

  export class Predict {
    static readonly type = '[vancomycin] predict';
  }
}
