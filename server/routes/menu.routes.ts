import { Request, Response, Router } from 'express';
import { createServerAxiosInstance } from '../config/axios-server-config';
import multer from 'multer';
import FormData from 'form-data';
import { buildMenuFormData } from '../config/form-data-builder';

const router = Router();
const upload = multer();

router.post('/all', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const response = await axiosInstance.get('/menus', { params: req.body });
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to load menus',
    });
  }
});

router.post(
  '/create',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  async (req: Request, res: Response) => {
    try {
      const formData = buildMenuFormData(req);
      const response = await createServerAxiosInstance(req).post(
        '/menus',
        formData,
        {
          headers: formData.getHeaders(),
        },
      );
      res.json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || 'Failed to create menu',
      });
    }
  },
);

router.put(
  '/update',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  async (req: Request, res: Response) => {
    try {
      const formData = buildMenuFormData(req);
      const response = await createServerAxiosInstance(req).put(
        `/menus/${req.body.id}`,
        formData,
        {
          headers: formData.getHeaders(),
        },
      );
      res.json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || 'Failed to create menu',
      });
    }
  },
);

router.delete('/delete', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const { id } = req.body;
    const response = await axiosInstance.delete(`/menus/${id}`);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to delete menu',
    });
  }
});

export default router;
