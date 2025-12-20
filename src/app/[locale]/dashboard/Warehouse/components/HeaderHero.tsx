'use client';

import { Button } from '@/components/ui/button';
import React, { FC } from 'react';
import { HeroHeaderProps } from '../types/types';
import { useTranslations, useLocale } from 'next-intl';

const HeaderHero: FC<HeroHeaderProps> = ({ handleButton }) => {
  const t = useTranslations('headerHero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <div className='flex flex-row justify-between py-5'>
        <h1 className='text-3xl font-bold'>{t('componentName')}</h1>
        <Button onClick={() => handleButton(true)}>{t('buttonName')}</Button>
      </div>
    </div>
  );
};

export default HeaderHero;
