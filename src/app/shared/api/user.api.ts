import { createAxiosInstance } from './axios-config';
import { errorHandle } from '../utils/helper';
import {
  ConfirmEmailRequest,
  ProfileRequest,
  UpdateEmailRequest,
  UpdatePasswordRequest,
} from '../services/profile.service';

const axiosInstance = createAxiosInstance();
export const userApi = {
  getOwnProfile: async () => {
    try {
      const response = await axiosInstance.post('/api/user/me');
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  updateOwnProfile: async (profile: ProfileRequest): Promise<any> => {
    try {
      const response = await axiosInstance.put('/api/user/me', profile);
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  updateOwnProfilePassword: async (
    data: UpdatePasswordRequest,
  ): Promise<void> => {
    try {
      await axiosInstance.put('/api/user/me/pass', data);
    } catch (error: any) {
      errorHandle(error);
    }
  },

  updateOwnProfileEmail: async (
    dataEmail: UpdateEmailRequest,
  ): Promise<any> => {
    try {
      const response = await axiosInstance.put('/api/user/me/email', dataEmail);
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  confirmEmail: async (dataEmail: ConfirmEmailRequest): Promise<any> => {
    try {
      const response = await axiosInstance.post(
        '/api/user/me/confirm-email',
        dataEmail,
      );
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  getAllUser: async () => {
    try {
      const response = await axiosInstance.post('/api/user/all');
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },

  activateOrInactivateUser: async (id: string) => {
    try {
      const response = await axiosInstance.post('/api/user/status', { id });
      const { data } = response.data;
      return data;
    } catch (error: any) {
      errorHandle(error);
    }
  },
};
