'use client';

import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { HeaderHeroProps } from '../types/types';
import { useLocale, useTranslations } from 'next-intl';

const HeaderHero: FC<HeaderHeroProps> = ({
  handleButton,
  componentName,
  buttonName
}) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('headerHero');

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <div
        className={`m-4 flex items-center justify-between gap-4 ${
          isRTL ? 'flex-row' : 'flex-row'
        }`}
      >
        <h1
          className={`text-xl font-bold sm:text-2xl md:text-3xl ${
            isRTL ? 'text-right' : 'text-left'
          }`}
        >
          {t(componentName)}
        </h1>

        <Button onClick={() => handleButton(true)}>{t(buttonName)}</Button>
      </div>
    </div>
  );
};

export default HeaderHero;
