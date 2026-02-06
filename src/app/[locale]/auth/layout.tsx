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
    <div className='flex min-h-screen'>
      <div className='hidden w-1/2 items-center justify-center bg-[#f0eff4] p-8 lg:flex dark:bg-[#1a1a2e]'>
        <Image
          src={Images.layoutImage}
          width={480}
          height={480}
          alt='layout image'
          className='rounded-2xl object-contain shadow-xl'
        />
      </div>
      <div className='flex w-full flex-1 items-center justify-center overflow-y-auto bg-[#fafafa] px-4 py-10 lg:w-1/2 dark:bg-[#12121a]'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
