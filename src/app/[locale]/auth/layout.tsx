'use client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { Images } from '~/Images';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   const token = localStorage.getItem('auth_token');
  //   if (token) {
  //     // Only redirect if we're not already on a dashboard page
  //     if (!pathname.includes('/dashboard')) {
  //       router.push(`/${locale}/dashboard/Warehouse`);
  //     }
  //   }
  // }, [locale, router, pathname]);
  return (
    <div className='flex max-h-screen flex-row items-center justify-center'>
      <div className='hidden h-screen w-full items-center justify-center bg-[#CCCAE6] lg:flex lg:w-1/2'>
        <Image
          src={Images.layoutImage}
          width={800}
          height={800}
          alt='layout image'
          className='rounded-lg'
        />
      </div>
      <div className='max-h-screen w-full flex-1 items-center justify-center lg:w-1/2'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
