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
import { CreateNewUserPopupProps, FormValues } from '../types/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AnyAaaaRecord } from 'dns';

const CreateNewUserPopUp = ({
  open,
  onOpenChange
}: CreateNewUserPopupProps) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form Data:', data); // This will log the form data
    // reset();
    // onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogHeader className='flex flex-col items-center'>
            <DialogTitle className='text-2xl'>Create User</DialogTitle>
            <DialogDescription className='text-center text-lg'>
              Fill in the details and save the user.
            </DialogDescription>
          </DialogHeader>

          <div className='mt-4 grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                {...register('name', { required: true })}
                placeholder='Name'
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='item'>Item</Label>
              <Input
                id='item'
                {...register('item', { required: true })}
                placeholder='Item'
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='sku'>SKU</Label>
              <Input
                id='sku'
                {...register('sku', { required: true })}
                placeholder='SKU'
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='color'>Color</Label>
              <Input
                id='color'
                {...register('color', { required: true })}
                placeholder='Color'
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='upc'>UPC</Label>
              <Input
                id='upc'
                {...register('upc', { required: true })}
                placeholder='UPC'
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='quantity'>Quantity</Label>
              <Input
                id='quantity'
                type='number'
                {...register('quantity', {
                  valueAsNumber: true,
                  required: true
                })}
                placeholder='Quantity'
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='size'>Size</Label>
              <Input
                id='size'
                type='number'
                {...register('size', { valueAsNumber: true, required: true })}
                placeholder='Size'
              />
            </div>
          </div>

          <DialogFooter className='mt-4'>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit'>Create</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateNewUserPopUp;
