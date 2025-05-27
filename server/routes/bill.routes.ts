import { Router } from 'express';
import { createServerAxiosInstance } from './axios-server-config';

const router = Router();

router.post('/delivery', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const bill = req.body;
    const response = await axiosInstance.post('/bills/delivery', bill);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to load menus',
    });
  }
});

router.post('/me', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const response = await axiosInstance.get('/bills/me', { params: req.body });
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to load menus',
    });
  }
});

export default router;
