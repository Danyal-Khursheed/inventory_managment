'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export interface ReceiverType {
  name: string;
  companyName: string;
  email: string;
  mobileNo: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ReceiverType) => void;
}

const CreateReceiverModal = ({ open, onOpenChange, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ReceiverType>();

  const onFormSubmit: SubmitHandler<ReceiverType> = (data) => {
    onSubmit(data);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='w-[95vw] max-w-lg rounded-xl px-4 sm:px-6'>
        <DialogHeader>
          <DialogTitle className='text-lg sm:text-xl'>
            Create Receiver
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className='grid grid-cols-1 gap-4 sm:grid-cols-2'
        >
          {/* Name */}
          <div className='flex flex-col gap-2'>
            <Label>Name</Label>
            <Input {...register('name', { required: 'Name is required' })} />
            {errors.name && (
              <p className='text-sm text-red-500'>{errors.name.message}</p>
            )}
          </div>

          {/* Company Name */}
          <div className='flex flex-col gap-2'>
            <Label>Company Name</Label>
            <Input
              {...register('companyName', {
                required: 'Company name is required'
              })}
            />
            {errors.companyName && (
              <p className='text-sm text-red-500'>
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className='flex flex-col gap-2 sm:col-span-2'>
            <Label>Email</Label>
            <Input
              {...register('email', {
                required: 'Email is required'
              })}
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>

          {/* Mobile No */}
          <div className='flex flex-col gap-2 sm:col-span-2'>
            <Label>Mobile No</Label>
            <Input
              {...register('mobileNo', {
                required: 'Mobile number is required'
              })}
            />
            {errors.mobileNo && (
              <p className='text-sm text-red-500'>{errors.mobileNo.message}</p>
            )}
          </div>

          {/* Footer */}
          <DialogFooter className='flex flex-col-reverse gap-2 pt-2 sm:col-span-2 sm:flex-row sm:justify-end'>
            <Button
              type='button'
              variant='outline'
              className='w-full sm:w-auto'
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type='submit' className='w-full sm:w-auto'>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReceiverModal;
