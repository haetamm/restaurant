import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { createAxiosInstance } from './axios-config';
import { errorHandle } from '../utils/helper';

export const userApi = (
  cookieService: SsrCookieService,
  platformId: Object,
) => {
  const axiosInstance = createAxiosInstance(cookieService, platformId);

  return {
    getOwnProfile: async () => {
      try {
        const response = await axiosInstance.post('/api/user/me');
        const { data } = response.data;
        return data;
      } catch (error: any) {
        errorHandle(error);
      }
    },
  };
};
