'use client';

import { useState } from 'react';
import HeaderHero from '../CountriesOrigin/components/HeaderHero';
import CreatePickupModal from './components/CreatePickupModal';
import { useGetAllPickups } from './hooks';
import SkeletonTable from '@/components/SkeletonLoading/TableSkelton';
import PickupTable from './components/PickupTable';

const Page = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useGetAllPickups({
    pageNumber,
    pageSize
  });

  return (
    <div className='px-2'>
      <HeaderHero
        componentName='Pickup Address'
        buttonName='Create PickUp'
        handleButton={setCreateOpen}
      />
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <PickupTable
          pageSize={pageSize}
          data={data?.data}
          currentPage={pageNumber}
          onPageChange={(page) => setPageNumber(page)}
          totalItems={data?.totalCount ?? 0}
        />
      )}
      <CreatePickupModal open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
};

export default Page;
