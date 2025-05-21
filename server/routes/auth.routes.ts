import { Router } from 'express';
import axios from 'axios';
import { BASE_URL } from '../../src/app/shared/utils/constans';

const router = Router();

// Route untuk login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Login failed',
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, phone, email, username, password } = req.body;
    const response = await axios.post(`${BASE_URL}/auth/reg/user`, {
      name,
      phone,
      email,
      username,
      password,
    });
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Register failed',
    });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const response = await axios.post(`${BASE_URL}/auth/forgot-password`, {
      email,
    });
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Register failed',
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
      message: error.response?.data?.message || 'Register failed',
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
      message: error.response?.data?.message || 'Register failed',
    });
  }
});

export default router;
