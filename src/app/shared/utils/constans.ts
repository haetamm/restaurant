import { environment } from '../../../environments/environment';

export const urlPage = {
  WELCOME: '/welcome',
  LOGIN: '/guest/login',
  REGISTER: '/guest/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  CONFIRM: '/confirm',
  HOME: '/on/home',
  CUSTOMER: '/on/customers',
  CART: '/on/cart',
  TRANSACTION: '/on/transaction',
  MENU: '/on/menu',
  TABLE: '/on/table',
  SETTINGS: '/on/settings',
  SETTINGS_PROFILE: '/on/settings/profile',
  SETTINGS_SECURITY: '/on/settings/security',
};

export const BASE_URL = environment.baseUrl;
