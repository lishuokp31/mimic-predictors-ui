import { AddFavoritePayload, DeleteFavoritePayload ,  Favorite } from '@user/models';

export class LoadAll {
  static readonly type = '[favorites] load all';
  constructor(public username: string) {}
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
  constructor(public payload: AddFavoritePayload) {}
}

export class DeleteFavoriteAction{
  static readonly type = '[favorites] delete';
  constructor(public payload: DeleteFavoritePayload) {}
}


