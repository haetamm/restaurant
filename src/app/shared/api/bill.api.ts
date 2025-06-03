import { createAxiosInstance } from './axios-config';
import { errorHandle } from '../utils/helper';
import {
  DeliveryBillRequest,
  DineInBillRequest,
} from '../services/bill.service';

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

  createDineInBill: async (request: DineInBillRequest) => {
    try {
      const response = await axiosInstance.post('/api/bill/dine-in', request);
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  getBillByCurrentUser: async (body = {}) => {
    try {
      const response = await axiosInstance.post('/api/bill/me', body);
      const data = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  getBills: async (body = {}) => {
    try {
      const response = await axiosInstance.post('/api/bill/all', body);
      const data = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  getBillById: async (id: string) => {
    try {
      const response = await axiosInstance.post('/api/bill/detail', { id });
      const data = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  currentUserGetBillById: async (id: string) => {
    try {
      const response = await axiosInstance.post('/api/bill/detail/me', { id });
      const data = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },
};
