'use client';

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

interface Props {
  shippingCompanies: ShippingCompany[];

  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ShippingCompanyTable = ({
  shippingCompanies,
  totalItems,
  pageSize,
  currentPage,
  onPageChange
}: Props) => {
  const t = useTranslations('ShippingCompanyTable');
  const locale = useLocale();
  const isRTL = locale === 'ar';

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
            {shippingCompanies.map((company, idx) => (
              <TableRow
                key={company.id}
                className={`${
                  idx % 2 !== 0
                    ? 'bg-white dark:bg-black'
                    : 'bg-gray-50 dark:bg-gray-800'
                } hover:bg-gray-100`}
              >
                <TableCell> {(currentPage - 1) * pageSize + idx + 1}</TableCell>
                <TableCell>{company.serviceName}</TableCell>
                <TableCell>{company.serviceType}</TableCell>
                {/* <TableCell>{company.warehouseId}</TableCell> */}
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

export default ShippingCompanyTable;
