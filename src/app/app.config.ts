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
        background: 'rgb(34, 197, 94)', // Tailwind bg-green-500
        opacity: '5',
        border: '1px solid rgb(22, 163, 74)', // Tailwind border-green-600
      },
      error: {
        style: {
          color: 'white',
          opacity: '5',
          background: 'rgb(239, 68, 68)', // Tailwind bg-red-500
          border: '1px solid rgb(220, 38, 38)', // Tailwind border-red-600
        },
      },
    }),
  ],
};
