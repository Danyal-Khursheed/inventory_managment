'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Controller } from 'react-hook-form';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (formData: any) => void;
  loading: boolean;
  title: string;
  description: string;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      item: '',
      size: 0,
      name: '',
      color: '',
      sku: '',
      quantity: 0,
      upc: ''
    }
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (data: any) => {
    console.log('Form Data on Create User:', data);
    onConfirm(data);
    // Don't close here - let parent handle it after async operation completes
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='h-80 max-w-md space-y-5 overflow-x-auto overflow-y-auto p-1'
      >
        <div>
          <Label htmlFor='item'>Item</Label>
          <Controller
            name='item'
            control={control}
            rules={{ required: 'Item is required' }}
            render={({ field }) => (
              <Input
                {...field}
                id='item'
                placeholder='Enter item name'
                disabled={loading}
                className='mt-1 w-full'
              />
            )}
          />
          {errors.item && (
            <span className='text-sm text-red-500'>{errors.item.message}</span>
          )}
        </div>

        <div>
          <Label htmlFor='size'>Size</Label>
          <Controller
            name='size'
            control={control}
            rules={{
              required: 'Size is required',
              min: { value: 1, message: 'Size must be greater than 0' }
            }}
            render={({ field }) => (
              <Input
                {...field}
                id='size'
                type='number'
                placeholder='Enter size'
                disabled={loading}
                className='mt-1 w-full'
              />
            )}
          />
          {errors.size && (
            <span className='text-sm text-red-500'>{errors.size.message}</span>
          )}
        </div>

        <div>
          <Label htmlFor='name'>Name</Label>
          <Controller
            name='name'
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <Input
                {...field}
                id='name'
                placeholder='Enter name'
                disabled={loading}
                className='mt-1 w-full'
              />
            )}
          />
          {errors.name && (
            <span className='text-sm text-red-500'>{errors.name.message}</span>
          )}
        </div>

        <div>
          <Label htmlFor='color'>Color</Label>
          <Controller
            name='color'
            control={control}
            rules={{ required: 'Color is required' }}
            render={({ field }) => (
              <Input
                {...field}
                id='color'
                placeholder='Enter color'
                disabled={loading}
                className='mt-1 w-full'
              />
            )}
          />
          {errors.color && (
            <span className='text-sm text-red-500'>{errors.color.message}</span>
          )}
        </div>

        <div>
          <Label htmlFor='sku'>SKU</Label>
          <Controller
            name='sku'
            control={control}
            rules={{ required: 'SKU is required' }}
            render={({ field }) => (
              <Input
                {...field}
                id='sku'
                placeholder='Enter SKU'
                disabled={loading}
                className='mt-1 w-full'
              />
            )}
          />
          {errors.sku && (
            <span className='text-sm text-red-500'>{errors.sku.message}</span>
          )}
        </div>

        <div>
          <Label htmlFor='quantity'>Quantity</Label>
          <Controller
            name='quantity'
            control={control}
            rules={{
              required: 'Quantity is required',
              min: { value: 1, message: 'Quantity must be greater than 0' }
            }}
            render={({ field }) => (
              <Input
                {...field}
                id='quantity'
                type='number'
                placeholder='Enter quantity'
                disabled={loading}
                className='mt-1 w-full'
              />
            )}
          />
          {errors.quantity && (
            <span className='text-sm text-red-500'>
              {errors.quantity.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor='upc'>UPC</Label>
          <Controller
            name='upc'
            control={control}
            rules={{ required: 'UPC is required' }}
            render={({ field }) => (
              <Input
                {...field}
                id='upc'
                placeholder='Enter UPC'
                disabled={loading}
                className='mt-1 w-full'
              />
            )}
          />
          {errors.upc && (
            <span className='text-sm text-red-500'>{errors.upc.message}</span>
          )}
        </div>

        <div className='flex w-full items-center justify-end space-x-4 pt-6'>
          <Button disabled={loading} variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={loading} variant='destructive' type='submit'>
            {loading ? 'Creating...' : 'Create User'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
