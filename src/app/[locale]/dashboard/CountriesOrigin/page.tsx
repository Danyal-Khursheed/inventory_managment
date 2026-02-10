'use client';

import { useState, useEffect } from 'react';
import HeaderHero from './components/HeaderHero';
import CreateCountryRegionModal from './components/CreateCountryRegionModal';
import CountryRegionTable from './components/CountryRegionTable';
import { useCountryOrigin } from './hook/useGetAllCountryOrigin';
import { ErrorState } from '@/components/Error/ErrorState';
import SkeletonTable from '@/components/SkeletonLoading/TableSkelton';

export default function Page() {
  const [createModal, setCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { data, isLoading, isError } = useCountryOrigin(currentPage, pageSize);

  const handleModalClose = () => {
    setCreateModal(false);
  };

  return (
    <>
      <div className='px-2'>
        <HeaderHero
          componentName='CountryTitle'
          buttonName='CountryNewCountry'
          handleButton={setCreateModal}
        />
        <CreateCountryRegionModal
          open={createModal}
          onOpenChange={handleModalClose}
        />
        {isLoading ? (
          <SkeletonTable />
        ) : isError ? (
          <ErrorState />
        ) : (
          <CountryRegionTable
            data={data}
            isLoading={isLoading}
            isError={isError}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}
