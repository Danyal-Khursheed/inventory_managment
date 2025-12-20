'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

const TablePagination = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  siblingCount = 1
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    if (leftSiblingIndex > 1) pages.push(1);
    if (leftSiblingIndex > 2) pages.push('...');

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i);
    }

    if (rightSiblingIndex < totalPages - 1) pages.push('...');
    if (rightSiblingIndex < totalPages) pages.push(totalPages);

    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') onPageChange(page);
  };

  return (
    <div className='flex items-center justify-end space-x-2 pr-12 pb-2'>
      <Button
        size='sm'
        variant='outline'
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
      </Button>

      {getPageNumbers().map((page, idx) =>
        page === '...' ? (
          <span key={idx} className='px-2 text-gray-400'>
            ...
          </span>
        ) : (
          <Button
            key={idx}
            size='sm'
            variant={page === currentPage ? 'default' : 'outline'}
            className='h-10 w-10 p-0'
            onClick={() => handlePageClick(page)}
          >
            {page}
          </Button>
        )
      )}

      <Button
        size='sm'
        variant='outline'
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={10} />
      </Button>
    </div>
  );
};

export default TablePagination;
