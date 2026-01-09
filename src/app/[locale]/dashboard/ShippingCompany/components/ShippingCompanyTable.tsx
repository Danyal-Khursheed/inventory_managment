'use client';

import { useState } from 'react';
import { ShippingCompany } from '@/services/shipping-company.service';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import TablePagination from '@/components/pagination/TablePagination';
import { useTranslations, useLocale } from 'next-intl';
import { useShippingCompanies } from '../hooks/useShippingCompanies';
import SkeletonTable from '@/components/SkeletonLoading/TableSkelton';

const ShippingCompanyTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isError } = useShippingCompanies({
    pageNumber: currentPage,
    pageSize
  });

  const locale = useLocale();
  const t = useTranslations('ShippingCompanyTable');
  const isRTL = locale === 'ar';

  if (isLoading) return <SkeletonTable />;

  if (isError)
    return (
      <div className='flex h-100 items-center justify-center'>
        <p className='text-lg text-red-500'>No Data Found in the Table</p>
      </div>
    );

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className='overflow-x-auto rounded-md border shadow-sm'
    >
      <div className='min-w-[700px]'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('sNo')}</TableHead>
              <TableHead>{t('serviceName')}</TableHead>
              <TableHead>{t('serviceType')}</TableHead>
              {/* <TableHead>{t('Warehouse')}</TableHead> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.data.map((company, idx) => (
              <TableRow
                key={company.id}
                className={`${
                  idx % 2 !== 0
                    ? 'bg-white dark:bg-black'
                    : 'bg-gray-50 dark:bg-gray-800'
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <TableCell>
                  {pageSize * (currentPage - 1) + (idx + 1)}
                </TableCell>
                <TableCell>{company.serviceName}</TableCell>
                <TableCell>{company.serviceType}</TableCell>
                {/* <TableCell>{company.warehouseId}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className='mx-4 mt-4'>
          <TablePagination
            totalItems={data?.totalCount ?? 0}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingCompanyTable;
