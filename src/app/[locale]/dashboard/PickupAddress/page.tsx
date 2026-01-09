'use client';

import { useState } from 'react';
import HeaderHero from '../CountriesOrigin/components/HeaderHero';
import CreatePickupModal from './components/CreatePickupModal';
import PickupTable from './components/PickupTable';

const Page = () => {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className='px-2'>
      <HeaderHero
        componentName='Pickup Address'
        buttonName='Create PickUp'
        handleButton={setCreateOpen}
      />

      <PickupTable />

      <CreatePickupModal open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
};

export default Page;
