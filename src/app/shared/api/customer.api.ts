import { createAxiosInstance } from './axios-config';
import { errorHandle } from '../utils/helper';
import { CustomerUpdateRequest } from '../services/customer.service';

const axiosInstance = createAxiosInstance();

export const customerApi = {
  getCustomers: async (body = {}) => {
    try {
      const response = await axiosInstance.post('/api/customer/all', body);
      const data = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  updateCustomer: async (customerUpdate: CustomerUpdateRequest) => {
    try {
      const response = await axiosInstance.put(
        '/api/customer/update',
        customerUpdate,
      );
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  getCustomer: async (id: string) => {
    try {
      const response = await axiosInstance.post('/api/customer/detail', { id });
      const data = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },
};
