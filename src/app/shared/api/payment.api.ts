import { createAxiosInstance } from './axios-config';
import { errorHandle } from '../utils/helper';

const axiosInstance = createAxiosInstance();

export const paymentApi = {
  updateStatus: async (orderId: string) => {
    try {
      const response = await axiosInstance.put('/api/payment/status', {
        orderId,
      });
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },
};
