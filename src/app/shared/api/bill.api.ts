import { createAxiosInstance } from './axios-config';
import { errorHandle } from '../utils/helper';
import { DeliveryBillRequest } from '../services/bill.service';

const axiosInstance = createAxiosInstance();

export const billApi = {
  createDeliverBill: async (request: DeliveryBillRequest) => {
    try {
      const response = await axiosInstance.post('/api/bill/delivery', request);
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },
};
