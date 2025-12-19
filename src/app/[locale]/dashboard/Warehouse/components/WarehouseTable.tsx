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
import { Edit, Trash2 } from 'lucide-react'; // prettier icons
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import TablePagination from '@/components/pagination/TablePagination';
import { useState } from 'react';

interface Props {
  warehouses: Warehouse[];
  onUpdate: (warehouse: Warehouse) => void;
  onDelete: (warehouse: Warehouse) => void;
  // Pagination props
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
  return (
    <div className='overflow-x-auto rounded-md border shadow-sm'>
      <Table className='min-w-[700px]'>
        <TableHeader className='bg-gray-100 dark:bg-gray-800'>
          <TableRow>
            <TableHead className='text-left'>s no</TableHead>
            <TableHead className='text-left'>Name</TableHead>
            <TableHead className='text-left'>Address</TableHead>
            <TableHead className='text-left'>City</TableHead>
            <TableHead className='text-left'>Country</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {warehouses.map((w, idx) => (
            <TableRow
              key={w.id}
              className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition-colors hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <TableCell>{idx + 1}</TableCell>
              <TableCell className='font-medium'>{w.name}</TableCell>
              <TableCell>{w.address}</TableCell>
              <TableCell>{w.city}</TableCell>
              <TableCell>{w.country}</TableCell>
              <TableCell className='flex justify-end gap-2'>
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
                  <TooltipContent>Update Warehouse</TooltipContent>
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
                  <TooltipContent>Delete Warehouse</TooltipContent>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
