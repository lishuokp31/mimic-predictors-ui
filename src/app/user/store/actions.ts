import { FavoritePayload, DeleteFavoritePayload ,  Favorite } from '@user/models';

export class LoadAll {
  static readonly type = '[favorites] load all';
  constructor(public username: string) {}
}

export class LoadAll_User {
  static readonly type = '[users] load all';
  constructor() {}
}

export class LoadOne {
  static readonly type = '[favorites] load one';
  constructor(public id: string) {}
}

export class FavoriteLoadedAction {
  static readonly type = '[favorites] favorite loaded';
  constructor(public favorite: Favorite) {}
}

export class SelectedFavoriteChangedAction {
  static readonly type = '[favorites] selected favorite changed';
  constructor(public id: string) {}
}

export class AddFavoriteAction {
  static readonly type = '[favorites] import';
  constructor(public payload: FavoritePayload) {}
}

export class ModifyFavoriteAction {
  static readonly type = '[favorites] modify';
  constructor(public payload: FavoritePayload) {}
}

export class DeleteFavoriteAction{
  static readonly type = '[favorites] delete';
  constructor(public payload: DeleteFavoritePayload) {}
}


