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
import { useEffect } from 'react';

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
  defaultValues?: ReceiverType | null; // 🔹 add default values prop
}

const CreateReceiverModal = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ReceiverType>({
    defaultValues: defaultValues || {
      name: '',
      companyName: '',
      email: '',
      mobileNo: ''
    } // 🔹 use defaultValues
  });

  const onFormSubmit: SubmitHandler<ReceiverType> = (data) => {
    onSubmit(data);
    reset(data); // 🔹 reset with current values
    onOpenChange(false);
  };

  const handleClose = () => {
    reset(
      defaultValues || { name: '', companyName: '', email: '', mobileNo: '' }
    ); // 🔹 reset to last values
    onOpenChange(false);
  };

  // 🔹 Reset form values whenever defaultValues changes
  useEffect(() => {
    reset(
      defaultValues || { name: '', companyName: '', email: '', mobileNo: '' }
    );
  }, [defaultValues, reset]);

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
          className='flex flex-col gap-4'
        >
          <div className='flex flex-col gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className='text-sm text-red-500'>{errors.name.message}</p>
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <Label htmlFor='companyName'>Company Name</Label>
            <Input
              id='companyName'
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

          <div className='flex flex-col gap-2 sm:col-span-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email'
                }
              })}
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>

          <div className='flex flex-col gap-2 sm:col-span-2'>
            <Label htmlFor='mobileNo'>Mobile No</Label>
            <Input
              id='mobileNo'
              {...register('mobileNo', {
                required: 'Mobile number is required',
                pattern: {
                  value: /^[0-9]{7,15}$/,
                  message: 'Enter a valid mobile number'
                }
              })}
            />
            {errors.mobileNo && (
              <p className='text-sm text-red-500'>{errors.mobileNo.message}</p>
            )}
          </div>

          <DialogFooter className='flex flex-col-reverse gap-2 pt-2 sm:col-span-2 sm:flex-row sm:justify-end'>
            <Button
              type='button'
              variant='outline'
              className='w-full sm:w-auto'
              onClick={handleClose}
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
