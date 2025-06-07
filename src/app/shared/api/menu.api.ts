import { MenuRequest } from './../services/menu.service';
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

  createMenu: async (menu: MenuRequest) => {
    try {
      const formData = new FormData();
      // Kirim field menuRequest secara terpisah
      formData.append('name', menu.name);
      formData.append('price', menu.price.toString()); // Konversi ke string
      formData.append('categoryId', menu.categoryId);
      formData.append('image', menu.image);

      const response = await axiosInstance.post('/api/menu/create', formData);
      const { data } = response.data;
      return data;
    } catch (error: any) {
      console.error(
        'menuApi.createMenu error:',
        error.message,
        error.response?.data,
      );
      errorHandle(error);
    }
  },

  updateMenu: async (body = {}) => {
    try {
      const response = await axiosInstance.put('/api/menu/update', body);
      const data = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  deleteMenu: async (body = {}) => {
    try {
      const response = await axiosInstance.delete('/api/menu/delete', body);
      const data = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },
};
