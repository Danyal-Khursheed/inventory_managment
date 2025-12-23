'use client';

import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip';
import TablePagination from '@/components/pagination/TablePagination';

import { WarehouseItem } from '../types/types';

interface Props {
  warehouseItems: WarehouseItem[];
  onUpdate: (item: WarehouseItem) => void;
  onDelete: (item: WarehouseItem) => void;
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const WarehouseItemTable = ({
  warehouseItems,
  onUpdate,
  onDelete,
  totalItems,
  pageSize,
  currentPage,
  onPageChange
}: Props) => {
  const t = useTranslations('WarehouseItemTable');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className='overflow-x-auto rounded-md border shadow-sm'
    >
      <div className='h-full min-w-[700px]'>
        <div
          className={`flex bg-gray-100 font-semibold ${
            isRTL ? 'text-right' : 'text-left'
          }`}
        >
          <div className='flex-1 px-4 py-2'>{t('sNo')}</div>
          <div className='flex-1 px-4 py-2'>{t('name')}</div>
          <div className='flex-1 px-4 py-2'>{t('price')}</div>
          <div className='flex-1 px-4 py-2'>{t('quantity')}</div>
          <div className='flex-1 px-4 py-2'>{t('weight')}</div>
          <div className='flex-1 px-4 py-2'>{t('warehouseName')}</div>
          <div className='flex-1 px-4 py-2 text-end'>{t('actions')}</div>
        </div>

        {warehouseItems.map((item, idx) => (
          <div
            key={`${item.warehouseId}-${idx}`}
            className={`flex ${
              idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            } hover:bg-gray-100`}
          >
            <div className='flex-1 px-4 py-2'>
              {pageSize * (currentPage - 1) + (idx + 1)}
            </div>
            <div className='flex-1 truncate px-4 py-2'>{item.name}</div>
            <div className='flex-1 px-4 py-2'>{item.price}</div>
            <div className='flex-1 px-4 py-2'>{item.quantity}</div>
            <div className='flex-1 px-4 py-2'>{item.weight}</div>
            <div className='flex-1 px-4 py-2'>{item.warehouse?.name}</div>

            <div
              className={`flex flex-1 gap-2 px-4 py-2 ${
                isRTL ? 'justify-end' : 'justify-end'
              }`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => onUpdate(item)}
                  >
                    <Edit size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t('updateItem')}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size='sm'
                    variant='destructive'
                    onClick={() => onDelete(item)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t('deleteItem')}</TooltipContent>
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

export default WarehouseItemTable;
