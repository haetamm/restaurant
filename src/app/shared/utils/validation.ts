import { z } from 'zod';

const username = z.string().trim().min(1, 'Wajib diisi');
const passwordLogin = z.string().trim().min(1, 'Wajib diisi');

export const loginSchema = z.object({
  username,
  password: passwordLogin,
});

export type LoginFormType = z.infer<typeof loginSchema>;

const name = z
  .string()
  .trim()
  .min(1, 'Wajib diisi')
  .min(4, 'Min. 4 karakter')
  .max(23, 'Max. 23 karakter')
  .regex(/^[a-zA-Z ]+$/, 'Hanya karakter alphabet');

const phone = z
  .string()
  .trim()
  .min(1, 'Wajib diisi')
  .max(25, 'Max. 25 karakter')
  .regex(/^[0-9 ]+$/, 'Hanya karakter numerik');

const email = z.string().trim().min(1, 'Wajib diisi').email('Email invalid');

const usernameRegister = z
  .string()
  .trim()
  .min(1, 'Wajib diisi')
  .min(3, 'Min. 3 karakter')
  .max(8, 'Max. 8 karakter')
  .regex(/^[a-zA-Z0-9]+$/, 'Hanya karakter alphanumerik');

const password = z
  .string()
  .trim()
  .min(1, 'Wajib diisi')
  .min(4, 'Min. 4 karakter')
  .max(8, 'Max. 8 karakter')
  .regex(/^[a-zA-Z0-9]+$/, 'Hanya karakter alphanumerik');

const passwordOptional = z
  .string()
  .trim()
  .transform((val) => (val === '' ? undefined : val))
  .optional()
  .refine(
    (val) =>
      !val ||
      (/^[a-zA-Z0-9]+$/.test(val) && val.length >= 4 && val.length <= 8),
    {
      message: 'Password harus 4-8 karakter dan hanya alphanumerik',
    },
  );

const address = z
  .string()
  .trim()
  .min(1, 'Wajib diisi')
  .max(225, 'Max. 225 karakter');

const addressOptional = z
  .union([
    z.string().trim().max(225, 'Max. 225 karakter'),
    z.literal(''),
    z.null(),
    z.undefined(),
  ])
  .transform((val) => (val === '' || val === null ? undefined : val))
  .optional();

const tableName = z.string().trim().min(1, 'Meja diisi');

const menuName = z
  .string()
  .trim()
  .min(1, 'Wajib diisi')
  .max(50, 'Max. 50 karakter');

const price = z.coerce
  .number({ invalid_type_error: 'Hanya karakter numerik' })
  .min(1, 'Wajib diisi');

const menuCategoryId = z.string().trim().min(1, 'Wajib diisi');

const menuImage = z.custom<File>(
  (value) => {
    if (!value || !(value instanceof File)) {
      return false;
    }

    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
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
    message: 'Harap unggah gambar (jpg/png/jpeg) dengan ukuran Max. 300KB',
  },
);

const menuUpdateImage = z
  .custom<File>(
    (value) => {
      if (!value) return true; // Tidak ada file, boleh karena opsional

      if (!(value instanceof File)) {
        return false;
      }

      const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
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
      message: 'Harap unggah gambar (jpg/png/jpeg) dengan ukuran Max. 300KB',
    },
  )
  .optional();

const menuFile = z.custom<File>(
  (value) => {
    if (!value || !(value instanceof File)) {
      return false;
    }

    const allowedMimeTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
    ];

    if (!allowedMimeTypes.includes(value.type)) {
      return false;
    }

    const maxSizeInBytes = 1024 * 1024; // 1MB
    if (value.size > maxSizeInBytes) {
      return false;
    }

    return true;
  },
  {
    message: 'Harap unggah file Excel (.xls/.xlsx) dengan ukuran Max. 1MB',
  },
);

const confirmationEmailToken = z.string().trim().min(1, 'Wajib diisi');

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
    passwordConfirmation: passwordLogin,
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

export const menuUpdateSchema = z.object({
  name: menuName,
  price,
  categoryId: menuCategoryId,
  image: menuUpdateImage,
});

export type MenuUpdateFormType = z.infer<typeof menuUpdateSchema>;

export const menuBulkSchema = z.object({
  file: menuFile,
});

export type MenuBulkFormType = z.infer<typeof menuBulkSchema>;

export const profileSchema = z.object({
  name,
  phone,
  address,
  username: usernameRegister,
});

export type ProfileFormType = z.infer<typeof profileSchema>;

export const emailChangeSchema = z.object({
  newEmail: email,
  passwordConfirmation: passwordLogin,
});

export type EmailChangeFormType = z.infer<typeof emailChangeSchema>;

export const passwordChangeSchema = z
  .object({
    password,
    repeatPassword: passwordLogin,
    passwordConfirmation: passwordLogin,
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'],
  });

export type PasswordChangeFormType = z.infer<typeof passwordChangeSchema>;

export const confirmEmailSchema = z.object({
  confirmationEmailToken,
});

export type ConfirmEmailFormType = z.infer<typeof confirmEmailSchema>;

export const customerSchema = z.object({
  name,
  phoneNumber: phone,
  address: addressOptional,
});

export type CustomerFormType = z.infer<typeof customerSchema>;

export const registerAdminSchema = z.object({
  username: usernameRegister,
  email,
  password: password,
});

export type RegisterAdminFormType = z.infer<typeof registerAdminSchema>;

export const updateAdminSchema = z.object({
  username: usernameRegister,
  email,
  password: passwordOptional,
});

export type UpdateAdminFormType = z.infer<typeof updateAdminSchema>;
