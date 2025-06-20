import { createAxiosInstance } from './axios-config';
import { errorHandle } from '../utils/helper';
import Cookies from 'js-cookie';
import {
  RegisterUser,
  RegisterUserGoogle,
  ResetPass,
  SocialiteRequest,
} from '../services/auth.service';
import { RegisterAdminRequest } from '../services/admin.service';

const axiosInstance = createAxiosInstance();

export const authApi = {
  login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', {
        username,
        password,
      });
      const { data } = response.data;
      return data.token;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  socialite: async (payload: SocialiteRequest) => {
    try {
      const response = await axiosInstance.post('/api/auth/socialite', payload);
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  registerUserGoogle: async (payload: RegisterUserGoogle) => {
    try {
      const response = await axiosInstance.post(
        '/api/auth/register/user-google',
        payload,
      );
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  register: async (payload: RegisterUser) => {
    try {
      const response = await axiosInstance.post('/api/auth/register', payload);
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  registerAdmin: async (payload: RegisterAdminRequest) => {
    try {
      const response = await axiosInstance.post(
        '/api/auth/register/admin',
        payload,
      );
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  forgotPassword: async ({ email }: { email: string }) => {
    try {
      const response = await axiosInstance.post('/api/auth/forgot-password', {
        email,
      });
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  resetPassword: async (payload: ResetPass) => {
    try {
      const response = await axiosInstance.post(
        '/api/auth/reset-password',
        payload,
      );
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  activation: async ({ token }: { token: string }) => {
    try {
      const response = await axiosInstance.post('/api/auth/confirm', {
        token,
      });
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  putAccessToken: (token: string) => {
    Cookies.set('token', token, {
      expires: 7,
      path: '/',
      secure: false,
      sameSite: 'Lax',
    });
  },

  removeAccessToken: () => {
    Cookies.remove('token');
  },

  getAccessToken: () => {
    const token = Cookies.get('token');
    return token;
  },
};
