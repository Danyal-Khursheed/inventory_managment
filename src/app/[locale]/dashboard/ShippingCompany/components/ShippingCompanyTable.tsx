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
import { ErrorState } from '@/components/Error/ErrorState';

const ShippingCompanyTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { data, isLoading, isError } = useShippingCompanies({
    pageNumber: currentPage,
    pageSize
  });

  const locale = useLocale();
  const t = useTranslations('ShippingCompanyTable');
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
              <TableHead>{t('serviceName')}</TableHead>
              <TableHead>{t('serviceType')}</TableHead>
              {/* <TableHead>{t('Warehouse')}</TableHead> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {!data?.data || data.data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className='text-muted-foreground h-24 text-center'
                >
                  {tCommon('noRecordsFound')}
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((company, idx) => (
                <TableRow key={company.id}>
                  <TableCell>
                    {pageSize * (currentPage - 1) + (idx + 1)}
                  </TableCell>
                  <TableCell>{company.serviceName}</TableCell>
                  <TableCell>{company.serviceType}</TableCell>
                  {/* <TableCell>{company.warehouseId}</TableCell> */}
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

export default ShippingCompanyTable;
