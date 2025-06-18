import { Router } from '@angular/router';
import { BASE_URL } from './constans';
import { BillResponse } from '../services/bill.service';

export const errorHandle = (error: any) => {
  const errorMessage = error.response?.data?.message;
  if (Array.isArray(errorMessage)) {
    const messages = errorMessage.map((e) => e.message).filter(Boolean);
    throw new Error(
      messages.length > 0 ? messages.join(', ') : 'Validation error',
    );
  }
  throw new Error(errorMessage || error.message || 'Unknown error');
};

export const setGreeting = (): string => {
  const hour = new Date().getHours(); // Ambil jam sekarang (0-23)

  if (hour >= 0 && hour < 10) {
    return 'Selamat Pagi';
  } else if (hour >= 10 && hour < 15) {
    return 'Selamat Siang';
  } else if (hour >= 15 && hour < 19) {
    return 'Selamat Sore';
  } else {
    return 'Selamat Malam';
  }
};

export const categoriesMeta = [
  { label: 'Semua', link: '/img/all.png', active: true, value: 'all' },
  { label: 'Utama', link: '/img/main.png', active: false, value: 'main' },
  {
    label: 'Gorengan',
    link: '/img/fryer.png',
    active: false,
    value: 'fried',
  },
  {
    label: 'Sup',
    link: '/img/soup.png',
    active: false,
    value: 'soup',
  },
  { label: 'Minuman', link: '/img/drink.png', active: false, value: 'drink' },
];

export const isActiveRoute = (
  router: Router,
  prefix: string,
  exact: boolean = false,
): boolean => {
  const currentUrl = router.url.split('?')[0];
  return exact ? currentUrl === prefix : currentUrl.startsWith(prefix);
};

export const createImgUrl = (id: string): string => {
  return id ? BASE_URL + '/menus/' + id + '/images' : '/img/notfound-menu.jpg';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const getMenuNames = (bill: BillResponse): string => {
  if (bill.billDetails && bill.billDetails.length > 0) {
    return bill.billDetails.map((detail) => detail.name).join(', ');
  }
  return 'Tidak ada menu';
};

export const selectPayment = (urlRedirect: string): void => {
  if (!urlRedirect) {
    console.error('URL redirect tidak valid');
    return;
  }

  // Tentukan ukuran pop-up
  const width = 500;
  const height = 700;

  // Hitung posisi tengah
  const left = (screen.width - width) / 2;
  const top = (screen.height - height) / 2;

  // Buka pop-up dengan posisi di tengah
  window.open(
    urlRedirect,
    'paymentPopup',
    `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=no`,
  );
};

export const getUserTooltip = (isEnable: boolean, isAdmin: boolean): string => {
  if (!isAdmin) {
    return 'Access Denied';
  }
  return isEnable ? 'Inactivate' : 'Activate';
};

export const getUserIcon = (isEnable: boolean): string => {
  return isEnable ? 'pi pi-verified' : 'pi pi-ban';
};

export const getUserIconClass = (isEnable: boolean): string => {
  return isEnable ? '!text-green-500' : '!text-red-500';
};

export const navigationLinks = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'menu', label: 'Menu' },
  { id: 'contact', label: 'Contact' },
];
