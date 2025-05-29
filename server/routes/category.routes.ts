import { Router } from 'express';
import { createServerAxiosInstance } from './axios-server-config';

const router = Router();

router.post('/all', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const response = await axiosInstance.get('/categories');
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message:
        error.response?.data?.message || 'Failed to load categories menu',
    });
  }
});

export default router;
