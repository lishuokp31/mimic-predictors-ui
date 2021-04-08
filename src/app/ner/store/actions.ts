import { ImportNerByTXTPayload, Ner } from '@ner/models';

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
  static readonly type = '[ner] import';
  constructor(public payload: ImportNerByTXTPayload) {}
}
