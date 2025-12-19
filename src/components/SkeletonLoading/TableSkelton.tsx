'use client';

import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonTableProps {
  rows?: number;
}

const SkeletonTable = ({ rows = 10 }: SkeletonTableProps) => {
  const skeletonRows = Array.from({ length: rows });

  return (
    <div className='w-full overflow-hidden rounded-lg'>
      <div className='mb-2 grid grid-cols-5 gap-4 bg-gray-100 px-4 py-2 dark:bg-gray-800'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
      </div>

      {skeletonRows.map((_, idx) => (
        <div
          key={idx}
          className={`grid grid-cols-5 gap-4 px-4 py-3 ${
            idx % 2 === 0 ? 'bg-white' : 'bg-gray-50 dark:bg-gray-700'
          } animate-pulse`}
        >
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-8 w-8 rounded-full' />
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
