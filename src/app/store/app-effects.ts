// auth.effects.ts
import { inject, Injectable } from '@angular/core';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { login, loginFailure, loginSuccess, register, registerFailure, registerSuccess } from './app.action';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { userDTO } from '../shared/services/user.interface';
import { Router } from '@angular/router';
import { AppUrlEnum } from '.././core/const/route-enums';

@Injectable()
export class AuthEffects {
    
    private router = inject(Router)
    private actions$ = inject(Actions)
  constructor( private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ credentials }) =>
        this.authService.getUser(credentials).pipe(
          map((user: userDTO[]) => {
            if (user.length ===0) {
                throw new Error('User not found');
            }
           return loginSuccess({ user:user[0] })}),
          catchError((error) => of(loginFailure({ error: error.message })))
        )
      )
    )
  );
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap(({ credentials }) =>
        this.authService.registerUser(credentials).pipe(
          map((user: userDTO) => registerSuccess({ user:user })),
          catchError((error) => of(registerFailure({ error: error.message })))
        )
      )
    )
  );
  registerSuccessNavigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerSuccess),
      tap(() => {
        this.router.navigate([AppUrlEnum.USER]);
      })
    ),
    { dispatch: false }
  );
  logInSuccessNavigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      tap(() => {
        this.router.navigate([AppUrlEnum.USER]);
      })
    ),
    { dispatch: false }
  );
}
