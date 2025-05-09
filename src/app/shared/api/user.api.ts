import { errorHandle } from '../utils/helper';
import { createAxiosInstance } from './axios-config';

const axiosInstance = createAxiosInstance();

export const userApi = {
  getOwnProfile: async () => {
    try {
      const response = await axiosInstance.get('/user');
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },
};
