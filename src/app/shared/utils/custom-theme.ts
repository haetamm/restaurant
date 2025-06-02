import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fff7ed', // Oranye sangat terang
      100: '#ffedd5', // Oranye terang
      200: '#fed7aa', // Oranye agak terang
      300: '#fdba74', // Oranye sedang
      400: '#fb923c', // Oranye utama
      500: '#f97316', // Oranye default (primary)
      600: '#ea580c', // Oranye lebih gelap
      700: '#c2410c', // Oranye gelap
      800: '#9a3412', // Oranye sangat gelap
      900: '#7c2d12', // Oranye paling gelap
      950: '#431407', // Oranye sangat pekat
    },
  },
});

export default MyPreset;
