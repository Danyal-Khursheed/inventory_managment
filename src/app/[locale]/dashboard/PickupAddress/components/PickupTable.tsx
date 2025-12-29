'use client';
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

export interface PickupAddress {
  id: string;
  address: string;
  addressNick: string;
  zipCode: string;
  mobileNo: string;
  latitude: string;
  longitude: string;
  cityName: string;
  countryName: string;
  countryCode: string;
}

interface Props {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  data?: PickupAddress[];
}

const PickupTable = ({
  data,
  totalItems,
  pageSize,
  currentPage,
  onPageChange
}: Props) => {
  const t = useTranslations('PickupTable');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className='overflow-x-auto rounded-md border shadow-sm'
    >
      <div className='h-full min-w-[700px] overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow className='text-xs font-semibold sm:text-sm'>
              <TableHead className='whitespace-nowrap'>{t('sNo')}</TableHead>
              <TableHead className='whitespace-nowrap'>
                {t('address_nick')}
              </TableHead>
              <TableHead className='whitespace-nowrap'>
                {t('zip_code')}
              </TableHead>
              <TableHead className='whitespace-nowrap'>
                {t('mobile_no')}
              </TableHead>
              <TableHead className='whitespace-nowrap'>
                {t('latitude')}
              </TableHead>
              <TableHead className='whitespace-nowrap'>
                {t('longitude')}
              </TableHead>
              <TableHead className='whitespace-nowrap'>
                {t('city_name')}
              </TableHead>
              <TableHead className='whitespace-nowrap'>
                {t('country_name')}
              </TableHead>
              <TableHead className='whitespace-nowrap'>
                {t('country_code')}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((d, idx) => (
              <TableRow
                key={d.id}
                className={`${
                  idx % 2 !== 0
                    ? 'bg-white dark:bg-black'
                    : 'bg-gray-50 dark:bg-gray-800'
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <TableCell>
                  {pageSize * (currentPage - 1) + (idx + 1)}
                </TableCell>
                <TableCell>{d.addressNick}</TableCell>
                <TableCell>{d.zipCode}</TableCell>
                <TableCell>{d.mobileNo}</TableCell>
                <TableCell>{d.latitude}</TableCell>
                <TableCell>{d.longitude}</TableCell>
                <TableCell>{d.cityName}</TableCell>
                <TableCell>{d.countryName}</TableCell>
                <TableCell>{d.countryCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className='mx-4 mt-4'>
          <TablePagination
            totalItems={totalItems}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PickupTable;
