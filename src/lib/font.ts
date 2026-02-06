import {
  Instrument_Sans,
  Inter,
  Mulish,
  Noto_Sans_Mono,
  Cairo
} from 'next/font/google';

import { cn } from '@/lib/utils';

const fontInstrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument'
});

const fontNotoMono = Noto_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-noto-mono'
});

const fontMulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish'
});

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

const fontCairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '800', '900']
});

export const fontVariables = cn(
  fontInstrument.variable,
  fontNotoMono.variable,
  fontMulish.variable,
  fontInter.variable,
  fontCairo.variable
);

export { fontCairo };
