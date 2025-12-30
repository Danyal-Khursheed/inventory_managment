'use client';

import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { HeroHeaderProps } from '../types/types';

const HeaderHero: FC<HeroHeaderProps> = ({
  //   handleButton,
  componentName
  //   buttonName
}) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('headerHero');

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className='w-full'>
      <div className='flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between'>
        <h1
          className={`w-full text-xl font-bold sm:w-auto sm:text-4xl md:text-3xl ${
            isRTL ? 'text-right' : 'text-left'
          }`}
        >
          {t(componentName)}
        </h1>

        {/* <div className='flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center'>
          <Button
            className='w-full cursor-pointer sm:w-auto'
            onClick={() => handleButton(true)}
          >
            {t(buttonName)}
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default HeaderHero;
