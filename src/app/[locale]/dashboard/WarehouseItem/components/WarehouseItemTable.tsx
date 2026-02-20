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
      className={`${isRTL ? 'text-right' : 'text-left'}`}
    >
      <div className='-mx-2 overflow-x-auto px-2 sm:mx-0 sm:px-0'>
        <Table className='w-full min-w-[700px]'>
          <TableHeader>
            <TableRow>
              <TableHead
                className={`w-12 shrink-0 px-2 py-2 text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}
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
                {t('SKU')}
              </TableHead>

              <TableHead
                className={`px-4 py-2 text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t('UPC')}
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
                {t('productCategory')}
              </TableHead>
              <TableHead
                className={`px-4 py-2 text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t('retrnxboxDamaged')}
              </TableHead>
              <TableHead
                className={`px-4 py-2 text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t('warehouseName')}
              </TableHead>
              <TableHead
                className={`w-[90px] shrink-0 px-2 py-2 text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t('actions')}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!warehouseItems || warehouseItems?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className='text-muted-foreground h-24 text-center'
                >
                  {tCommon('noRecordsFound')}
                </TableCell>
              </TableRow>
            ) : (
              warehouseItems?.map((item, idx) => (
                <TableRow key={`${item.warehouseId}-${idx}`}>
                  <TableCell
                    className={`w-12 shrink-0 px-2 py-2 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {pageSize * (currentPage - 1) + (idx + 1)}
                  </TableCell>

                  <TableCell
                    className={`max-w-[120px] truncate px-4 py-2 sm:max-w-none ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {item.name}
                  </TableCell>

                  <TableCell
                    className={`px-4 py-2 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {item.sku}
                  </TableCell>

                  <TableCell
                    className={`truncate px-4 py-2 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {item.upc}
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
                    {item.productCategory ?? '-'}
                  </TableCell>
                  <TableCell
                    className={`px-4 py-2 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {item.retrnxboxDamaged ?? 0}
                  </TableCell>
                  <TableCell
                    className={`px-4 py-2 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {(item as { warehouse?: { name?: string } }).warehouse
                      ?.name ??
                      item.warehouseId ??
                      '-'}
                  </TableCell>
                  <TableCell className='w-[90px] shrink-0 px-2 py-2'>
                    <div className='flex shrink-0 gap-1 sm:gap-2'>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size='sm'
                            variant='ghost'
                            className='h-8 w-8 p-0'
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
                            className='h-8 w-8 p-0'
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
      </div>

      <div className='mx-4 mt-4'>
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

export default WarehouseItemTable;
