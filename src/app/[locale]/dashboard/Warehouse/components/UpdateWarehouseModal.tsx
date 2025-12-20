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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Warehouse } from '@/services/warehouse.service';
import { useUpdateWarehouse } from '../hook';
import { Country, City } from 'country-state-city';
import { useTranslations, useLocale } from 'next-intl';
import { FormValues, UpdateWarehouseModalProps } from '../types/types';

export const UpdateWarehouseModal = ({
  open,
  onOpenChange,
  warehouse
}: UpdateWarehouseModalProps) => {
  const t = useTranslations('UpdateWarehouseModal');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      country: '',
      city: '',
      address: ''
    }
  });

  const selectedCountry = watch('country');
  const countries = Country.getAllCountries();
  const cities = City.getCitiesOfCountry(selectedCountry || '') || [];
  const { mutate, isPending } = useUpdateWarehouse();

  // Pre-fill form when warehouse changes
  useEffect(() => {
    if (!warehouse) return;
    reset({
      name: warehouse.name ?? '',
      address: warehouse.address ?? '',
      country: warehouse.country ?? '',
      city: warehouse.city ?? ''
    });
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
      <DialogContent dir={isRTL ? 'rtl' : 'ltr'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className='text-2xl'>{t('updateTitle')}</DialogTitle>
            <DialogDescription>{t('updateDescription')}</DialogDescription>
          </DialogHeader>

          <div className='mt-4 grid gap-4'>
            {/* NAME */}
            <div className='flex flex-col gap-2'>
              <Label>{t('name')}</Label>
              <Input
                placeholder={t('namePlaceholder')}
                {...register('name', { required: t('nameRequired') })}
              />
              {errors.name && (
                <p className='text-red-500'>{errors.name.message}</p>
              )}
            </div>

            {/* COUNTRY */}
            <div className='flex flex-col gap-2'>
              <Label>{t('country')}</Label>
              <Controller
                name='country'
                control={control}
                rules={{ required: t('countryRequired') }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setValue('city', '');
                    }}
                  >
                    <SelectTrigger className='h-10 w-full'>
                      <SelectValue placeholder={t('selectCountry')} />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem
                          key={country.isoCode}
                          value={country.isoCode}
                        >
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.country && (
                <p className='text-red-500'>{errors.country.message}</p>
              )}
            </div>

            {/* CITY */}
            <div className='flex flex-col gap-2'>
              <Label>{t('city')}</Label>
              <Controller
                name='city'
                control={control}
                rules={{ required: t('cityRequired') }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!selectedCountry}
                  >
                    <SelectTrigger className='h-10 w-full'>
                      <SelectValue placeholder={t('selectCity')} />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.name} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.city && (
                <p className='text-red-500'>{errors.city.message}</p>
              )}
            </div>

            {/* ADDRESS */}
            <div className='flex flex-col gap-2'>
              <Label>{t('address')}</Label>
              <Input
                placeholder={t('addressPlaceholder')}
                {...register('address', { required: t('addressRequired') })}
              />
              {errors.address && (
                <p className='text-red-500'>{errors.address.message}</p>
              )}
            </div>
          </div>

          <DialogFooter className='mt-4'>
            <DialogClose asChild>
              <Button variant='outline'>{t('cancel')}</Button>
            </DialogClose>
            <Button type='submit' disabled={isPending || !warehouse}>
              {isPending ? t('updating') : t('update')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
