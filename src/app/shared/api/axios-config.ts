import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { urlPage } from '../utils/constans';

const BASE_URL = 'http://localhost:8081/api';

export const createAxiosInstance = (): AxiosInstance => {
  try {
    const axiosInstance = axios.create({
      baseURL: BASE_URL,
    });

    axiosInstance.interceptors.request.use(
      (config) => {
        const token = Cookies.get('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        if (response && response.status === 401) {
          const token = Cookies.get('token');
          if (token) {
            window.location.assign(`/${urlPage.LOGIN}`);
          }
          Cookies.remove('token');
        }
        return Promise.reject(error);
      },
    );

    return axiosInstance;
  } catch (error) {
    console.error('Error creating axios instance:', error);
    throw error;
  }
};
