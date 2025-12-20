'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow
} from '@/components/ui/table';
import { Warehouse } from '@/services/warehouse.service';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
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
  const locale = useLocale();
  const isRTL = locale === 'ar';

  console.log('@@ totaItems', totalItems);

  return (
    <div
      className='max-h-[600px] max-w-[1400px] overflow-x-auto overflow-y-auto rounded-md border shadow-sm'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className='flex bg-gray-100 dark:bg-gray-800'>
        <div className='flex-1 px-4 py-2 text-left'>{t('sNo')}</div>
        <div className='flex-1 px-4 py-2 text-left'>{t('name')}</div>
        <div className='flex-1 px-4 py-2 text-left'>{t('address')}</div>
        <div className='flex-1 px-4 py-2 text-left'>{t('city')}</div>
        <div className='flex-1 px-4 py-2 text-left'>{t('country')}</div>
        <div className='flex flex-1 justify-end px-4 py-2'>{t('actions')}</div>
      </div>

      {warehouses.map((w, idx) => (
        <div
          key={w.id}
          className={`flex ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 dark:hover:bg-gray-700`}
        >
          <div className='flex-1 px-4 py-2'>
            {pageSize * (currentPage - 1) + (idx + 1)}
          </div>
          <div className='flex-1 px-4 py-2 font-medium'>{w.name}</div>
          <div className='flex-1 px-4 py-2'>{w.address}</div>
          <div className='flex-1 px-4 py-2'>{w.city}</div>
          <div className='flex-1 px-4 py-2'>{w.country}</div>
          <div className='flex flex-1 justify-end gap-2 px-4 py-2'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size='sm'
                  variant='outline'
                  className='p-2 text-blue-500 hover:bg-blue-50'
                  onClick={() => onUpdate(w)}
                >
                  <Edit size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t('updateWarehouse')}</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size='sm'
                  variant='destructive'
                  className='p-2'
                  onClick={() => onDelete(w)}
                >
                  <Trash2 size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t('deleteWarehouse')}</TooltipContent>
            </Tooltip>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className='mt-4'>
        <TablePagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default WarehouseTable;
