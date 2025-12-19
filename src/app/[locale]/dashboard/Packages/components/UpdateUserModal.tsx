'use client';

import { useEffect } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { User } from '@/services/users.service';
import { useUpdateUser } from '../hook';

interface FormValues {
  name: string;
  item: string;
  sku: string;
  color: string;
  upc: string;
  quantity: number;
  size: number;
}

interface UpdateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

export const UpdateUserModal = ({
  open,
  onOpenChange,
  user
}: UpdateUserModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>();
  const { mutate, isPending } = useUpdateUser();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        item: user.item,
        sku: user.sku,
        color: user.color,
        upc: user.upc,
        quantity: Number(user.quantity),
        size: Number(user.size)
      });
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!user?.id) return;
    console.log(data);
    console.log(user?.id);

    mutate(
      { userId: user.id, userData: data },
      {
        onSuccess: () => {
          reset();
          onOpenChange(false);
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[85%] overflow-y-auto'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className='text-2xl'>Update User</DialogTitle>
            <DialogDescription>
              Edit the user details and save changes.
            </DialogDescription>
          </DialogHeader>

          <div className='mt-4 grid gap-4'>
            {['name', 'item', 'sku', 'color', 'upc'].map((field) => (
              <div className='flex flex-col gap-2' key={field}>
                <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <Input
                  {...register(field as keyof FormValues, {
                    required: `${field} is required`
                  })}
                />
                {errors[field as keyof FormValues] && (
                  <p className='text-red-500'>
                    {errors[field as keyof FormValues]?.message}
                  </p>
                )}
              </div>
            ))}

            <div className='flex flex-col gap-2'>
              <Label>Quantity</Label>
              <Input
                type='number'
                {...register('quantity', {
                  valueAsNumber: true,
                  required: 'Quantity required',
                  min: 1
                })}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Label>Size</Label>
              <Input
                type='number'
                {...register('size', {
                  valueAsNumber: true,
                  required: 'Size required',
                  min: 1
                })}
              />
            </div>
          </div>

          <DialogFooter className='mt-4'>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
