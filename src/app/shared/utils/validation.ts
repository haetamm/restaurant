import { z } from 'zod';

const username = z.string().trim().min(1, 'wajib diisi');
const passwordLogin = z.string().trim().min(1, 'wajib diisi');

export const loginSchema = z.object({
  username,
  password: passwordLogin,
});

export type LoginFormType = z.infer<typeof loginSchema>;

const name = z
  .string()
  .trim()
  .min(1, 'Nama wajib diisi')
  .min(4, 'Nama minimal 4 karakter')
  .max(23, 'Nama maksimal 23 karakter')
  .regex(/^[a-zA-Z ]+$/, 'Nama hanya boleh berisi huruf dan spasi');

const phone = z
  .string()
  .trim()
  .min(1, 'Nomor hp wajib diisi')
  .max(25, 'Nomor hp maksimal 25 karakter')
  .regex(/^[0-9 ]+$/, 'Nomor hp hanya boleh berisi angka dan spasi');

const email = z
  .string()
  .trim()
  .min(1, 'Email wajib diisi')
  .email('Masukkan email yang valid');

const usernameRegister = z
  .string()
  .trim()
  .min(1, 'Username wajib diisi')
  .min(3, 'Username minimal 3 karakter')
  .max(8, 'Username maksimal 8 karakter')
  .regex(/^[a-zA-Z0-9]+$/, 'Username hanya boleh berisi huruf dan angka');

const password = z
  .string()
  .trim()
  .min(1, 'Password wajib diisi')
  .min(4, 'Password minimal 4 karakter')
  .max(8, 'Password maksimal 8 karakter')
  .regex(/^[a-zA-Z0-9]+$/, 'Password hanya boleh berisi huruf dan angka');

const passwordConfirmation = z
  .string()
  .trim()
  .min(4, 'Password minimal 4 karakter')
  .max(8, 'Password maksimal 8 karakter');

const address = z
  .string()
  .trim()
  .min(1, 'Alamat wajib diisi')
  .max(225, 'Alamat maksimal 225 karakter');

const tableName = z.string().trim().min(1, 'Meja diisi');

const menuName = z
  .string()
  .trim()
  .min(1, 'Nama wajib diisi')
  .max(50, 'Nama maksimal 50 karakter');

const price = z.coerce
  .number({ invalid_type_error: 'Harga harus berupa angka' })
  .min(1, 'Harga wajib diisi');

const menuCategoryId = z.string().trim().min(1, 'Kategori wajib diisi');

const menuImage = z.custom<File>(
  (value) => {
    if (!value || !(value instanceof File)) {
      return false;
    }

    const allowedMimeTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
    ];
    if (!allowedMimeTypes.includes(value.type)) {
      return false;
    }

    const maxSizeInBytes = 307200;
    if (value.size > maxSizeInBytes) {
      return false;
    }

    return true;
  },
  {
    message: 'Harap unggah gambar (jpg/png/webp) dengan ukuran maksimal 300KB',
  },
);

export const registerSchema = z.object({
  name,
  phone,
  email,
  username: usernameRegister,
  password,
});

export type RegisterFormType = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email,
});

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password,
    passwordConfirmation,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>;

export const deliveryBillSchema = z.object({
  recipientName: name,
  phone,
  deliveryAddress: address,
});

export type DeliveryBillFormType = z.infer<typeof deliveryBillSchema>;

export const adminCartSchema = z.object({
  customerName: name,
  customerPhone: phone,
  tableName,
});

export type AdminCartFormType = z.infer<typeof adminCartSchema>;

export const menuSchema = z.object({
  name: menuName,
  price,
  categoryId: menuCategoryId,
  image: menuImage,
});

export type MenuFormType = z.infer<typeof menuSchema>;
