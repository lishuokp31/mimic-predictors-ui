import { ImportNerByTXTPayload, Ner , ImportNerByFilePayload} from '@ner/models';

// export class LoadAll {
//   static readonly type = '[ner] load all';
// }

// export class LoadOne {
//   static readonly type = '[ner] load one';
//   constructor(public id: string) {}
// }

// export class NerLoadedAction {
//   static readonly type = '[ner] ner loaded';
//   constructor(public ner: Ner) {}
// }

// export class SelectedNerChangedAction {
//   static readonly type = '[ner] selected ner changed';
//   constructor(public id: string) {}
// }

export class ImportNerByTXTAction {
  static readonly type = '[ner] import by txt';
  constructor(public payload: ImportNerByTXTPayload) {}
}

export class ImportNerByFileAction {
  static readonly type = '[ner] import by file';
  constructor(public payload: ImportNerByFilePayload) {}
}
