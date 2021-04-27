import { Injectable } from '@angular/core';
import {
  createEntityCollections,
  EntityDictionary,
} from '@angular-ru/common/entity';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataEntityCollectionsRepository } from '@ngxs-labs/data/repositories';

import { Ner } from '@ner/models';
import * as actions from '@ner/store/actions';
import { NerStateModel } from '@ner/store/types';
import { NerApiService } from '@ner/services';

import {
  zeros2d,
} from '@core/utils';

// @StateRepository()
// @State({
//   name: 'nerEntities',
//   defaults: createEntityCollections(),
// })
// @Injectable()
// export class NerEntitiesState extends NgxsDataEntityCollectionsRepository<Ner,string> {
//   public primaryKey: string = 'id';
// }

@State<NerStateModel>({
  name: 'ner',
  defaults: {
    isLoading: false,
    sequence : "",
    entities : [],
    file_sequence: [],
    file_entities: [],
  },
})
@Injectable()
export class NerState {
  constructor(
    private api: NerApiService,
    // private nerEntities: NerEntitiesState
  ) {}

  @Selector([NerState])
  public static isLoading(state: NerStateModel) : boolean {
    return state.isLoading;
  }

  @Selector([NerState])
  public static sequence(state: NerStateModel) : string {
    return state.sequence;
  }

  @Selector([NerState])
  public static entities(state: NerStateModel) : string[][] {
    return state.entities;
  }

  @Selector([NerState])
  public static file_sequence(state: NerStateModel) : string[] {
    return state.file_sequence;
  }

  @Selector([NerState])
  public static file_entities(state: NerStateModel) : string[][][] {
    return state.file_entities;
  }

  // @Selector([NerEntitiesState])
  // public static nerCollection(
  //   state: NerEntitiesState
  // ): EntityDictionary<string, Ner> {
  //   return state.entities;
  // }

  // @Selector([NerState.nerCollection])
  // public static ner(nerCollection: EntityDictionary<string, Ner>): Ner[] {
  //   return Object.values(nerCollection);
  // }

  // @Selector([NerState])
  // private static selectedNerId(state: NerStateModel): string | null {
  //   return state.selectedNerId;
  // }

  // @Selector([NerState.selectedNerId, NerState.nerCollection])
  // public static selectedNer(
  //   selectedNerId: string | null,
  //   ner: EntityDictionary<string, Ner>
  // ): Ner | null {
  //   return selectedNerId ? ner[selectedNerId] : null;
  // }

  // @Action(actions.LoadAll)
  // public async loadAll({ patchState }: StateContext<NerStateModel>) {
  //   patchState({ isLoading: true });

  //   const ner = await this.api.loadAll().toPromise();
  //   this.nerEntities.setAll(ner);

  //   patchState({ isLoading: false });
  // }

  // @Action(actions.LoadOne)
  // public async loadOne(
  //   _: StateContext<NerStateModel>,
  //   { id }: actions.LoadOne
  // ) {
  //   const ner = await this.api.getById(id).toPromise();
  //   this.nerEntities.upsertOne(ner);
  // }

  // @Action(actions.NerLoadedAction)
  // public nerLoaded(
  //   {}: StateContext<NerStateModel>,
  //   { ner }: actions.NerLoadedAction
  // ) {
  //   this.nerEntities.addOne(ner);
  // }

  // @Action(actions.SelectedNerChangedAction)
  // public selectedNerChanged(
  //   { patchState }: StateContext<NerStateModel>,
  //   { id }: actions.SelectedNerChangedAction
  // ) {
  //   patchState({ selectedNerId: id });
  // }

  @Action(actions.ImportNerByTXTAction)
  public async importNerByTXT(
    { patchState }: StateContext<NerStateModel>,
    { payload }: actions.ImportNerByTXTAction
  ) {
    patchState({ isLoading: true });

    try {
      const entities = await this.api.importByTXT(payload);
      console.log('entities:' + entities);
      // this.nerEntities.addOne(entities);
      patchState({
        sequence : entities.sequence,
        entities : entities.entities,
      })
    } catch (e) {
      console.error(e);
    } finally {
      patchState({ isLoading: false });
    }
  }

  @Action(actions.ImportNerByFileAction)
  public async importNerByFile(
    { patchState }: StateContext<NerStateModel>,
    { payload }: actions.ImportNerByFileAction
  ) {
    patchState({ isLoading: true });

    try {
      const file_entities = await this.api.importByFile(payload);
      console.log('file_entities:' + file_entities);
      // this.nerEntities.addOne(entities);
      patchState({
        file_entities : file_entities.file_entities,
      })
    } catch (e) {
      console.error(e);
    } finally {
      patchState({ isLoading: false });
    }
  }
}
