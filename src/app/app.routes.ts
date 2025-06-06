import { Routes } from '@angular/router';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { ActivationPageComponent } from './pages/activation-page/activation-page.component';
import { guestGuard } from './guards/guest.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './guards/auth.guard';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { userGuard } from './guards/user.guard';
import { TransactionPageComponent } from './pages/transaction-page/transaction-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { DiningTablePageComponent } from './pages/dining-table-page/dining-table-page.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
      {
        path: 'welcome',
        component: WelcomePageComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordPageComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordPageComponent,
      },
      {
        path: 'confirm',
        component: ActivationPageComponent,
      },
    ],
  },
  {
    path: 'on',
    component: AuthLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'on',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'transaction',
        component: TransactionPageComponent,
      },
      {
        path: 'cart',
        canActivate: [userGuard],
        component: CartPageComponent,
      },
      {
        path: 'menu',
        component: MenuPageComponent,
      },
      {
        path: 'table',
        component: DiningTablePageComponent,
      },
      {
        path: 'customers',
        component: CustomerPageComponent,
      },
    ],
  },
  {
    path: 'guest',
    loadComponent: () =>
      import('./layouts/guest-layout/guest-layout.component').then(
        (m) => m.GuestLayoutComponent,
      ),
    canActivate: [guestGuard],
    children: [
      {
        path: 'guest',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login-page/login-page.component').then(
            (m) => m.LoginPageComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register-page/register-page.component').then(
            (m) => m.RegisterPageComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    component: NotfoundPageComponent,
  },
];
