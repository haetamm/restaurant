import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHotToastConfig({
      position: 'top-right',
      duration: 3000,
      dismissible: true,
      reverseOrder: true,
      style: {
        padding: '16px',
        color: '#fff',
        background: '#00aaff',
        opacity: '5',
        border: '1px solid #00aaff',
      },
      error: {
        style: {
          color: 'white',
          opacity: '5',
          background: 'rgb(239, 68, 68)',
          border: '1px solid rgb(220, 38, 38)',
        },
      },
    }),
  ],
};
