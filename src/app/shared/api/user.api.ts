import { createAxiosInstance } from './axios-config';
import { errorHandle } from '../utils/helper';

const axiosInstance = createAxiosInstance();
export const userApi = {
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
