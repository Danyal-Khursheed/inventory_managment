import { format } from 'date-fns';
import localFont from 'next/font/local';

export function formatDate(date: Date): string {
  return format(date, 'PP');
}

export const brandoArabic = localFont({
  src: [
    {
      path: '../public/fonts/BrandoArabic-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/BrandoArabic-Bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-brando-arabic',
  display: 'swap'
});

export const fontVariables = `
  ${brandoArabic.variable}
`;
