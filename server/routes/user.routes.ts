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

export default router;
