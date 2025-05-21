import { createAxiosInstance } from './axios-config';
import { errorHandle } from '../utils/helper';
import { CartRequest } from '../services/cart.service';

const axiosInstance = createAxiosInstance();

export const cartApi = {
  fetchCart: async () => {
    try {
      const response = await axiosInstance.post('/api/cart/all');
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  updateCart: async ({ menuRequest }: CartRequest) => {
    try {
      const response = await axiosInstance.post('/api/cart/create', {
        menuRequest,
      });
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },
};
