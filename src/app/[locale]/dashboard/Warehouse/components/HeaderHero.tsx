'use client';
import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { HeroHeaderProps } from '../types/types';
import { useLocale, useTranslations } from 'next-intl';

const HeaderHero: FC<HeroHeaderProps> = ({
  handleButton,
  componentName,
  buttonName
}) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('headerHero');

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <div className='flex flex-row items-center justify-between gap-4 py-5 sm:flex-row'>
        <h1 className='text-center text-xl font-bold sm:text-left sm:text-2xl md:text-3xl'>
          {t('componentName')}
        </h1>

        <Button onClick={() => handleButton(true)} className='mt-4 sm:mt-0'>
          {t('buttonName')}
        </Button>
      </div>
    </div>
  );
};

export default HeaderHero;
