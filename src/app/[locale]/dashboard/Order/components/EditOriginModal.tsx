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

export interface OriginType {
  id: string;
  companyName?: string;
  addressNick?: string;
  addressLine1?: string;
  cityName?: string;
  countryName?: string;
  countryCode?: string;
  zipCode?: string;
  latitude?: number | string;
  longitude?: number | string;
  phoneCode?: string;
  mobileNo?: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues: OriginType | null;
  onSubmit: (data: OriginType) => void;
}

const EditOriginModal = ({
  open,
  onOpenChange,
  defaultValues,
  onSubmit
}: Props) => {
  const { register, handleSubmit, reset } = useForm<OriginType>();

  useEffect(() => {
    if (open && defaultValues) {
      reset(defaultValues);
    }
  }, [open, defaultValues, reset]);

  const onFormSubmit: SubmitHandler<OriginType> = (data) => {
    onSubmit(data);
  };

  const fields: (keyof OriginType)[] = [
    'companyName',
    'addressNick',
    'addressLine1',
    'cityName',
    'countryName',
    'countryCode',
    'zipCode',
    'latitude',
    'longitude',
    'phoneCode',
    'mobileNo'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Edit Origin</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className='grid grid-cols-1 gap-3 sm:grid-cols-2'
        >
          {fields.map((field) => (
            <div key={field} className='flex flex-col gap-1'>
              <Label>{field}</Label>
              <Input {...register(field)} />
            </div>
          ))}

          <DialogFooter className='col-span-full mt-4 flex justify-end gap-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type='submit'>Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOriginModal;
