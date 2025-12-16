'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Images } from '~/Images';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      redirect(`/${locale}/dashboard/overview`);
    }
  }, [locale, router]);
  return (
    <div className='flex min-h-screen flex-row items-center justify-center'>
      <div className='hidden h-screen w-full items-center justify-center bg-[#CCCAE6] lg:flex lg:w-1/2'>
        <Image
          src={Images.layoutImage}
          width={600}
          height={600}
          alt='layout image'
          className='rounded-lg'
        />
      </div>
      <div className='w-full flex-1 items-center justify-center lg:w-1/2'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
