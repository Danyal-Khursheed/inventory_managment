'use client';

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='px-4 py-2 text-xs sm:text-sm'>
                {t('sNo')}
              </TableHead>
              <TableHead className='px-4 py-2 text-xs sm:text-sm'>
                {t('name')}
              </TableHead>
              <TableHead className='px-4 py-2 text-xs sm:text-sm'>
                {t('price')}
              </TableHead>
              <TableHead className='px-4 py-2 text-xs sm:text-sm'>
                {t('quantity')}
              </TableHead>
              <TableHead className='px-4 py-2 text-xs sm:text-sm'>
                {t('weight')}
              </TableHead>
              <TableHead className='px-4 py-2 text-xs sm:text-sm'>
                {t('warehouseName')}
              </TableHead>
              <TableHead className='px-4 py-2 text-end text-xs sm:text-sm'>
                {t('actions')}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {warehouseItems.map((item, idx) => (
              <TableRow
                key={`${item.warehouseId}-${idx}`}
                className={`${
                  idx % 2 !== 0
                    ? 'bg-white dark:bg-black'
                    : 'bg-gray-50 dark:bg-gray-800'
                } hover:bg-gray-100`}
              >
                <TableCell className='px-4 py-2'>
                  {pageSize * (currentPage - 1) + (idx + 1)}
                </TableCell>
                <TableCell className='truncate px-4 py-2'>
                  {item.name}
                </TableCell>
                <TableCell className='px-4 py-2'>{item.price}</TableCell>
                <TableCell className='px-4 py-2'>{item.quantity}</TableCell>
                <TableCell className='px-4 py-2'>{item.weight}</TableCell>
                <TableCell className='px-4 py-2'>
                  {item.warehouse?.name}
                </TableCell>

                <TableCell
                  className={`px-4 py-2 ${isRTL ? 'text-end' : 'text-end'}`}
                >
                  <div className='flex justify-end gap-2'>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size='sm'
                          variant='ghost'
                          onClick={() => onUpdate(item)}
                        >
                          <Edit color='blue' size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{t('updateItem')}</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size='sm'
                          variant='ghost'
                          onClick={() => onDelete(item)}
                        >
                          <Trash2 color='darkred' size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{t('deleteItem')}</TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
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

export default WarehouseItemTable;
