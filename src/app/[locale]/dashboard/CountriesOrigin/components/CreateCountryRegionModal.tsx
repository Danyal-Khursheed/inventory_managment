'use client';

import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent
} from '@/components/ui/select';
import { Country, City } from 'country-state-city';

import { FormValues } from '../types/types';
import { useGetAllWarehouses } from '../../WarehouseItem/hooks';
import { useCreateCountryOrigin } from '../hook';
import { useTranslations, useLocale } from 'next-intl';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCountryRegionModal = ({ open, onOpenChange }: Props) => {
  const t = useTranslations('CountryRegion');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const { mutate, isPending } = useCreateCountryOrigin();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      companyName: '',
      addressNick: '',
      addressLine1: '',
      cityName: '',
      countryName: '',
      countryCode: '',
      phoneCode: '',
      mobileNo: '',
      zipCode: '',
      latitude: '',
      longitude: '',
      warehouseId: ''
    }
  });

  const selectedCountryCode = watch('countryCode');
  const phoneCode = watch('phoneCode');

  const countries = Country.getAllCountries();
  const cities = selectedCountryCode
    ? (City.getCitiesOfCountry(selectedCountryCode) ?? [])
    : [];

  const { data: warehouses } = useGetAllWarehouses({
    pageNumber: 1,
    pageSize: 10
  });

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    if (data.cityName === 'no-city') data.cityName = '';
    mutate(data, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      }
    });
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`max-h-[95vh] w-[95vw] p-0 sm:max-w-lg ${isRTL ? 'text-right' : ''}`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <DialogHeader className='px-6 pt-6'>
          <DialogTitle className='text-center text-xl font-semibold sm:text-2xl'>
            {t('createTitle')}
          </DialogTitle>
        </DialogHeader>

        <div className='max-h-[calc(90vh-140px)] overflow-y-auto px-4 py-4'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <Field label={t('companyName')} error={errors.companyName?.message}>
              <Input
                className='mt-2'
                {...register('companyName', {
                  required: t('errors.required'),
                  maxLength: { value: 100, message: t('errors.companyNameMax') }
                })}
              />
            </Field>

            <Field label={t('addressNick')} error={errors.addressNick?.message}>
              <Input
                className='mt-2'
                {...register('addressNick', {
                  required: t('errors.required'),
                  maxLength: { value: 50, message: t('errors.addressNickMax') }
                })}
              />
            </Field>

            <Field
              label={t('addressLine1')}
              error={errors.addressLine1?.message}
            >
              <Input
                className='mt-2'
                {...register('addressLine1', {
                  required: t('errors.required'),
                  maxLength: {
                    value: 200,
                    message: t('errors.addressLine1Max')
                  }
                })}
              />
            </Field>

            <Field label={t('country')} error={errors.countryCode?.message}>
              <Controller
                name='countryCode'
                control={control}
                rules={{ required: t('errors.required') }}
                render={({ field }) => (
                  <Select
                    value={field.value || undefined}
                    onValueChange={(value) => {
                      field.onChange(value);
                      const country = countries.find(
                        (c) => c.isoCode === value
                      );
                      setValue('countryName', country?.name || '', {
                        shouldDirty: true
                      });
                      setValue('cityName', '');
                      setValue(
                        'phoneCode',
                        country?.phonecode ? `+${country.phonecode}` : '',
                        { shouldDirty: true }
                      );
                    }}
                  >
                    <SelectTrigger className='mt-2 w-full'>
                      <SelectValue placeholder={t('selectCountry')} />
                    </SelectTrigger>
                    <SelectContent className='max-h-60 overflow-y-auto'>
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
            </Field>

            <Field label={t('city')} error={errors.cityName?.message}>
              <Controller
                name='cityName'
                control={control}
                rules={{ required: t('errors.required') }}
                render={({ field }) => (
                  <Select
                    value={field.value || undefined}
                    onValueChange={field.onChange}
                    disabled={!selectedCountryCode}
                  >
                    <SelectTrigger className='mt-2 w-full'>
                      <SelectValue placeholder={t('selectCity')} />
                    </SelectTrigger>
                    <SelectContent className='max-h-60 overflow-y-auto'>
                      {cities.length > 0 ? (
                        cities.map((city) => (
                          <SelectItem key={city.name} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem key='no-city' value='no-city' disabled>
                          {t('noCityFound')}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field label={t('phoneNo')} error={errors.mobileNo?.message}>
              <div className='bg-background mt-2 flex h-11 w-full items-center rounded-md border'>
                <span className='text-muted-foreground w-[20%] pl-3 text-sm font-medium'>
                  {phoneCode || '-/-'}
                </span>
                <Input
                  type='text'
                  placeholder={t('phonePlaceholder')}
                  {...register('mobileNo', {
                    required: t('errors.required'),
                    pattern: {
                      value: /^[0-9]{7,15}$/,
                      message: t('errors.mobilePattern')
                    }
                  })}
                />
              </div>
            </Field>

            <Field label={t('zipCode')} error={errors.zipCode?.message}>
              <Input
                type='text'
                className='mt-2'
                {...register('zipCode', {
                  required: t('errors.required'),
                  pattern: {
                    value: /^[0-9]{3,10}$/,
                    message: t('errors.zipPattern')
                  }
                })}
              />
            </Field>

            <Field label={t('latitude')} error={errors.latitude?.message}>
              <Input
                type='number'
                className='mt-2'
                {...register('latitude', {
                  required: t('errors.required'),
                  min: { value: -90, message: t('errors.latitudeMin') },
                  max: { value: 90, message: t('errors.latitudeMax') }
                })}
              />
            </Field>

            <Field label={t('longitude')} error={errors.longitude?.message}>
              <Input
                type='number'
                className='mt-2'
                {...register('longitude', {
                  required: t('errors.required'),
                  min: { value: -180, message: t('errors.longitudeMin') },
                  max: { value: 180, message: t('errors.longitudeMax') }
                })}
              />
            </Field>

            <Field label={t('warehouse')} error={errors.warehouseId?.message}>
              <Controller
                name='warehouseId'
                control={control}
                rules={{ required: t('errors.required') }}
                render={({ field }) => (
                  <Select
                    value={field.value || undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className='mt-2 w-full'>
                      <SelectValue placeholder={t('selectWarehouse')} />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses?.data?.map((w) => (
                        <SelectItem key={w.id} value={w.id}>
                          {w.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <DialogFooter className='flex justify-end gap-2 pt-4'>
              <DialogClose asChild>
                <Button variant='outline' onClick={handleCancel}>
                  {t('cancel')}
                </Button>
              </DialogClose>
              <Button type='submit' disabled={isPending}>
                {isPending ? t('saving') : t('submit')}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCountryRegionModal;

const Field = ({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className='flex flex-col gap-1'>
    <Label>{label}</Label>
    {children}
    {error && <p className='text-sm text-red-500'>{error}</p>}
  </div>
);
