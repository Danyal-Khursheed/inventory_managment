import Image from 'next/image';
import React from 'react';
import { Images } from '~/Images';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex min-h-screen flex-row items-center justify-center'>
      <div className='flex h-screen w-full items-center justify-center bg-[#CCCAE6] lg:w-1/2'>
        <Image
          src={Images.layoutImage}
          width={600}
          height={600}
          alt='layout image'
          className='rounded-lg'
        />
      </div>
      <div className='w-full flex-1 lg:w-1/2'>{children}</div>
    </div>
  );
};

export default Layout;
