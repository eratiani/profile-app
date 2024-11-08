import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { LibButtonComponent } from '../../shared/components/lib-button/lib-button.component';
import { AppUrlEnum } from '../const/route-enums';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppInterface } from '../../store/app.interface';
import { tap } from 'rxjs';
import { logOut } from '../../store/app.action';

@Component({
  selector: '[app-navigation]',
  standalone: true,
  imports: [LibButtonComponent, RouterLink],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  public routeEnum = AppUrlEnum;
  userLoggedIn = false;
  private store = inject(Store<AppInterface>);
  ngOnInit(): void {
    this.store
      .pipe(
        tap((state: { app: AppInterface }) => {
          this.userLoggedIn = state.app.auth.isLoggedIn;
        })
      )
      .subscribe();
  }
  onUserLogOut() {
    this.store.dispatch(logOut());
  }
}
