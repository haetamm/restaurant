import { Router } from 'express';
import { createServerAxiosInstance } from '../config/axios-server-config';

const router = Router();

router.post('/me', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const response = await axiosInstance.get(`/user`);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to load profile',
    });
  }
});

router.put('/me', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const { body } = req;
    const response = await axiosInstance.put(`/user`, body);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to update profile',
    });
  }
});

router.put('/me/pass', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const { body } = req;
    const response = await axiosInstance.put(`/user/credential/1`, body);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to update password',
    });
  }
});

router.put('/me/email', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const { body } = req;
    const response = await axiosInstance.put(`/user/credential/2`, body);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to update email',
    });
  }
});

router.post('/me/confirm-email', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const { body } = req;
    const response = await axiosInstance.post(`/user/confirm-email`, body);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to update email',
    });
  }
});

router.post('/all', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const response = await axiosInstance.get(`/user/all`);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to load profile',
    });
  }
});

router.put('/status', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const { body } = req;
    const response = await axiosInstance.put(`/user/${body.id}`);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to load profile',
    });
  }
});

export default router;
