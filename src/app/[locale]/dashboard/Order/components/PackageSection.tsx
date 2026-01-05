'use client';

import { useState } from 'react';
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

interface PackageItem {
  id: number;
  item: string;
  qty: string;
  weight: string;
  price: string;
  originalQty?: number;
  originalWeight?: number;
  originalPrice?: number;
}

const PackageSection: React.FC = () => {
  const [items, setItems] = useState<PackageItem[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('');

  const [currentPage] = useState(1);
  const pageSize = 10;

  const { data: warehouseItemsData } = useGetAllWarehouseItems({
    pageNumber: currentPage,
    pageSize
  });

  const { data: warehousesData, isLoading: warehousesLoading } =
    useGetAllWarehouses({
      pageNumber: 1,
      pageSize: 10
    });

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now(), item: '', qty: '', weight: '', price: '' }
    ]);
  };

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: number, field: keyof PackageItem, value: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (field === 'item') {
            const selectedItem = warehouseItemsData?.data?.find(
              (whItem: any) => String(whItem.id) === value
            );
            if (selectedItem) {
              return {
                ...item,
                item: value,
                qty: selectedItem.quantity?.toString() || '',
                weight: selectedItem.weightPerItem?.toString() || '',
                price: selectedItem.pricePerItem?.toString() || '',
                originalQty: selectedItem.quantity
              };
            }
          }

          const numValue = Number(value);
          if (
            field === 'qty' &&
            item.originalQty !== undefined &&
            numValue > item.originalQty
          ) {
            toast(
              `Quantity cannot exceed original quantity: ${item.originalQty}`
            );
            return item;
          }
          if (
            field === 'weight' &&
            item.originalWeight !== undefined &&
            numValue > item.originalWeight
          ) {
            toast(
              `Weight cannot exceed original weight: ${item.originalWeight}`
            );
            return item;
          }
          if (
            field === 'price' &&
            item.originalPrice !== undefined &&
            numValue > item.originalPrice
          ) {
            toast(`Price cannot exceed original price: ${item.originalPrice}`);
            return item;
          }

          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  return (
    <Card className='mt-6 w-full'>
      <CardHeader>
        <CardTitle className='mb-2 text-lg sm:text-lg md:text-xl'>
          Select your warehouse
        </CardTitle>

        <div className='w-full'>
          <Select
            value={selectedWarehouse}
            onValueChange={setSelectedWarehouse}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select a warehouse' />
            </SelectTrigger>

            <SelectContent className='max-h-60 overflow-y-auto'>
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
        </div>
      </CardHeader>

      {selectedWarehouse && (
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5'>
            <Input type='number' placeholder='Length (cm)' className='w-full' />
            <Input type='number' placeholder='Width (cm)' className='w-full' />
            <Input type='number' placeholder='Height (cm)' className='w-full' />
            <Input
              placeholder='Volumetric Weight'
              disabled
              className='w-full'
            />
            <Button onClick={addItem} className='w-full sm:w-auto'>
              Add
            </Button>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full min-w-[600px] border-collapse border border-gray-200 text-sm sm:min-w-full'>
              <thead className='bg-primary text-white'>
                <tr>
                  <th className='p-3 text-left'>S No</th>
                  <th className='p-3 text-left'>Item</th>
                  <th className='p-3 text-left'>Qty</th>
                  <th className='p-3 text-left'>Weight</th>
                  <th className='p-3 text-left'>Price</th>
                  <th className='p-3 text-left'>Actions</th>
                </tr>
              </thead>

              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className='text-muted-foreground p-4 text-center'
                    >
                      No items added
                    </td>
                  </tr>
                ) : (
                  items.map((row, index) => (
                    <tr key={row.id} className='border-b border-gray-200'>
                      <td className='p-5 align-top'>{index + 1}</td>

                      <td className='min-w-[150px] p-3 align-top'>
                        <Select
                          value={row.item}
                          onValueChange={(value) =>
                            updateItem(row.id, 'item', value)
                          }
                        >
                          <SelectTrigger className='w-full px-2 py-2 sm:px-3 sm:py-2'>
                            <SelectValue placeholder='Select item' />
                          </SelectTrigger>
                          <SelectContent className='py-2'>
                            {warehouseItemsData?.data?.map((item: any) => (
                              <SelectItem
                                key={item.id}
                                value={String(item.id)}
                                className='px-2 py-2 sm:px-3 sm:py-2'
                              >
                                {item.name || item.itemName || item.productName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>

                      <td className='p-3 align-top'>
                        <Input
                          type='number'
                          value={row.qty}
                          onChange={(e) =>
                            updateItem(row.id, 'qty', e.target.value)
                          }
                          className='px-2 py-2 sm:px-3 sm:py-2'
                        />
                      </td>

                      <td className='p-3 align-top'>
                        <Input
                          type='number'
                          value={row.weight}
                          onChange={(e) =>
                            updateItem(row.id, 'weight', e.target.value)
                          }
                          className='px-2 py-2 sm:px-3 sm:py-2'
                        />
                      </td>

                      <td className='p-3 align-top'>
                        <Input
                          type='number'
                          value={row.price}
                          onChange={(e) =>
                            updateItem(row.id, 'price', e.target.value)
                          }
                          className='px-2 py-2 sm:px-3 sm:py-2'
                        />
                      </td>

                      <td className='flex flex-nowrap justify-start gap-2 p-3 sm:flex-nowrap'>
                        <Button size='icon' variant='outline' onClick={addItem}>
                          <Plus className='h-4 w-4' />
                        </Button>
                        <Button
                          size='icon'
                          variant='destructive'
                          onClick={() => deleteItem(row.id)}
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
