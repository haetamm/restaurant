import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { Request } from 'express';
import { environment } from '../../src/environments/environment';
const BASE_URL = environment.baseUrl;

export const createServerAxiosInstance = (req: Request): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = req.headers.authorization?.split(' ')[1];
      config.headers.set('Authorization', `Bearer ${token}`);
      return config;
    },
    (error) => Promise.reject(error),
  );

  return axiosInstance;
};
