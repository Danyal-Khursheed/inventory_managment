'use client';

import { useLocale, useTranslations } from 'next-intl';
import TablePagination from '@/components/pagination/TablePagination';
import SkeletonTable from '@/components/SkeletonLoading/TableSkelton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface Props {
  data: any;
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const CountryRegionTable = ({
  data,
  currentPage,
  pageSize,
  onPageChange
}: Props) => {
  const locale = useLocale();
  const t = useTranslations('CountryRegionTable');
  const tCommon = useTranslations('common');
  const isRTL = locale === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className='overflow-x-auto'>
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
            {!data?.data || data?.data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={12}
                  className='text-muted-foreground h-24 text-center'
                >
                  {tCommon('noRecordsFound')}
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((item: any, idx: number) => (
                <TableRow key={item.id}>
                  <TableCell className='px-4 py-2'>
                    {pageSize * (currentPage - 1) + (idx + 1)}
                  </TableCell>
                  <TableCell className='px-4 py-2'>
                    {item.companyName}
                  </TableCell>
                  <TableCell className='px-4 py-2'>
                    {item.addressNick}
                  </TableCell>
                  <TableCell className='px-4 py-2'>
                    {item.addressLine1}
                  </TableCell>
                  <TableCell className='px-4 py-2'>{item.cityName}</TableCell>
                  <TableCell className='px-4 py-2'>
                    {item.countryName}
                  </TableCell>
                  <TableCell className='px-4 py-2'>
                    {item.countryCode}
                  </TableCell>
                  <TableCell className='px-4 py-2'>{item.zipCode}</TableCell>
                  <TableCell className='px-4 py-2'>{item.latitude}</TableCell>
                  <TableCell className='px-4 py-2'>{item.longitude}</TableCell>
                  <TableCell className='px-4 py-2'>{item.phoneCode}</TableCell>
                  <TableCell className='px-4 py-2'>{item.mobileNo}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className='mx-4 mt-4'>
          <TablePagination
            totalItems={data?.totalCount || 0}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CountryRegionTable;
