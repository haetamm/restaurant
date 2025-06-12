import {
  MenuBulkRequest,
  MenuRequest,
  MenuUpdateRequest,
} from './../services/menu.service';
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

  createMenuBulk: async (menus: MenuBulkRequest[]) => {
    try {
      const response = await axiosInstance.post('/api/menu/create/bulk', menus);
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  createMenu: async (menu: MenuRequest) => {
    try {
      const formData = buildMenuFormData(menu);
      const response = await axiosInstance.post('/api/menu/create', formData);
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  updateMenu: async (menu: MenuUpdateRequest) => {
    try {
      const formData = buildMenuFormData(menu);

      const response = await axiosInstance.put('/api/menu/update', formData);
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  deleteMenu: async (body = {}) => {
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

const buildMenuFormData = (menu: any) => {
  const formData = new FormData();
  formData.append('id', menu.id);
  formData.append('name', menu.name);
  formData.append('price', menu.price.toString());
  formData.append('categoryId', menu.categoryId);
  formData.append('image', menu.image);
  return formData;
};
