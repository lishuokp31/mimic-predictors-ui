import { Injectable } from '@angular/core';
import {
  createEntityCollections,
  EntityDictionary,
} from '@angular-ru/common/entity';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataEntityCollectionsRepository } from '@ngxs-labs/data/repositories';

import { Favorite } from '@user/models';
import * as actions from '@user/store/actions';
import { FavoritesStateModel } from '@user/store/types';
import { FavoritesApiService } from '@user/services';

@StateRepository()
@State({
  name: 'favoritesEntities',
  defaults: createEntityCollections(),
})
@Injectable()
export class FavoritesEntitiesState extends NgxsDataEntityCollectionsRepository<
  Favorite,
  string
> {
  public primaryKey: string = 'id';
}

@State<FavoritesStateModel>({
  name: 'favorites',
  defaults: {
    isLoading: false,
    selectedFavoriteId: null,
  },
})
@Injectable()
export class FavoritesState {
  constructor(
    private api: FavoritesApiService,
    private favoritesEntities: FavoritesEntitiesState
  ) {}

  @Selector([FavoritesState])
  public static isLoading(state: FavoritesStateModel) {
    return state.isLoading;
  }

  @Selector([FavoritesEntitiesState])
  public static favoritesCollection(
    state: FavoritesEntitiesState
  ): EntityDictionary<string, Favorite> {
    return state.entities;
  }

  @Selector([FavoritesState.favoritesCollection])
  public static favorites(
    favoritesCollection: EntityDictionary<string, Favorite>
  ): Favorite[] {
    return Object.values(favoritesCollection);
  }

  @Selector([FavoritesState])
  private static selectedFavoriteId(state: FavoritesStateModel): string | null {
    return state.selectedFavoriteId;
  }

  @Selector([
    FavoritesState.selectedFavoriteId,
    FavoritesState.favoritesCollection,
  ])
  public static selectedFavorite(
    selectedFavoriteId: string | null,
    favorites: EntityDictionary<string, Favorite>
  ): Favorite | null {
    return selectedFavoriteId ? favorites[selectedFavoriteId] : null;
  }

  @Action(actions.LoadAll)
  public async loadAll(
    { patchState }: StateContext<FavoritesStateModel>,
    { username }: actions.LoadAll
  ) {
    patchState({ isLoading: true });

    const favorites = await this.api.loadAll(username).toPromise();
    console.log(favorites);
    this.favoritesEntities.setAll(favorites);

    patchState({ isLoading: false });
  }

  @Action(actions.LoadOne)
  public async loadOne(
    _: StateContext<FavoritesStateModel>,
    { id }: actions.LoadOne
  ) {
    const favorite = await this.api.getById(id).toPromise();
    this.favoritesEntities.upsertOne(favorite);
  }

  @Action(actions.FavoriteLoadedAction)
  public favoriteLoaded(
    {}: StateContext<FavoritesStateModel>,
    { favorite }: actions.FavoriteLoadedAction
  ) {
    this.favoritesEntities.addOne(favorite);
  }

  @Action(actions.SelectedFavoriteChangedAction)
  public selectedFavoriteChanged(
    { patchState }: StateContext<FavoritesStateModel>,
    { id }: actions.SelectedFavoriteChangedAction
  ) {
    patchState({ selectedFavoriteId: id });
  }

  @Action(actions.AddFavoriteAction)
  public async addFavorite(
    { patchState }: StateContext<FavoritesStateModel>,
    { payload }: actions.AddFavoriteAction
  ) {
    patchState({ isLoading: true });

    try {
      const favorite = await this.api.add(payload).toPromise();
      this.favoritesEntities.addOne(favorite);
    } catch (e) {
      console.error(e);
    } finally {
      patchState({ isLoading: false });
    }
  }

  @Action(actions.DeleteFavoriteAction)
  public async deleteFavorite(
    { patchState }: StateContext<FavoritesStateModel>,
    { payload }: actions.DeleteFavoriteAction
  ) {
    patchState({ isLoading: true });

    try {
      const favorite = await this.api.deleteFavorite(payload).toPromise();
      console.log(favorite);
      const favorites = await this.api.loadAll(payload.username).toPromise();
      this.favoritesEntities.setAll(favorites);
    } catch (e) {
      console.error(e);
    } finally {
      patchState({ isLoading: false });
    }
  }
}
