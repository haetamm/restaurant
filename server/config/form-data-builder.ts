import FormData from 'form-data';
import { Request } from 'express';

export function buildMenuFormData(
  req: Request,
  fields: string[] = ['name', 'price', 'categoryId'],
): FormData {
  const formData = new FormData();

  fields.forEach((field) => {
    if (req.body[field]) {
      formData.append(field, req.body[field]);
    }
  });

  const files = req.files as { image?: Express.Multer.File[] };
  if (files?.image?.[0]) {
    const image = files.image[0];
    formData.append('image', image.buffer, {
      filename: image.originalname,
      contentType: image.mimetype,
    });
  }

  return formData;
}
