'use client';

import { Warehouse } from '@/services/warehouse.service';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
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
  warehouses: Warehouse[];
  onUpdate: (warehouse: Warehouse) => void;
  onDelete: (warehouse: Warehouse) => void;
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const WarehouseTable = ({
  warehouses,
  onUpdate,
  onDelete,
  totalItems,
  pageSize,
  currentPage,
  onPageChange
}: Props) => {
  const t = useTranslations('WarehouseTable');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className='overflow-x-auto'>
      <div className='h-full min-w-[700px] overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow className='font-semibold'>
              <TableHead className='text-xs sm:text-sm'>{t('sNo')}</TableHead>
              <TableHead className='text-xs sm:text-sm'>{t('name')}</TableHead>
              <TableHead className='text-xs sm:text-sm'>
                {t('address')}
              </TableHead>
              <TableHead className='text-xs sm:text-sm'>{t('city')}</TableHead>
              <TableHead className='text-xs sm:text-sm'>
                {t('country')}
              </TableHead>
              <TableHead className='text-end text-xs sm:text-sm'>
                {t('actions')}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {warehouses?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className='text-muted-foreground h-24 text-center'
                >
                  {tCommon('noRecordsFound')}
                </TableCell>
              </TableRow>
            ) : (
              warehouses.map((w, idx) => (
                <TableRow key={w.id}>
                  <TableCell>
                    {pageSize * (currentPage - 1) + (idx + 1)}
                  </TableCell>
                  <TableCell className='font-medium'>{w.name}</TableCell>
                  <TableCell>{w.address}</TableCell>
                  <TableCell>{w.city}</TableCell>
                  <TableCell>{w.countryName}</TableCell>
                  <TableCell className='text-end'>
                    <div className='flex justify-end gap-2'>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => onUpdate(w)}
                          >
                            <Edit color='blue' size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{t('updateWarehouse')}</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => onDelete(w)}
                          >
                            <Trash2 color='darkred' size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{t('deleteWarehouse')}</TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
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

export default WarehouseTable;
