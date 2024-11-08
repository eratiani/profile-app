import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appReducer } from './store/app-reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/app-effects';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState({
      name: 'app',
      reducer: appReducer,
    }),
    provideEffects(AuthEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    importProvidersFrom(BrowserAnimationsModule),
  ],
};
