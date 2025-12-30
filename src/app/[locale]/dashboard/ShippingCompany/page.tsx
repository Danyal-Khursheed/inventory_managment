'use client';

import { useState, useEffect } from 'react';
import HeaderHero from './components/HeaderHero';
import CreateServicePopUp from './components/CreateServicePopUp';
import ShippingCompanyTable from './components/ShippingCompanyTable';
import { ShippingCompany } from '@/services/shipping-company.service';
import { useShippingCompanies } from './hooks/useShippingCompanies';
import SkeletonTable from '@/components/SkeletonLoading/TableSkelton';

const Page = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useShippingCompanies({
    pageNumber,
    pageSize
  });

  const shippingCompanies = data?.data ?? [];
  console.log(shippingCompanies, '@@@@@@');

  return (
    <div className='px-2'>
      <HeaderHero
        componentName='Shipping Company'
        buttonName='New Shipping Company'
        handleButton={() => setCreateOpen(true)}
      />

      <CreateServicePopUp open={createOpen} onOpenChange={setCreateOpen} />

      <div className='mt-6'>
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <ShippingCompanyTable
            shippingCompanies={shippingCompanies}
            totalItems={data?.totalCount ?? 0}
            pageSize={pageSize}
            currentPage={pageNumber}
            onPageChange={(page) => setPageNumber(page)}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
