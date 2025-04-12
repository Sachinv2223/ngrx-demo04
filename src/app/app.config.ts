import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { userFeatureKey, userReducer } from './users/user.reducer';
import { UserEffects } from './users/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // Provide the global store
    provideStore({ userFeatureKey: userReducer }), // We'll add reducers later using provideState

    // Provide effects
    provideEffects([UserEffects]), // We'll add effects later using provideEffects

    // Provide Store DevTools (only in development)
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode in production
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, // If set to true, will include stack trace for every dispatched action
      traceLimit: 75, // Maximum stack trace frames to be stored (in case trace is true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
  ]
};
