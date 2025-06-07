import express, { Request, Response, Router } from 'express';
import { createServerAxiosInstance } from './axios-server-config';
import multer from 'multer';
import FormData from 'form-data';

const router = Router();
const upload = multer();

interface MulterFiles {
  [fieldname: string]: Express.Multer.File[];
}

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
      const formData = new FormData();
      ['name', 'price', 'categoryId'].forEach((field) => {
        if (req.body[field]) formData.append(field, req.body[field]);
      });
      const files = req.files as { image?: Express.Multer.File[] };
      if (files.image?.[0]) {
        const image = files.image[0];
        formData.append('image', image.buffer, {
          filename: image.originalname,
          contentType: image.mimetype,
        });
      }
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

router.put('/update', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const { body } = req;
    const response = await axiosInstance.put(`/menus/${body.id}`, body);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to update menu',
    });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const axiosInstance = createServerAxiosInstance(req);
    const { body } = req;
    const response = await axiosInstance.delete(`/menus/${body.id}`);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to delete menu',
    });
  }
});

export default router;
