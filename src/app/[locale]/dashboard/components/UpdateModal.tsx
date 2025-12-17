'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Controller } from 'react-hook-form';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (formData: any) => void;
  loading: boolean;
  title: string;
  description: string;
  invoiceData: any; // The data for the invoice to be updated
}

export const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description,
  invoiceData
}) => {
  const [isMounted, setIsMounted] = useState(false);

  // Initialize the form with default values using react-hook-form
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: invoiceData || {
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
    if (invoiceData) {
      setValue('item', invoiceData.item);
      setValue('size', invoiceData.size);
      setValue('name', invoiceData.name);
      setValue('color', invoiceData.color);
      setValue('sku', invoiceData.sku);
      setValue('quantity', invoiceData.quantity);
      setValue('upc', invoiceData.upc);
    }
  }, [invoiceData, setValue]);

  const onSubmit = (data: any) => {
    console.log('Form Data on Update Invoice:', data);
    onConfirm(data);
    onClose();
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
        {/* Input fields similar to the Create Modal */}
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
          {/* {errors.item && <span className="text-red-500 text-sm">{errors.item.message}</span>} */}
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
          {/* {errors.size && <span className="text-red-500 text-sm">{errors.size.message}</span>} */}
        </div>

        {/* Add more fields as needed, similar to Create Modal */}
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
          {/* {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>} */}
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
          {/* {errors.color && <span className="text-red-500 text-sm">{errors.color.message}</span>} */}
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
          {/* {errors.sku && <span className="text-red-500 text-sm">{errors.sku.message}</span>} */}
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
          {/* {errors.quantity && <span className="text-red-500 text-sm">{errors.quantity.message}</span>} */}
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
          {/* {errors.upc && <span className="text-red-500 text-sm">{errors.upc.message}</span>} */}
        </div>

        <div className='flex w-full items-center justify-end space-x-4 pt-6'>
          <Button disabled={loading} variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={loading} variant='destructive' type='submit'>
            Update Invoice
          </Button>
        </div>
      </form>
    </Modal>
  );
};
