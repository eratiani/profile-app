import { Routes } from '@angular/router';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AppUrlEnum } from './core/const/route-enums';

export const routes: Routes = [
  { path: '', redirectTo: AppUrlEnum.HOME, pathMatch: 'full' },
  { path: AppUrlEnum.HOME, component: UserPageComponent },
  {
    path: AppUrlEnum.SIGNIN,
    loadComponent: () =>
      import('./components/auth/auth.component').then((m) => m.AuthComponent),
    data: { pageRoute: AppUrlEnum.SIGNIN },
  },
  {
    path: AppUrlEnum.REGISTRATION,
    loadComponent: () =>
      import('./components/auth/auth.component').then((m) => m.AuthComponent),
    data: { pageRoute: AppUrlEnum.REGISTRATION },
  },
  {
    path: `${AppUrlEnum.HOME}/:id`,
    loadComponent: () =>
      import('./components/user-profile-edit/user-profile-edit.component').then(
        (m) => m.UserProfileEditComponent
      ),
  },
];
