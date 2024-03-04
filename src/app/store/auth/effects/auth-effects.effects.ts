import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {catchError, map, of, switchMap, tap, withLatestFrom} from 'rxjs';
import {AuthService} from "../../../services/authentication/auth.service"
import { State } from '../..'
import * as fromAuthActions from '../actions/auth-actions.actions'
import {Router} from "@angular/router";
import {selectToken} from "../selectors/auth-selectors.selectors";


@Injectable()
export class AuthEffects {

  public login$ = createEffect(() => this.actions$.pipe(
    ofType(fromAuthActions.login),
    switchMap(({user}) => this.authService.login(user).pipe(
      map((data) => fromAuthActions.loginSuccess({ data })),
      catchError((error) => of(fromAuthActions.loginFailure({ error })))
    ))
  ))

  public loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(fromAuthActions.loginSuccess),
    map(data => fromAuthActions.getUserInfo({token: data.data})),
    tap(() => console.log('Login Success')),
    tap(() => this.router.navigateByUrl('/courses'))
  ))

  public logout$ = createEffect(() => this.actions$.pipe(
    ofType(fromAuthActions.logout),
    switchMap(({name, id}) => this.authService.logout(name, id).pipe(
      map((data) => {
        this.router.navigate(['/login'])
        return fromAuthActions.logoutSuccess({ data })
      }),
      catchError((error) => of(fromAuthActions.logoutFailure({ error })))
    ))
  ))

  public getUserInfo$ = createEffect(() => this.actions$.pipe(
    ofType(fromAuthActions.getUserInfo),
    withLatestFrom(this.store.select(selectToken)),
    switchMap(([{token}, stateToken]) => this.authService.getUserInfo(token || stateToken).pipe(
      map((data) => fromAuthActions.getUserInfoSuccess({ data })),
      catchError((error) => of(fromAuthActions.getUserInfoFailure({ error })))
    ))
  ))

  constructor(
    private actions$: Actions,
    private authService:AuthService,
    private readonly store: Store<State>,
    private router: Router
  ) {}
}
