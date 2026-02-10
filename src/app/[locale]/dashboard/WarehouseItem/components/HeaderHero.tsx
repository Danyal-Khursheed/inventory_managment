'use client';

import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { HeroHeaderProps } from '../types/types';
import ImportWarehouseCSV from './ImportWarehouseCSV';

const HeaderHero: FC<HeroHeaderProps> = ({
  handleButton,
  componentName,
  buttonName,
  onCSVSuccess
}) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('headerHero');

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className='w-full'>
      <div className='flex flex-col gap-4 p-1 sm:flex-row sm:items-center sm:justify-between md:p-4'>
        <h1
          className={`w-full text-3xl font-bold sm:w-auto md:text-3xl ${
            isRTL ? 'text-right' : 'text-left'
          }`}
        >
          {t(componentName)}
        </h1>

        <div className='flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center'>
          {onCSVSuccess && <ImportWarehouseCSV onSuccess={onCSVSuccess} />}
          <Button
            className='h-10 w-[80%] cursor-pointer sm:w-auto md:w-auto'
            onClick={() => handleButton(true)}
          >
            {t(buttonName)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderHero;
