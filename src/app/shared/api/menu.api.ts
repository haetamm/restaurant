import { createAxiosInstance } from './axios-config';
import { errorHandle } from '../utils/helper';

const axiosInstance = createAxiosInstance();

export const menuApi = {
  getMenus: async () => {
    try {
      const response = await axiosInstance.post('/api/menu/all');
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },
};
