'use client';

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

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className='overflow-x-auto rounded-md border shadow-sm'
    >
      <div className='h-full min-w-[700px] overflow-x-auto'>
        <div className='flex font-semibold'>
          <div className='flex-1 px-4 py-2 text-xs sm:text-sm'>{t('sNo')}</div>
          <div className='flex-1 px-4 py-2 text-xs sm:text-sm'>{t('name')}</div>
          <div className='flex-1 px-4 py-2 text-xs sm:text-sm'>
            {t('address')}
          </div>
          <div className='flex-1 px-4 py-2 text-xs sm:text-sm'>{t('city')}</div>
          <div className='flex-1 px-4 py-2 text-xs sm:text-sm'>
            {t('country')}
          </div>
          <div className='flex-1 px-4 py-2 text-end'>{t('actions')}</div>
        </div>

        {warehouses.map((w, idx) => (
          <div
            key={w.id}
            className={`flex ${idx % 2 !== 0 ? 'bg-white dark:bg-black' : 'bg-gray-50 dark:bg-gray-800'} hover:bg-gray-100`}
          >
            <div className='flex-1 px-4 py-2'>
              {pageSize * (currentPage - 1) + (idx + 1)}
            </div>
            <div className='flex-1 truncate px-4 py-2 font-medium'>
              {w.name}
            </div>
            <div className='flex-1 truncate px-4 py-2'>{w.address}</div>
            <div className='flex-1 px-4 py-2'>{w.city}</div>
            <div className='flex-1 px-4 py-2'>{w.country}</div>
            <div className='flex flex-1 justify-end gap-2 px-4 py-2'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size='sm'
                    variant='ghost'
                    className='cursor-pointer'
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
                    className='cursor-pointer'
                    onClick={() => onDelete(w)}
                  >
                    <Trash2 color='darkred' size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t('deleteWarehouse')}</TooltipContent>
              </Tooltip>
            </div>
          </div>
        ))}

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
