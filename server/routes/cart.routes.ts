import { Router } from 'express';
import { createServerAxiosInstance } from './axios-server-config';

const router = Router();

router.post('/all', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const response = await axiosInstance.get('/carts');
    res.json(response.data);
  } catch (error: any) {
    console.log(error);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Network Error',
    });
  }
});

router.put('/update', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const { menuRequest } = req.body;
    const response = await axiosInstance.post('/carts', {
      menuRequest,
    });
    res.json(response.data);
  } catch (error: any) {
    console.log(error);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Network Error',
    });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const { items } = req.body;
    const payload = { items };
    const response = await axiosInstance.delete('/carts', {
      data: payload,
    });
    res.json(response.data);
  } catch (error: any) {
    console.log(error);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Network Error',
    });
  }
});

export default router;
