import { Similarity } from '@shared/models';
export class LoadAll {
  static readonly type = '[similarities] load all';
  constructor(public current_id: string) {}
}

export class SimilarityLoadedAction {
  static readonly type = '[similarities] similarity loaded';
  constructor(public similarity: Similarity) {}
}

export class SelectedSimilarityChangedAction {
  static readonly type = '[similarities] selected similarity changed';
  constructor(public id: string) {}
}
