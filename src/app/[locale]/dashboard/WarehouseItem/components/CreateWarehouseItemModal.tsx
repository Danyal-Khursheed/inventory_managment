// components/CreateWarehouseItemModal.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent
} from '@/components/ui/select';

import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useGetAllWarehouses } from '../hooks';
import { useCreateWarehouseItem } from '../hooks/useCreateWarehouseItem';
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

const CreateWarehouseItemModal = ({
  open,
  onOpenChange,
  warehouseItem
}: Props) => {
  const isEditMode = !!warehouseItem;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<FormValues>({
    defaultValues: {
      name: warehouseItem?.name || '',
      warehouseId: warehouseItem?.warehouseId || '',
      price: warehouseItem?.price || undefined,
      quantity: warehouseItem?.quantity || undefined,
      weight: warehouseItem?.weight || undefined
    }
  });

  const {
    data: warehouses,
    isLoading,
    error
  } = useGetAllWarehouses({
    pageNumber: 1,
    pageSize: 10
  });

  const { mutate: createWarehouseItem, isPending } = useCreateWarehouseItem();

  // Update form when warehouseItem changes (switching between create/edit modes)
  useEffect(() => {
    if (warehouseItem) {
      reset({
        name: warehouseItem.name || '',
        warehouseId: warehouseItem.warehouseId || '',
        price: warehouseItem.price || undefined,
        quantity: warehouseItem.quantity || undefined,
        weight: warehouseItem.weight || undefined
      });
    } else {
      reset({
        name: '',
        warehouseId: '',
        price: undefined,
        quantity: undefined,
        weight: undefined
      });
    }
  }, [warehouseItem, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const payload: WarehouseItem = {
      ...(isEditMode && { id: warehouseItem.id }),
      name: data.name,
      warehouseId: data.warehouseId,
      price: data.price ?? 0,
      quantity: data.quantity ?? 0,
      weight: data.weight ?? 0
    };

    createWarehouseItem(payload, {
      onSuccess: () => {
        reset({
          name: '',
          warehouseId: '',
          price: undefined,
          quantity: undefined,
          weight: undefined
        });
        onOpenChange(false);
      }
    });
  };

  const handleCancel = () => {
    reset({
      name: '',
      warehouseId: '',
      price: undefined,
      quantity: undefined,
      weight: undefined
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='mx-auto w-full sm:max-w-md md:max-w-md lg:max-w-md xl:max-w-md'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className='items-center'>
            <DialogTitle className='text-2xl'>
              {isEditMode ? 'Update Warehouse Item' : 'Create Warehouse Item'}
            </DialogTitle>
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
              <Label>Warehouse</Label>
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className='text-sm text-red-500'>
                  Error fetching warehouses.
                </p>
              ) : (
                <Controller
                  name='warehouseId'
                  control={control}
                  rules={{ required: 'Warehouse is required' }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select Warehouse' />
                      </SelectTrigger>
                      <SelectContent
                        position='popper'
                        sideOffset={4}
                        className='max-h-52 overflow-y-auto'
                      >
                        {warehouses?.data?.map((warehouse) => (
                          <SelectItem key={warehouse.id} value={warehouse.id}>
                            {warehouse.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              )}
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
              <Button
                variant='outline'
                onClick={handleCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' disabled={isPending}>
              {isPending
                ? isEditMode
                  ? 'Updating...'
                  : 'Creating...'
                : isEditMode
                  ? 'Update'
                  : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWarehouseItemModal;
