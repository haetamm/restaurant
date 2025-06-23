import { Router } from 'express';
import { createServerAxiosInstance } from '../config/axios-server-config';

const router = Router();

router.post('/all', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const response = await axiosInstance.get(`/notifications`);
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
    const response = await axiosInstance.put(`/notifications/${body.id}`);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to load profile',
    });
  }
});

export default router;
