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

import { useForm, SubmitHandler } from 'react-hook-form';
import { useGetAllWarehouses } from '../hooks';
import { useCreateWarehouseItem } from '../hooks/useCreateWarehouseItem';
import { WarehouseItem } from '../types/types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormValues {
  name: string;
  warehouseId: string;
  price?: number;
  quantity?: number;
  weight?: number;
}

const CreateWarehouseItemModal = ({ open, onOpenChange }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      warehouseId: '',
      price: undefined,
      quantity: undefined,
      weight: undefined
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

  const { mutate: createWarehouseItem } = useCreateWarehouseItem();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const payload: WarehouseItem = {
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
              Create Warehouse Item
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
                <Select
                  {...register('warehouseId', {
                    required: 'Warehouse ID is required'
                  })}
                  onValueChange={(value) => setValue('warehouseId', value)}
                >
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
              <Button variant='outline' onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit'>Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWarehouseItemModal;
