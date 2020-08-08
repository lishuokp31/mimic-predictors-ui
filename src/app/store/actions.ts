export namespace Sepsis {
  export class LoadSample {
    static readonly type = '[sepsis] load';
  }

  export class Reset {
    static readonly type = '[sepsis] reset';
  }

  export class Predict {
    static readonly type = '[sepsis] predict';
  }
}

export namespace Mi {
  export class LoadSample {
    static readonly type = '[mi] load';
  }

  export class Reset {
    static readonly type = '[mi] reset';
  }

  export class Predict {
    static readonly type = '[mi] predict';
  }
}

export namespace Vancomycin {
  export class LoadSample {
    static readonly type = '[vancomycin] load';
  }

  export class Reset {
    static readonly type = '[vancomycin] reset';
  }

  export class Predict {
    static readonly type = '[vancomycin] predict';
  }
}

export namespace Aki {
  export class LoadSample {
    static readonly type = '[AKI] load';
  }

  export class Reset {
    static readonly type = '[AKI] reset';
  }

  export class Predict {
    static readonly type = '[AKI] predict';
  }
}
