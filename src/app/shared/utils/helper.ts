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

export const categoriesMenu = [
  { label: 'Semua', link: '/img/all.png', active: true, value: 'all' },
  { label: 'Utama', link: '/img/main.png', active: false, value: 'main' },
  {
    label: 'Gorengan',
    link: '/img/fryer.png',
    active: false,
    value: 'fryer',
  },
  {
    label: 'Sup',
    link: '/img/soup.png',
    active: false,
    value: 'soup',
  },
  { label: 'Minuman', link: '/img/drink.png', active: false, value: 'drink' },
];
