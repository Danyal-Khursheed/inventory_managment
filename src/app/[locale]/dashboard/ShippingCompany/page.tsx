'use client';

import { useState } from 'react';
import HeaderHero from './components/HeaderHero';
import CreateServicePopUp from './components/CreateServicePopUp';
import ShippingCompanyTable from './components/ShippingCompanyTable';

const Page = () => {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className='px-2'>
      <HeaderHero
        componentName='Shipping Company'
        buttonName='New Shipping Company'
        handleButton={() => setCreateOpen(true)}
      />

      <ShippingCompanyTable />

      <CreateServicePopUp open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
};

export default Page;
