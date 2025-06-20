import { Router } from 'express';
import { createServerAxiosInstance } from '../config/axios-server-config';

const router = Router();

router.post('/all', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const response = await axiosInstance.get('/customers', {
      params: req.body,
    });
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to load customers',
    });
  }
});

router.put('/update', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const { body } = req;
    const response = await axiosInstance.put(`/customers/${body.id}`, body);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to update customer',
    });
  }
});

router.post('/detail', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const { id } = req.body;
    const response = await axiosInstance.get(`/customers/${id}`);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to update customer',
    });
  }
});

export default router;
