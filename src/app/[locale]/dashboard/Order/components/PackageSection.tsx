'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';

interface PackageItem {
  id: number;
  item: string;
  qty: string;
  weight: string;
  price: string;
}

const PackageSection: React.FC = () => {
  const [items, setItems] = useState<PackageItem[]>([]);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        item: '',
        qty: '',
        weight: '',
        price: ''
      }
    ]);
  };

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (
    id: number,
    field: keyof PackageItem,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <Card className='mt-6'>
      <CardHeader>
        <CardTitle>Select your package</CardTitle>
      </CardHeader>

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

                  <td>
                    <Input
                      value={row.item}
                      onChange={(e) =>
                        updateItem(row.id, 'item', e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <Input
                      type='number'
                      value={row.qty}
                      onChange={(e) =>
                        updateItem(row.id, 'qty', Number(e.target.value))
                      }
                    />
                  </td>

                  <td>
                    <Input
                      type='number'
                      value={row.weight}
                      onChange={(e) =>
                        updateItem(row.id, 'weight', Number(e.target.value))
                      }
                    />
                  </td>

                  <td>
                    <Input
                      type='number'
                      value={row.price}
                      onChange={(e) =>
                        updateItem(row.id, 'price', Number(e.target.value))
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
    </Card>
  );
};

export default PackageSection;
