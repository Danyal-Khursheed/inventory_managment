'use client';

import { useState } from 'react';
import TablePagination from '@/components/pagination/TablePagination';
import { useLocale, useTranslations } from 'next-intl';
import { useCountryOrigin } from '../hook/useGetAllCountryOrigin';
import SkeletonTable from '@/components/SkeletonLoading/TableSkelton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const CountryRegionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading } = useCountryOrigin(currentPage, pageSize);
  const locale = useLocale();
  const t = useTranslations('CountryRegionTable');
  const isRTL = locale === 'ar';

  if (isLoading) return <SkeletonTable />;

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className='overflow-x-auto rounded-md border shadow-sm'
    >
      <div className='min-w-[1200px]'>
        <Table>
          <TableHeader>
            <TableRow className='text-[14px]'>
              <TableHead className='px-4 py-2'>{t('sNo')}</TableHead>
              <TableHead className='px-4 py-2'>{t('companyName')}</TableHead>
              <TableHead className='px-4 py-2'>{t('addressNick')}</TableHead>
              <TableHead className='px-4 py-2'>{t('addressLine1')}</TableHead>
              <TableHead className='px-4 py-2'>{t('cityName')}</TableHead>
              <TableHead className='px-4 py-2'>{t('countryName')}</TableHead>
              <TableHead className='px-4 py-2'>{t('countryCode')}</TableHead>
              <TableHead className='px-4 py-2'>{t('zipCode')}</TableHead>
              <TableHead className='px-4 py-2'>{t('latitude')}</TableHead>
              <TableHead className='px-4 py-2'>{t('longitude')}</TableHead>
              <TableHead className='px-4 py-2'>{t('phoneCode')}</TableHead>
              <TableHead className='px-4 py-2'>{t('mobileNo')}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className='text-md'>
            {data?.data.map((item, idx) => (
              <TableRow
                key={item.id}
                className={`${
                  idx % 2 !== 0
                    ? 'bg-white dark:bg-black'
                    : 'bg-gray-50 dark:bg-gray-800'
                } hover:bg-gray-100`}
              >
                <TableCell className='px-4 py-2'>
                  {pageSize * (currentPage - 1) + (idx + 1)}
                </TableCell>
                <TableCell className='px-4 py-2'>{item.companyName}</TableCell>
                <TableCell className='px-4 py-2'>{item.addressNick}</TableCell>
                <TableCell className='px-4 py-2'>{item.addressLine1}</TableCell>
                <TableCell className='px-4 py-2'>{item.cityName}</TableCell>
                <TableCell className='px-4 py-2'>{item.countryName}</TableCell>
                <TableCell className='px-4 py-2'>{item.countryCode}</TableCell>
                <TableCell className='px-4 py-2'>{item.zipCode}</TableCell>
                <TableCell className='px-4 py-2'>{item.latitude}</TableCell>
                <TableCell className='px-4 py-2'>{item.longitude}</TableCell>
                <TableCell className='px-4 py-2'>{item.phoneCode}</TableCell>
                <TableCell className='px-4 py-2'>{item.mobileNo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className='mx-4 mt-4'>
          <TablePagination
            totalItems={data?.totalCount || 0}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default CountryRegionTable;
