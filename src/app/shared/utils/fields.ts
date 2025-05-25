import { FormControl } from '@angular/forms';

export interface LoginFormControls {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}

export const loginFields: Array<{
  name: keyof LoginFormControls;
  type: string;
  label: string;
}> = [
  {
    name: 'username',
    type: 'text',
    label: 'Username',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
  },
];

export interface RegisterFormControls {
  name: FormControl<string | null>;
  username: FormControl<string | null>;
  phone: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export const registerFields: Array<{
  name: keyof RegisterFormControls;
  type: string;
  label: string;
}> = [
  {
    name: 'name',
    type: 'text',
    label: 'Nama',
  },
  {
    name: 'username',
    type: 'text',
    label: 'Username',
  },
  {
    name: 'phone',
    type: 'number',
    label: 'Phone',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
  },
];

export interface ForgotPasswordFormControls {
  email: FormControl<string | null>;
}

export const forgotPasswordFields: Array<{
  name: keyof ForgotPasswordFormControls;
  type: string;
  label: string;
}> = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
  },
];

export interface ResetPasswordFormControls {
  password: FormControl<string | null>;
  passwordConfirmation: FormControl<string | null>;
}

export const resetPasswordFields: Array<{
  name: keyof ResetPasswordFormControls;
  type: string;
  label: string;
}> = [
  {
    name: 'password',
    type: 'password',
    label: 'New Password',
  },
  {
    name: 'passwordConfirmation',
    type: 'password',
    label: 'Password Confirmation',
  },
];

export const filterFields = [
  {
    name: 'price',
    label: 'Harga',
    inputs: [
      { controlName: 'minPrice', placeholder: 'Terendah' },
      { controlName: 'maxPrice', placeholder: 'Tertinggi' },
    ],
  },
  {
    name: 'sortBy',
    label: 'Urutkan',
    options: [
      { id: 'name', label: 'Nama', value: 'name' },
      { id: 'price', label: 'Harga', value: 'price' },
    ],
  },
];

export interface DeliveryBillFormControls {
  recipientName: FormControl<string | null>;
  phone: FormControl<string | null>;
  deliveryAddress: FormControl<string | null>;
}

export const deliveryBillFields: Array<{
  name: keyof DeliveryBillFormControls;
  type: string;
  label: string;
}> = [
  {
    name: 'recipientName',
    type: 'text',
    label: 'Nama Penerima',
  },
  {
    name: 'phone',
    type: 'number',
    label: 'No. Hp. Penerima',
  },
  {
    name: 'deliveryAddress',
    type: 'textarea',
    label: 'Alamat Pengiriman',
  },
];
