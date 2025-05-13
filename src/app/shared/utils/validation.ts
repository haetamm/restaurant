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
  .min(1, 'Nomor telepon wajib diisi')
  .max(25, 'Nomor telepon maksimal 25 karakter')
  .regex(/^[0-9 ]+$/, 'Nomor telepon hanya boleh berisi angka dan spasi');

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
