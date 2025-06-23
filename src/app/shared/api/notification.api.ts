import { createAxiosInstance } from './axios-config';
import { errorHandle } from '../utils/helper';

const axiosInstance = createAxiosInstance();
export const notificationApi = {
  getAll: async () => {
    try {
      const response = await axiosInstance.post('/api/notification/all');
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  updateById: async (id: string) => {
    try {
      const response = await axiosInstance.put('/api/notification/status', {
        id,
      });
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },
};
