import Cookies from 'js-cookie';
import { createAxiosInstance } from './axios-config';
import { errorHandle } from '../utils/helper';

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
      const response = await axiosInstance.post('/auth/login', {
        username,
        password,
      });
      const { data } = response.data;
      return data.token;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  register: async ({
    name,
    phone,
    email,
    username,
    password,
  }: {
    name: string;
    phone: string;
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      const response = await axiosInstance.post('/auth/reg/user', {
        name,
        phone,
        email,
        username,
        password,
      });
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  forgotPassword: async ({ email }: { email: string }) => {
    try {
      const response = await axiosInstance.post('/auth/forgot-password', {
        email,
      });
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  resetPassword: async ({
    password,
    token,
  }: {
    password: string;
    token: string;
  }) => {
    try {
      const response = await axiosInstance.post(
        `/auth/reset-password?token=${token}`,
        {
          password,
        },
      );
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  activation: async ({ token }: { token: string }) => {
    try {
      const response = await axiosInstance.get(`/auth/confirm?token=${token}`);
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  putAccessToken: (token: string) => {
    Cookies.set('token', token, { expires: 7 });
  },

  removeAccessToken: () => {
    Cookies.remove('token');
  },

  getAccessToken: () => {
    const token = Cookies.get('token');
    return token;
  },
};
