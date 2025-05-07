import Cookies from 'js-cookie';
import { createAxiosInstance } from './axios-config';

const axiosInstance = createAxiosInstance();
console.log('authApi initialized, axiosInstance:', axiosInstance);

export const authApi = {
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

  errorHandle: (error: any) => {
    const errorMessage = error.response?.data?.message;
    if (Array.isArray(errorMessage)) {
      const messages = errorMessage.map((e) => e.message).filter(Boolean);
      throw new Error(
        messages.length > 0 ? messages.join('\n') : 'Validation error',
      );
    }
    throw new Error(errorMessage || error.message || 'Unknown error');
  },

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
      authApi.errorHandle(error);
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
      authApi.errorHandle(error);
    }
  },
};
