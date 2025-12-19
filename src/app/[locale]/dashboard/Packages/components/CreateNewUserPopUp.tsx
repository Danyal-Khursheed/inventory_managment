'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateNewUserPopupProps, FormValues } from '../types/types';
import { useCreateUser } from '../hook';

const CreateNewUserPopUp = ({
  open,
  onOpenChange
}: CreateNewUserPopupProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>();

  const { mutate, isPending } = useCreateUser();

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[85%] overflow-y-auto'>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogHeader className='items-center'>
            <DialogTitle className='text-2xl'>Create User</DialogTitle>
            <DialogDescription>
              Fill in the details and save the user.
            </DialogDescription>
          </DialogHeader>

          <div className='mt-4 grid gap-4'>
            <div className='flex flex-col gap-2'>
              <Label>Name</Label>
              <Input {...register('name', { required: 'Name is required' })} />
              {errors.name && (
                <p className='text-red-500'>{errors.name.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>Item</Label>
              <Input {...register('item', { required: 'Item is required' })} />
              {errors.item && (
                <p className='text-red-500'>{errors.item.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>SKU</Label>
              <Input {...register('sku', { required: 'SKU is required' })} />
              {errors.sku && (
                <p className='text-red-500'>{errors.sku.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>Color</Label>
              <Input
                {...register('color', { required: 'Color is required' })}
              />
              {errors.color && (
                <p className='text-red-500'>{errors.color.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>UPC</Label>
              <Input {...register('upc', { required: 'UPC is required' })} />
              {errors.upc && (
                <p className='text-red-500'>{errors.upc.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>Quantity</Label>
              <Input
                type='number'
                {...register('quantity', {
                  valueAsNumber: true,
                  required: 'Quantity is required',
                  min: 1
                })}
              />
              {errors.quantity && (
                <p className='text-red-500'>{errors.quantity.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>Size</Label>
              <Input
                type='number'
                {...register('size', {
                  valueAsNumber: true,
                  required: 'Size is required',
                  min: 1
                })}
              />
              {errors.size && (
                <p className='text-red-500'>{errors.size.message}</p>
              )}
            </div>
          </div>

          <DialogFooter className='mt-4'>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>

            <Button type='submit' disabled={isPending}>
              {isPending ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewUserPopUp;
