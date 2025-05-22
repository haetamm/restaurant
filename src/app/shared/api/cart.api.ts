import { createAxiosInstance } from './axios-config';
import { errorHandle } from '../utils/helper';
import { CartItemRequest, CartRequest } from '../services/cart.service';

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
      const response = await axiosInstance.put('/api/cart/update', {
        menuRequest,
      });
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  deleteItemCart: async ({ items }: CartItemRequest) => {
    try {
      const response = await axiosInstance.delete('/api/cart/delete', {
        data: { items },
      });
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },
};
