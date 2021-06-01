import { Injectable } from '@angular/core';
import {
  createEntityCollections,
  EntityDictionary,
} from '@angular-ru/common/entity';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataEntityCollectionsRepository } from '@ngxs-labs/data/repositories';

import { Similarity } from '@shared/models';
import * as actions from '@shared/store/actions';
import { SimilaritiesStateModel } from '@shared/store/types';
import { SimilaritiesApiService } from '@shared/services';

@StateRepository()
@State({
  name: 'similaritiesEntities',
  defaults: createEntityCollections(),
})
@Injectable()
export class SimilaritiesEntitiesState extends NgxsDataEntityCollectionsRepository<
Similarity,
  string
> {
  public primaryKey: string = 'id';
}

@State<SimilaritiesStateModel>({
  name: 'similarities',
  defaults: {
    isLoading: false,
    selectedSimilarityId: null,
  },
})
@Injectable()
export class SimilaritiesState {
  constructor(
    private api: SimilaritiesApiService,
    private similaritiesEntities: SimilaritiesEntitiesState
  ) {}

  @Selector([SimilaritiesState])
  public static isLoading(state: SimilaritiesStateModel) {
    return state.isLoading;
  }

  @Selector([SimilaritiesEntitiesState])
  public static similaritiesCollection(
    state: SimilaritiesEntitiesState
  ): EntityDictionary<string, Similarity> {
    return state.entities;
  }

  @Selector([SimilaritiesState.similaritiesCollection])
  public static similarities(
    similaritiesCollection: EntityDictionary<string, Similarity>
  ): Similarity[] {
    return Object.values(similaritiesCollection);
  }

  @Selector([SimilaritiesState])
  private static selectedSimilarityId(state: SimilaritiesStateModel): string | null {
    return state.selectedSimilarityId;
  }

  @Selector([
    SimilaritiesState.selectedSimilarityId,
    SimilaritiesState.similaritiesCollection,
  ])
  public static selectedSimilarity(
    selectedSimilarityId: string | null,
    similarities: EntityDictionary<string, Similarity>
  ): Similarity | null {
    return selectedSimilarityId ? similarities[selectedSimilarityId] : null;
  }

  @Action(actions.LoadAll)
  public async loadAll(
    { patchState }: StateContext<SimilaritiesStateModel>,
    { current_id }: actions.LoadAll
  ) {
    patchState({ isLoading: true });

    const similarities = await this.api.loadAll(current_id).toPromise();
    console.log(similarities);
    this.similaritiesEntities.setAll(similarities);

    patchState({ isLoading: false });
  }

  @Action(actions.SimilarityLoadedAction)
  public similarityLoaded(
    {}: StateContext<SimilaritiesStateModel>,
    { similarity }: actions.SimilarityLoadedAction
  ) {
    this.similaritiesEntities.addOne(similarity);
  }

  @Action(actions.SelectedSimilarityChangedAction)
  public selectedSimilarityChanged(
    { patchState }: StateContext<SimilaritiesStateModel>,
    { id }: actions.SelectedSimilarityChangedAction
  ) {
    patchState({ selectedSimilarityId: id });
  }

}
