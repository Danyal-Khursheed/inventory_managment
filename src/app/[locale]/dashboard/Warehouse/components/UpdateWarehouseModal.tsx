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
import { Warehouse } from '@/services/warehouse.service';
import { useUpdateWarehouse } from '../hook';

interface FormValues {
  name: string;
  address: string;
  city: string;
  country: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warehouse: Warehouse | null;
}

export const UpdateWarehouseModal = ({
  open,
  onOpenChange,
  warehouse
}: Props) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { mutate, isPending } = useUpdateWarehouse();

  useEffect(() => {
    if (warehouse) {
      reset({
        name: warehouse.name ?? '',
        address: warehouse.address ?? '',
        city: warehouse.city ?? '',
        country: warehouse.country ?? ''
      });
    }
  }, [warehouse, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!warehouse?.id) return;

    mutate(
      { warehouseId: warehouse.id, warehouseData: data },
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
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className='text-2xl'>Update Warehouse</DialogTitle>
            <DialogDescription>Edit warehouse details.</DialogDescription>
          </DialogHeader>

          <div className='mt-4 grid gap-4'>
            {['name', 'address', 'city', 'country'].map((field) => (
              <div key={field} className='flex flex-col gap-2'>
                <Label>{field.toUpperCase()}</Label>
                <Input
                  {...register(field as keyof FormValues, {
                    required: `${field} is required`
                  })}
                />
              </div>
            ))}
          </div>

          <DialogFooter className='mt-4'>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit' disabled={isPending || !warehouse}>
              {isPending ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
