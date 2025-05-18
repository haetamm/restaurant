import { createAxiosInstance } from './axios-config';
import { errorHandle } from '../utils/helper';

const axiosInstance = createAxiosInstance();

export const menuApi = {
  getMenus: async (body = {}) => {
    try {
      const response = await axiosInstance.post('/api/menu/all', body);
      const data = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },
};
