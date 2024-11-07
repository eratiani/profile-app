import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppInterface } from '../../store/app.interface';
import { distinctUntilChanged, map, of } from 'rxjs';
import { AppUrlEnum } from "../../core/const/route-enums";
export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppInterface>)
  const router = inject(Router)
  return store.pipe(
    select((state: {app:AppInterface} ) => {
      return state}),
      distinctUntilChanged(),
    map((state) => {
      if (state.app.auth.isLoggedIn) {
        return true;
      } else {
        router.navigate([AppUrlEnum.SIGNIN]);
        return false;
      }
    })
  );
};
