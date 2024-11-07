import { Routes } from '@angular/router';
import { AppUrlEnum } from './core/const/route-enums';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: AppUrlEnum.HOME, pathMatch: 'full' },
  { path: AppUrlEnum.HOME, component: HomeComponent },
  {
    path: AppUrlEnum.SIGNIN,
    loadComponent: () =>
      import('./components/auth/auth.component').then((m) => m.AuthComponent),
    data: { pageRoute: AppUrlEnum.SIGNIN },
  },
  {
    path: AppUrlEnum.USER,
    loadComponent: () =>
      import('./components/user-page/user-page.component').then((m) => m.UserPageComponent),
      canActivate: [authGuard],
  },
  {
    path: AppUrlEnum.REGISTRATION,
    loadComponent: () =>
      import('./components/auth/auth.component').then((m) => m.AuthComponent),
    data: { pageRoute: AppUrlEnum.REGISTRATION },
  },
  {
    path: `${AppUrlEnum.USER}/:id`,
    loadComponent: () =>
      import('./components/user-profile-edit/user-profile-edit.component').then(
        (m) => m.UserProfileEditComponent
      ),
      canActivate: [authGuard],
  },
];
