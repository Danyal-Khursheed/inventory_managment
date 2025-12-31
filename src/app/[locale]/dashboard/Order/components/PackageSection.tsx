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
    console.log('Current Items:', items);
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
                weight: selectedItem.weight?.toString() || '',
                price: selectedItem.price?.toString() || '',
                originalQty: selectedItem.quantity,
                originalWeight: selectedItem.weight,
                originalPrice: selectedItem.price
              };
            }
          }

          // For other fields, validate against original value
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
    <Card className='mt-6'>
      <CardHeader>
        <CardTitle className='mb-1'>Select your warehouse</CardTitle>

        <div className='w-full sm:w-3/4 md:w-1/2 lg:w-1/3'>
          <Select
            value={selectedWarehouse}
            onValueChange={setSelectedWarehouse}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select a warehouse' />
            </SelectTrigger>

            <SelectContent className='max-h-50 overflow-y-auto'>
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
          <div className='grid grid-cols-1 gap-3 md:grid-cols-5'>
            <Input type='number' placeholder='Length (cm)' />
            <Input type='number' placeholder='Width (cm)' />
            <Input type='number' placeholder='Height (cm)' />
            <Input placeholder='Volumetric Weight' disabled />
            <Button onClick={addItem}>Add</Button>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead className='bg-primary text-white'>
                <tr>
                  <th className='p-2'>S No</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Weight</th>
                  <th>Price</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {items.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className='text-muted-foreground p-4 text-center'
                    >
                      No items added
                    </td>
                  </tr>
                )}

                {items.map((row, index) => (
                  <tr key={row.id} className='border-b'>
                    <td className='p-2'>{index + 1}</td>

                    <td className='w-[300px]'>
                      <Select
                        value={row.item}
                        onValueChange={(value) =>
                          updateItem(row.id, 'item', value)
                        }
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select item' />
                        </SelectTrigger>

                        <SelectContent>
                          {warehouseItemsData?.data?.map((item: any) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                              {item.name || item.itemName || item.productName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>

                    <td>
                      <Input
                        type='number'
                        value={row.qty}
                        onChange={(e) =>
                          updateItem(row.id, 'qty', e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <Input
                        type='number'
                        value={row.weight}
                        onChange={(e) =>
                          updateItem(row.id, 'weight', e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <Input
                        type='number'
                        value={row.price}
                        onChange={(e) =>
                          updateItem(row.id, 'price', e.target.value)
                        }
                      />
                    </td>

                    <td className='flex gap-2 p-2'>
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
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default PackageSection;
