import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import MyPreset from './app/shared/utils/custom-theme';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
      },
    }),
    provideHttpClient(),
    provideHotToastConfig({
      position: 'top-right',
      duration: 3000,
      dismissible: true,
      reverseOrder: true,
      style: {
        padding: '16px',
        background: 'white',
        opacity: '5',
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
}).catch((err) => console.error(err));
