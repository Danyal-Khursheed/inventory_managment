'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import TablePagination from '@/components/pagination/TablePagination';
import SkeletonTable from '@/components/SkeletonLoading/TableSkelton';
import { useGetAllPickups } from '../hooks';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ErrorState } from '@/components/Error/ErrorState';

const PickupTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { data, isLoading, isError } = useGetAllPickups({
    pageNumber: currentPage,
    pageSize
  });

  const locale = useLocale();
  const t = useTranslations('PickupTable');
  const tCommon = useTranslations('common');
  const isRTL = locale === 'ar';

  if (isLoading) return <SkeletonTable />;

  if (isError) return <ErrorState />;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className='overflow-x-auto'>
      <div className='min-w-[700px]'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('sNo')}</TableHead>
              <TableHead>{t('address_nick')}</TableHead>
              <TableHead>{t('zip_code')}</TableHead>
              <TableHead>{t('mobile_no')}</TableHead>
              <TableHead>{t('latitude')}</TableHead>
              <TableHead>{t('longitude')}</TableHead>
              <TableHead>{t('city_name')}</TableHead>
              <TableHead>{t('country_name')}</TableHead>
              <TableHead>{t('country_code')}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!data?.data || data?.data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className='text-muted-foreground h-24 text-center'
                >
                  {tCommon('noRecordsFound')}
                </TableCell>
              </TableRow>
            ) : (
              data?.data?.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {pageSize * (currentPage - 1) + (idx + 1)}
                  </TableCell>
                  <TableCell>{item.addressNick}</TableCell>
                  <TableCell>{item.zipCode}</TableCell>
                  <TableCell>{item.mobileNo}</TableCell>
                  <TableCell>{item.latitude}</TableCell>
                  <TableCell>{item.longitude}</TableCell>
                  <TableCell>{item.cityName}</TableCell>
                  <TableCell>{item.countryName}</TableCell>
                  <TableCell>{item.countryCode}</TableCell>
                </TableRow>
              ))
            )}
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

export default PickupTable;
