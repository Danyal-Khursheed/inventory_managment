'use client';

import React, { useEffect, useState } from 'react';
import WarehouseItemTable from './components/WarehouseItemTable';
import CreateWarehouseItemModal from './components/CreateWarehouseItemModal';
import UpdateWarehouseItemModal from './components/UpdateWarehouseItemModal';
import DeleteWarehouseItemModal from './components/DeleteWarehouseItemModal';
import HeaderHero from '../Warehouse/components/HeaderHero';
import { useGetAllWarehouseItems } from './hooks/useGetAllWarehouseItems';
import { WarehouseItem } from '@/app/[locale]/dashboard/WarehouseItem/types/types';
import SkeletonTable from '@/components/SkeletonLoading/TableSkelton';

export default function Page() {
  const [warehouseItems, setWarehouseItems] = useState<WarehouseItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<WarehouseItem | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const { data, isLoading, error } = useGetAllWarehouseItems({
    pageNumber: currentPage,
    pageSize
  });

  useEffect(() => {
    if (data) {
      setWarehouseItems(data.data);
    }
  }, [data]);

  const handleUpdate = (item: WarehouseItem) => {
    setSelectedItem(item);
    setUpdateOpen(true);
  };

  const handleDelete = (item: WarehouseItem) => {
    setSelectedItem(item);
    setDeleteOpen(true);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className='px-2'>
      <HeaderHero
        componentName='Warehouse Items'
        buttonName='Create Warehouse Item'
        handleButton={setCreateOpen}
      />
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <WarehouseItemTable
          warehouseItems={warehouseItems}
          totalItems={warehouseItems.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
      <CreateWarehouseItemModal
        open={createOpen}
        onOpenChange={setCreateOpen}
      />

      <UpdateWarehouseItemModal
        open={updateOpen}
        onOpenChange={setUpdateOpen}
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
