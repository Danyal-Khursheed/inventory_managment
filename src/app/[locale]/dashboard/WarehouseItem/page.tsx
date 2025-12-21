'use client';

import React, { useState } from 'react';
import WarehouseItemTable from './components/WarehouseItemTable';
import { WarehouseItem } from '@/services/warehouseItem';
import CreateWarehouseItemModal from './components/CreateWarehouseItemModal';
import UpdateWarehouseItemModal from './components/UpdateWarehouseItemModal';
import DeleteWarehouseItemModal from './components/DeleteWarehouseItemModal';
import HeaderHero from '../Warehouse/components/HeaderHero';

export default function Page() {
  const [warehouseItems, setWarehouseItems] = useState<WarehouseItem[]>([
    { warehouseId: '1', name: 'Item 1', price: 100, quantity: 10, weight: 2 },
    { warehouseId: '2', name: 'Item 2', price: 200, quantity: 5, weight: 3 },
    { warehouseId: '3', name: 'Item 3', price: 150, quantity: 8, weight: 1.5 },
    { warehouseId: '4', name: 'Item 1', price: 100, quantity: 10, weight: 2 },
    { warehouseId: '5', name: 'Item 2', price: 200, quantity: 5, weight: 3 },
    { warehouseId: '6', name: 'Item 3', price: 150, quantity: 8, weight: 1.5 },
    { warehouseId: '7', name: 'Item 3', price: 150, quantity: 8, weight: 1.5 }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [selectedItem, setSelectedItem] = useState<WarehouseItem | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
      <WarehouseItemTable
        warehouseItems={warehouseItems}
        totalItems={warehouseItems.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

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
