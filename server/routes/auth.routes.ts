import { Router } from 'express';
import axios from 'axios';
import { BASE_URL } from '../../src/app/shared/utils/constans';
import { createServerAxiosInstance } from '../config/axios-server-config';

const router = Router();

// Route untuk login
router.post('/login', async (req, res) => {
  try {
    const { body } = req;
    const response = await axios.post(`${BASE_URL}/auth/login`, body);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Login failed',
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { body } = req;
    const response = await axios.post(`${BASE_URL}/auth/reg/user`, body);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Register failed',
    });
  }
});

router.post('/register/admin', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const { body } = req;
    const response = await axiosInstance.post('/auth/reg/admin', body);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to delete menu',
    });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { body } = req;
    const response = await axios.post(`${BASE_URL}/auth/forgot-password`, body);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Request failed',
    });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    const response = await axios.post(
      `${BASE_URL}/auth/reset-password?token=${token}`,
      {
        password,
      },
    );
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Reset password failed',
    });
  }
});

router.post('/confirm', async (req, res) => {
  try {
    const { token } = req.body;
    const response = await axios.get(`${BASE_URL}/auth/confirm?token=${token}`);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Activation account failed',
    });
  }
});

export default router;
