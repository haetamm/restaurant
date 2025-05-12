import axios, { AxiosInstance } from 'axios';
import { isPlatformBrowser } from '@angular/common';
import { urlPage } from '../utils/constans';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { environment } from '../../../environments/environment';

export const createAxiosInstance = (
  cookieService: SsrCookieService,
  platformId: Object,
): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: environment.baseUrl,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = cookieService.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;
      if (
        response &&
        response.status === 401 &&
        isPlatformBrowser(platformId)
      ) {
        cookieService.delete('token');
        window.location.assign(`${urlPage.LOGIN}`);
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};
