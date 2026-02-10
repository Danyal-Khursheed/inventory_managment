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
import { useTranslations } from 'next-intl';

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
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<OriginType>();
  const t = useTranslations('OriginCard');

  useEffect(() => {
    if (open && defaultValues) {
      reset(defaultValues);
    }
  }, [open, defaultValues, reset]);

  const onFormSubmit: SubmitHandler<OriginType> = (data) => {
    onSubmit(data);
  };

  const textFields: (keyof OriginType)[] = [
    'companyName',
    'addressNick',
    'addressLine1',
    'cityName',
    'countryName',
    'countryCode',
    'zipCode',
    'latitude',
    'longitude',
    'phoneCode'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] w-[95vw] max-w-2xl overflow-y-auto rounded-xl px-4 sm:px-6'>
        <DialogHeader>
          <DialogTitle className='text-lg sm:text-xl'>Edit Origin</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className='grid grid-cols-1 gap-4 sm:grid-cols-2'
        >
          {textFields.map((field) => (
            <div key={field} className='flex flex-col gap-1'>
              <Label className='text-sm capitalize'>{field}</Label>
              <Input {...register(field)} />
            </div>
          ))}
          <div className='flex flex-col gap-1'>
            <Label className='text-sm capitalize'>
              {t('mobile')} (numbers only)
            </Label>
            <Input
              inputMode='numeric'
              value={watch('mobileNo') ?? ''}
              onChange={(e) =>
                setValue(
                  'mobileNo',
                  e.target.value.replace(/\D/g, '').slice(0, 15)
                )
              }
              onBlur={register('mobileNo').onBlur}
            />
          </div>

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

export default EditOriginModal;
