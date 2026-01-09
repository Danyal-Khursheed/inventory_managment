'use client';

import { useState } from 'react';
import WarehouseItemTable from './components/WarehouseItemTable';
import CreateWarehouseItemModal from './components/CreateWarehouseItemModal';
import DeleteWarehouseItemModal from './components/DeleteWarehouseItemModal';
import HeaderHero from '../WarehouseItem/components/HeaderHero';
import { useGetAllWarehouseItems } from './hooks/useGetAllWarehouseItems';
import { WarehouseItem } from '@/app/[locale]/dashboard/WarehouseItem/types/types';
import SkeletonTable from '@/components/SkeletonLoading/TableSkelton';

export default function Page() {
  const [selectedItem, setSelectedItem] = useState<WarehouseItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error, refetch } = useGetAllWarehouseItems({
    pageNumber: currentPage,
    pageSize
  });

  const handleUpdate = (item: WarehouseItem) => {
    setSelectedItem(item);
    console.log(item);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedItem(null);
    setModalOpen(true);
  };

  const handleDelete = (item: WarehouseItem) => {
    setSelectedItem(item);
    setDeleteOpen(true);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleModalClose = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      setSelectedItem(null);
    }
  };

  return (
    <div className='px-2'>
      <HeaderHero
        componentName='warehouseItemTitle'
        buttonName='createWarehouseItem'
        handleButton={handleCreate}
        onCSVSuccess={refetch}
      />

      {isLoading ? (
        <SkeletonTable />
      ) : error ? (
        <div className='flex h-100 items-center justify-center'>
          <p className='text-lg text-red-500'>No Data Found in the Table</p>
        </div>
      ) : (
        <WarehouseItemTable
          warehouseItems={data?.data || []}
          totalItems={Number(data?.totalCount)}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}

      <CreateWarehouseItemModal
        open={modalOpen}
        onOpenChange={handleModalClose}
        warehouseItem={selectedItem}
      />

      <DeleteWarehouseItemModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        warehouseItem={selectedItem}
      />
    </div>
  );
}
