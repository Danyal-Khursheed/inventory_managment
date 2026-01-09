'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Plus, Trash } from 'lucide-react';
import { useGetAllWarehouses } from '../hooks';
import { Spinner } from '@/components/ui/Spinner';
import { useGetAllWarehouseItems } from '../hooks/useGetAllWarehouseItems';
import { toast } from 'sonner';
import {
  PackageWarehouseItem,
  SelectedWarehouse,
  WarehouseItem
} from '../types/types';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux-toolkit/store/store';
import { setWarehouse } from '@/redux-toolkit/reducers/order';

const PackageSection: React.FC = () => {
  const dispatch = useDispatch();

  // 🔹 Get persisted warehouse from Redux
  const savedWarehouse = useSelector(
    (state: RootState) => state.order.warehouse
  );

  // 🔹 Local state hydrated from Redux
  const [selectedWarehouse, setSelectedWarehouse] =
    useState<SelectedWarehouse | null>(savedWarehouse ?? null);

  // 🔹 Fetch warehouses and warehouse items
  const { data: warehousesData, isLoading: warehousesLoading } =
    useGetAllWarehouses({ pageNumber: 1, pageSize: 10 });
  const { data: warehouseItemsData } = useGetAllWarehouseItems({
    pageNumber: 1,
    pageSize: 10
  });

  // 🔹 Persist local state to Redux
  useEffect(() => {
    if (!selectedWarehouse) return;

    dispatch(setWarehouse(selectedWarehouse));
    console.log('✅ Warehouse saved to Redux:', selectedWarehouse);
  }, [selectedWarehouse, dispatch]);

  /* ================= BOX HANDLER ================= */
  const updateBox = (field: 'length' | 'width' | 'height', value: string) => {
    if (!selectedWarehouse) return;
    const numericValue = Number(value);

    setSelectedWarehouse((prev) => {
      if (!prev) return prev;
      const updatedBox = { ...prev.box, [field]: numericValue };
      const { length, width, height } = updatedBox;
      return {
        ...prev,
        box: {
          ...updatedBox,
          volumetricWeight:
            length && width && height
              ? Number(((length * width * height) / 5000).toFixed(2))
              : 0
        }
      };
    });
  };

  /* ================= ITEM HANDLERS ================= */
  const addItem = () => {
    if (!selectedWarehouse) return;

    setSelectedWarehouse((prev) =>
      prev
        ? {
            ...prev,
            warehouseItems: [
              ...prev.warehouseItems,
              {
                rowId: Date.now(),
                itemId: '',
                name: '',
                qty: 0,
                weight: 0,
                price: 0,
                originalQty: 0,
                originalWeight: 0,
                originalPrice: 0
              }
            ]
          }
        : prev
    );
  };

  const deleteItem = (rowId: number) => {
    if (!selectedWarehouse) return;

    setSelectedWarehouse((prev) =>
      prev
        ? {
            ...prev,
            warehouseItems: prev.warehouseItems.filter(
              (item) => item.rowId !== rowId
            )
          }
        : prev
    );
  };

  const updateItem = (
    rowId: number,
    field: keyof PackageWarehouseItem,
    value: string
  ) => {
    if (!selectedWarehouse) return;

    setSelectedWarehouse((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        warehouseItems: prev.warehouseItems.map((row) => {
          if (row.rowId !== rowId) return row;

          // Item selection
          if (field === 'itemId') {
            const whItem = warehouseItemsData?.data?.find(
              (i: WarehouseItem) => String(i.id) === value
            );
            if (!whItem) return row;
            return {
              ...row,
              itemId: String(whItem.id),
              name: whItem.name,
              qty: whItem.quantity,
              weight: whItem.weightPerItem,
              price: whItem.pricePerItem,
              originalQty: whItem.quantity,
              originalWeight: whItem.weightPerItem,
              originalPrice: whItem.pricePerItem
            };
          }

          const numericValue = Number(value);

          if (field === 'qty' && numericValue > row.originalQty) {
            toast(`Quantity cannot exceed ${row.originalQty}`);
            return row;
          }

          if (field === 'weight' && numericValue > row.originalWeight) {
            toast(`Weight cannot exceed ${row.originalWeight}`);
            return row;
          }

          if (field === 'price' && numericValue > row.originalPrice) {
            toast(`Price cannot exceed ${row.originalPrice}`);
            return row;
          }

          return { ...row, [field]: numericValue };
        })
      };
    });
  };

  /* ================= RENDER ================= */
  return (
    <Card className='mt-6 w-full'>
      <CardHeader>
        <CardTitle>Select your warehouse</CardTitle>

        <Select
          value={selectedWarehouse?.id || ''}
          onValueChange={(warehouseId) => {
            const warehouse = warehousesData?.data?.find(
              (w: any) => String(w.id) === warehouseId
            );

            if (!warehouse) return;

            setSelectedWarehouse({
              id: String(warehouse.id),
              name:
                warehouse.name ||
                warehouse.warehouseName ||
                warehouse.company_name,
              box: { length: 0, width: 0, height: 0, volumetricWeight: 0 },
              warehouseItems: []
            });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select warehouse' />
          </SelectTrigger>

          <SelectContent>
            {warehousesLoading ? (
              <SelectItem value='loading'>
                <Spinner />
              </SelectItem>
            ) : (
              warehousesData?.data?.map((warehouse: any) => (
                <SelectItem key={warehouse.id} value={String(warehouse.id)}>
                  {warehouse.name ||
                    warehouse.warehouseName ||
                    warehouse.company_name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </CardHeader>

      {selectedWarehouse && (
        <CardContent className='space-y-4'>
          {/* BOX SIZE */}
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5'>
            <Input
              type='number'
              placeholder='Length (cm)'
              value={selectedWarehouse.box.length}
              onChange={(e) => updateBox('length', e.target.value)}
            />

            <Input
              type='number'
              placeholder='Width (cm)'
              value={selectedWarehouse.box.width}
              onChange={(e) => updateBox('width', e.target.value)}
            />

            <Input
              type='number'
              placeholder='Height (cm)'
              value={selectedWarehouse.box.height}
              onChange={(e) => updateBox('height', e.target.value)}
            />

            <Input
              disabled
              value={selectedWarehouse.box.volumetricWeight}
              placeholder='Volumetric Weight'
            />

            <Button onClick={addItem}>
              <Plus className='mr-2 h-4 w-4' /> Add
            </Button>
          </div>

          {/* ITEMS TABLE */}
          <div className='overflow-x-auto'>
            <table className='w-full border text-sm'>
              <thead className='bg-primary text-white'>
                <tr>
                  <th className='p-3'>#</th>
                  <th className='p-3'>Item</th>
                  <th className='p-3'>Qty</th>
                  <th className='p-3'>Weight</th>
                  <th className='p-3'>Price</th>
                  <th className='p-3'>Actions</th>
                </tr>
              </thead>

              <tbody>
                {selectedWarehouse.warehouseItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className='p-4 text-center'>
                      No items added
                    </td>
                  </tr>
                ) : (
                  selectedWarehouse.warehouseItems.map((row, index) => (
                    <tr key={row.rowId}>
                      <td className='p-3'>{index + 1}</td>

                      <td className='p-3'>
                        <Select
                          value={row.itemId}
                          onValueChange={(value) =>
                            updateItem(row.rowId, 'itemId', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select item' />
                          </SelectTrigger>
                          <SelectContent>
                            {warehouseItemsData?.data?.map(
                              (item: WarehouseItem) => (
                                <SelectItem
                                  key={item.id}
                                  value={String(item.id)}
                                >
                                  {item.name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </td>

                      <td className='p-3'>
                        <Input
                          type='number'
                          value={row.qty}
                          onChange={(e) =>
                            updateItem(row.rowId, 'qty', e.target.value)
                          }
                        />
                      </td>

                      <td className='p-3'>
                        <Input
                          type='number'
                          value={row.weight}
                          onChange={(e) =>
                            updateItem(row.rowId, 'weight', e.target.value)
                          }
                        />
                      </td>

                      <td className='p-3'>
                        <Input
                          type='number'
                          value={row.price}
                          onChange={(e) =>
                            updateItem(row.rowId, 'price', e.target.value)
                          }
                        />
                      </td>

                      <td className='p-3'>
                        <Button
                          size='icon'
                          variant='destructive'
                          onClick={() => deleteItem(row.rowId)}
                        >
                          <Trash className='h-4 w-4' />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default PackageSection;
