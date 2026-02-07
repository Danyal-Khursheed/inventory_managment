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
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`overflow-x-auto ${isRTL ? 'text-right' : 'text-left'}`}
    >
      <div className='h-full min-w-[700px]'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className={`px-4 py-2 text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t('sNo')}
              </TableHead>

              <TableHead
                className={`px-4 py-2 text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t('name')}
              </TableHead>

              <TableHead
                className={`px-4 py-2 text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t('price')}
              </TableHead>

              <TableHead
                className={`px-4 py-2 text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t('quantity')}
              </TableHead>

              <TableHead
                className={`px-4 py-2 text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t('weight')}
              </TableHead>

              <TableHead
                className={`px-4 py-2 text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t('warehouseName')}
              </TableHead>

              <TableHead
                className={`px-4 py-2 text-xs sm:text-sm ${
                  isRTL ? 'text-left' : 'text-right'
                }`}
              >
                {t('actions')}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {warehouseItems?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className='text-muted-foreground h-24 text-center'
                >
                  {tCommon('noRecordsFound')}
                </TableCell>
              </TableRow>
            ) : (
              warehouseItems.map((item, idx) => (
                <TableRow key={`${item.warehouseId}-${idx}`}>
                  <TableCell
                    className={`px-4 py-2 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {pageSize * (currentPage - 1) + (idx + 1)}
                  </TableCell>

                  <TableCell
                    className={`truncate px-4 py-2 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {item.name}
                  </TableCell>

                  <TableCell
                    className={`px-4 py-2 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {item.pricePerItem}
                  </TableCell>

                  <TableCell
                    className={`px-4 py-2 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {item.quantity}
                  </TableCell>

                  <TableCell
                    className={`px-4 py-2 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {item.weightPerItem}
                  </TableCell>

                  <TableCell
                    className={`px-4 py-2 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {item.name}
                  </TableCell>

                  <TableCell
                    className={`px-4 py-2 ${isRTL ? 'text-left' : 'text-right'}`}
                  >
                    <div
                      className={`flex gap-2 ${
                        isRTL ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => onUpdate(item)}
                          >
                            <Edit size={16} className='text-blue-600' />
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
                            <Trash2 size={16} className='text-red-600' />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{t('deleteItem')}</TooltipContent>
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

export default WarehouseItemTable;
