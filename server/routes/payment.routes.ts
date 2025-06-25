import { Router } from 'express';
import { createServerAxiosInstance } from '../config/axios-server-config';

const router = Router();

router.put('/status', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const { orderId } = req.body;
    const response = await axiosInstance.get(`/payments/status/${orderId}`);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message:
        error.response?.data?.message || 'Failed to load detail transaction ',
    });
  }
});

export default router;
