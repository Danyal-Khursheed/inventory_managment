'use client';

import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
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
  return (
    <div className='overflow-x-auto rounded-md border shadow-sm'>
      <div className='h-full min-w-[700px]'>
        <div className='flex bg-gray-100 font-semibold'>
          <div className='flex-1 px-4 py-2'>S No</div>
          <div className='flex-1 px-4 py-2'>Name</div>
          <div className='flex-1 px-4 py-2'>Price</div>
          <div className='flex-1 px-4 py-2'>Quantity</div>
          <div className='flex-1 px-4 py-2'>Weight</div>
          <div className='flex-1 px-4 py-2'>Warehouse Name</div>
          <div className='flex-1 px-4 py-2 text-right'>Actions</div>
        </div>

        {warehouseItems.map((item, idx) => (
          <div
            key={item.warehouseId}
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
            <div className='flex flex-1 justify-end gap-2 px-4 py-2'>
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
                <TooltipContent>Update Item</TooltipContent>
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
                <TooltipContent>Delete Item</TooltipContent>
              </Tooltip>
            </div>
          </div>
        ))}

        <div className='mt-4'>
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
