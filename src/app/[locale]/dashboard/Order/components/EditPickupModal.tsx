'use client';

import { useEffect } from 'react';
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

export interface PickupType {
  id: string;
  addressNick?: string;
  address?: string;
  cityName?: string;
  countryName?: string;
  countryCode?: string;
  latitude?: number | string;
  longitude?: number | string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues: PickupType | null;
  onSubmit: (data: PickupType) => void;
}

const EditPickupModal = ({
  open,
  onOpenChange,
  defaultValues,
  onSubmit
}: Props) => {
  const { register, handleSubmit, reset } = useForm<PickupType>();

  useEffect(() => {
    if (open && defaultValues) {
      reset(defaultValues);
    }
  }, [open, defaultValues, reset]);

  const onFormSubmit: SubmitHandler<PickupType> = (data) => {
    onSubmit(data);
  };

  const fields: (keyof PickupType)[] = [
    'addressNick',
    'address',
    'cityName',
    'countryName',
    'countryCode',
    'latitude',
    'longitude'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] w-[95vw] max-w-2xl overflow-y-auto rounded-xl px-4 sm:px-6'>
        <DialogHeader>
          <DialogTitle className='text-lg sm:text-xl'>Edit Pickup</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className='grid grid-cols-1 gap-4 sm:grid-cols-2'
        >
          {fields.map((field) => (
            <div key={field} className='flex flex-col gap-1'>
              <Label className='text-sm capitalize'>{field}</Label>
              <Input {...register(field)} />
            </div>
          ))}

          <DialogFooter className='flex flex-col-reverse gap-2 pt-4 sm:col-span-2 sm:flex-row sm:justify-end'>
            <Button
              type='button'
              variant='outline'
              className='w-full sm:w-auto'
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type='submit' className='w-full sm:w-auto'>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPickupModal;
