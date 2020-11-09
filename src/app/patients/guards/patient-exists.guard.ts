import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { PatientsApiService } from '@patients/services';
import { PatientsState } from '@patients/store';
import { Observable, of } from 'rxjs';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import * as actions from '@patients/store/actions';

@Injectable()
export class PatientExistsGuard implements CanActivate {
  constructor(
    private api: PatientsApiService,
    private router: Router,
    private store: Store
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const id = route.params.id;
    return this.hasPatient(id);
  }

  private hasPatient(id: string): Observable<boolean> {
    return this.hasPatientInState(id).pipe(
      switchMap((inState) => {
        if (inState) {
          this.dispatchPatientId(id);
          return of(true);
        }

        return this.hasPatientInApi(id).pipe(
          switchMap((inApi) => {
            if (inApi) {
              this.dispatchPatientId(id);
              return of(true);
            }

            this.router.navigate(['/404']);
            return of(false);
          })
        );
      })
    );
  }

  private hasPatientInState(id: string): Observable<boolean> {
    return this.store
      .select(PatientsState.patientsCollection)
      .pipe(switchMap((patients) => of(patients[id] != null)));
  }

  private hasPatientInApi(id: string): Observable<boolean> {
    return this.api.getById(id).pipe(
      tap((patient) => {
        if (patient != null) {
          this.store.dispatch(new actions.PatientLoadedAction(patient));
        }
      }),
      map((patient) => patient != null),
      catchError(() => of(false))
    );
  }

  private dispatchPatientId(id: string) {
    this.store.dispatch(new actions.SelectedPatientChangedAction(id));
  }
}
