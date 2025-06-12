import { createAxiosInstance } from './axios-config';
import { errorHandle } from '../utils/helper';
import {
  CustomerRequest,
  CustomerUpdateRequest,
} from '../services/customer.service';

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

  createCustomer: async (customer: CustomerRequest) => {
    try {
      const response = await axiosInstance.post(
        '/api/customer/create',
        customer,
      );
      const { data } = response.data;
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

  deleteCustomer: async (body = {}) => {
    try {
      const response = await axiosInstance.delete('/api/menu/delete', {
        data: body,
      });
      const data = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },
};
