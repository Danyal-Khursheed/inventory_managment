'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { WarehouseItem } from '@/services/warehouseItem';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warehouseItem: WarehouseItem | null;
}

const UpdateWarehouseItemModal = ({
  open,
  onOpenChange,
  warehouseItem
}: Props) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    if (warehouseItem) {
      setName(warehouseItem.name);
      setPrice(String(warehouseItem.price));
      setQuantity(String(warehouseItem.quantity));
      setWeight(String(warehouseItem.weight));
    }
  }, [warehouseItem]);

  const handleUpdate = () => {
    console.log({ name, price, quantity, weight });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Warehouse Item</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-3'>
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Label>Price</Label>
          <Input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Label>Quantity</Label>
          <Input
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Label>Weight</Label>
          <Input
            type='number'
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <DialogFooter className='mt-4 flex justify-end gap-2'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateWarehouseItemModal;
