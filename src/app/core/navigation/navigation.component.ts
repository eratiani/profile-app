import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LibButtonComponent } from '../../shared/components/lib-button/lib-button.component';
import { AppUrlEnum } from '../const/route-enums';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppInterface } from '../../store/app.interface';
import { Subject, takeUntil, tap } from 'rxjs';
import { logOut } from '../../store/app.action';

@Component({
  selector: '[app-navigation]',
  standalone: true,
  imports: [LibButtonComponent, RouterLink],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  public routeEnum = AppUrlEnum;
  userLoggedIn = false;
  private store = inject(Store<AppInterface>);
  ngOnInit(): void {
    this.store
      .pipe(
        tap((state: { app: AppInterface }) => {
          this.userLoggedIn = state.app.auth.isLoggedIn;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  onUserLogOut() {
    this.store.dispatch(logOut());
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
