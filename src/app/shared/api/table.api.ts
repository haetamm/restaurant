import { createAxiosInstance } from './axios-config';
import { errorHandle } from '../utils/helper';
import { Table } from '../services/table.service';

const axiosInstance = createAxiosInstance();

export const tableApi = {
  getTables: async () => {
    try {
      const response = await axiosInstance.post('/api/table/all');
      const data = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  updateTableById: async (table: Table) => {
    try {
      const response = await axiosInstance.put('/api/table/update', table);
      const data = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },
};
