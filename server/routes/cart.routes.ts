import { Router } from 'express';
import { BASE_URL } from '../../src/app/shared/utils/constans';
import { createServerAxiosInstance } from './axios-server-config';

const router = Router();

router.post('/all', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const response = await axiosInstance.get(`${BASE_URL}/carts`);
    res.json(response.data);
  } catch (error: any) {
    console.log(error);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Login failed',
    });
  }
});

router.put('/update', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const { menuRequest } = req.body;
    const response = await axiosInstance.post(`${BASE_URL}/carts`, {
      menuRequest,
    });
    res.json(response.data);
  } catch (error: any) {
    console.log(error);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Login failed',
    });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const { items } = req.body;
    const payload = { items };
    const response = await axiosInstance.delete(`${BASE_URL}/carts`, {
      data: payload,
    });
    res.json(response.data);
  } catch (error: any) {
    console.log(error);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Login failed',
    });
  }
});

export default router;
