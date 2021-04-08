// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   Router,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { Store } from '@ngxs/store';
// import { NerApiService } from '@ner/services';
// import { NerState } from '@ner/store';
// import { Observable, of } from 'rxjs';
// import { switchMap, tap, map, catchError } from 'rxjs/operators';
// import * as actions from '@ner/store/actions';

// @Injectable()
// export class NerExistsGuard implements CanActivate {
//   constructor(
//     private api: NerApiService,
//     private router: Router,
//     private store: Store
//   ) {}

//   public canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ) {
//     const id = route.params.id;
//     return this.hasNer(id);
//   }

//   private hasNer(id: string): Observable<boolean> {
//     return this.hasNerInState(id).pipe(
//       switchMap((inState) => {
//         if (inState) {
//           this.dispatchNerId(id);
//           return of(true);
//         }

//         return this.hasNerInApi(id).pipe(
//           switchMap((inApi) => {
//             if (inApi) {
//               this.dispatchNerId(id);
//               return of(true);
//             }

//             this.router.navigate(['/404']);
//             return of(false);
//           })
//         );
//       })
//     );
//   }

//   private hasNerInState(id: string): Observable<boolean> {
//     return this.store.select(NerState.nerCollection).pipe(
//       switchMap((ner) => of(ner[id])),
//       tap((ner) => {
//         // most ner in the state doesn't have metrics and probabilities
//         // so we try to fetch it in advance (only if ner currently exists)
//         if (
//           ner &&
//           (!('metrics' in ner) || !('probabilities' in ner))
//         ) {
//           this.store.dispatch(new actions.LoadOne(id));
//         }
//       }),
//       map((ner) => ner != null)
//     );
//   }

//   private hasNerInApi(id: string): Observable<boolean> {
//     return this.api.getById(id).pipe(
//       tap((ner) => {
//         if (ner != null) {
//           this.store.dispatch(new actions.NerLoadedAction(ner));
//         }
//       }),
//       map((ner) => ner != null),
//       catchError(() => of(false))
//     );
//   }

//   private dispatchNerId(id: string) {
//     this.store.dispatch(new actions.SelectedNerChangedAction(id));
//   }
// }














