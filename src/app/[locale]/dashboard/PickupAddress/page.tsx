'use client';

import { useState } from 'react';
import HeaderHero from '../CountriesOrigin/components/HeaderHero';
import CreatePickupModal from './components/CreatePickupModal';
import PickupTable, { PickupAddress } from './components/PickupTable';
import { PickupFormValues } from './types/types';
import { useGetAllPickups } from './hooks';
import { log } from 'console';
import SkeletonTable from '@/components/SkeletonLoading/TableSkelton';

const Page = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useGetAllPickups({
    pageNumber: currentPage,
    pageSize
  });

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className='px-2'>
      <HeaderHero
        componentName='PickupAddress'
        buttonName='Create PickUp'
        handleButton={setCreateOpen}
      />
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <PickupTable
          pageSize={pageSize}
          data={data?.data}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalItems={data?.totalCount ?? 0}
        />
      )}
      <CreatePickupModal open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
};

export default Page;
