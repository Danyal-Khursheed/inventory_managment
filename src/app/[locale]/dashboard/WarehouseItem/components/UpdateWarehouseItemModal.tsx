'use client';

import { useEffect } from 'react';
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
import { useForm, SubmitHandler } from 'react-hook-form';
import { WarehouseItem } from '../types/types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warehouseItem: WarehouseItem | null;
}

interface FormValues {
  name: string;
  warehouseId: string;
  price?: number;
  quantity?: number;
  weight?: number;
}

const UpdateWarehouseItemModal = ({
  open,
  onOpenChange,
  warehouseItem
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      warehouseId: '',
      price: undefined,
      quantity: undefined,
      weight: undefined
    }
  });

  useEffect(() => {
    if (warehouseItem) {
      reset({
        name: warehouseItem.name,
        warehouseId: warehouseItem.warehouseId,
        price: warehouseItem.price,
        quantity: warehouseItem.quantity,
        weight: warehouseItem.weight
      });
    }
  }, [warehouseItem, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Update Warehouse Item:', data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='mx-auto w-full sm:max-w-md md:max-w-md lg:max-w-md xl:max-w-md'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Update Warehouse Item</DialogTitle>
          </DialogHeader>

          <div className='mt-4 grid gap-4'>
            <div className='flex flex-col gap-2'>
              <Label>Name</Label>
              <Input
                placeholder='Item name'
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className='text-sm text-red-500'>{errors.name.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>Warehouse ID</Label>
              <Input
                placeholder='Warehouse ID'
                {...register('warehouseId', {
                  required: 'Warehouse ID is required'
                })}
              />
              {errors.warehouseId && (
                <p className='text-sm text-red-500'>
                  {errors.warehouseId.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>Price</Label>
              <Input
                type='number'
                {...register('price', {
                  required: 'Price is required',
                  valueAsNumber: true,
                  min: { value: 1, message: 'Price must be greater than 0' }
                })}
              />
              {errors.price && (
                <p className='text-sm text-red-500'>{errors.price.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>Quantity</Label>
              <Input
                type='number'
                {...register('quantity', {
                  required: 'Quantity is required',
                  valueAsNumber: true,
                  min: { value: 1, message: 'Quantity must be greater than 0' }
                })}
              />
              {errors.quantity && (
                <p className='text-sm text-red-500'>
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>Weight</Label>
              <Input
                type='number'
                {...register('weight', {
                  required: 'Weight is required',
                  valueAsNumber: true,
                  min: { value: 0.1, message: 'Weight must be greater than 0' }
                })}
              />
              {errors.weight && (
                <p className='text-sm text-red-500'>{errors.weight.message}</p>
              )}
            </div>
          </div>

          <DialogFooter className='mt-4 flex justify-end gap-2'>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit'>Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateWarehouseItemModal;
