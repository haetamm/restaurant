import { environment } from '../../../environments/environment';

export const urlPage = {
  WELCOME: '/welcome',
  LOGIN: '/guest/login',
  REGISTER: '/guest/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  CONFIRM: '/confirm',
  HOME: '/on/home',
  CART: '/on/cart',
  TRANSACTION: '/on/transaction',
  MENU: '/on/menu',
  TABLE: '/on/table',
  SETTINGS: '/on/settings',
  SETTINGS_PROFILE: '/on/settings/profile',
  SETTINGS_SECURITY: '/on/settings/security',
  DASHBOARD: '/on/dashboard',
  DASHBOARD_ADMIN: '/on/dashboard/admin',
  DASHBOARD_USER: '/on/dashboard/user',
  CUSTOMER: '/on/dashboard/customer',
};

export const BASE_URL = environment.baseUrl;
export const GOOGLE_REDIRECT_URI = environment.googleRedirectUri;
export const CLIENT_ID = environment.googleClientId;
export const GOOGLE_SCOPE = environment.googleScope;
export const RESPONSE_TYPE = environment.googleResponseType;
export const ACCESS_TYPE = environment.googleAccessType;
