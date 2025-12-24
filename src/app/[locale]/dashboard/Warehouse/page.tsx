'use client';

import { useState } from 'react';
import HeaderHero from './components/HeaderHero';
import WarehouseTable from './components/WarehouseTable';
import CreateNewWarehousePopUp from './components/CreateNewWarehousePopUp';
import { UpdateWarehouseModal } from './components/UpdateWarehouseModal';
import { DeleteWarehouseModal } from './components/DeleteWarehouseModal';
import { useGetAllWarehouses } from './hook';
import { Warehouse } from '@/services/warehouse.service';
import SkeletonTable from '@/components/SkeletonLoading/TableSkelton';

export default function WarehousePage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
    null
  );

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { data, isLoading, refetch } = useGetAllWarehouses({
    pageNumber,
    pageSize
  });

  return (
    <div className='px-2'>
      <HeaderHero
        componentName='warehouseTitle'
        buttonName='createWarehouse'
        handleButton={setCreateOpen}
        onCSVSuccess={refetch}
      />
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <WarehouseTable
          warehouses={data?.data || []}
          onUpdate={(w) => {
            setSelectedWarehouse(w);
            setUpdateOpen(true);
          }}
          onDelete={(w) => {
            setSelectedWarehouse(w);
            setDeleteOpen(true);
          }}
          totalItems={data?.totalCount ?? 0}
          pageSize={pageSize}
          currentPage={pageNumber}
          onPageChange={(page) => setPageNumber(page)}
        />
      )}

      <CreateNewWarehousePopUp open={createOpen} onOpenChange={setCreateOpen} />

      <UpdateWarehouseModal
        open={updateOpen}
        onOpenChange={setUpdateOpen}
        warehouse={selectedWarehouse}
      />

      <DeleteWarehouseModal
        warehouse={selectedWarehouse}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  );
}
