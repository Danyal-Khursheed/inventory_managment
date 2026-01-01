'use client';

import { useEffect, useState, useMemo } from 'react';
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

  const [countrySearch, setCountrySearch] = useState('');
  const [citySearch, setCitySearch] = useState('');

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
  const allCountries = Country.getAllCountries();
  const filteredCountries = useMemo(
    () =>
      allCountries.filter((c) =>
        c.name.toLowerCase().includes(countrySearch.toLowerCase())
      ),
    [allCountries, countrySearch]
  );

  const allCities = selectedCountry
    ? City.getCitiesOfCountry(selectedCountry)
    : [];
  const filteredCities = useMemo(
    () =>
      (allCities || []).filter((c) =>
        c.name.toLowerCase().includes(citySearch.toLowerCase())
      ),
    [allCities, citySearch]
  );

  const { mutate, isPending } = useUpdateWarehouse();

  useEffect(() => {
    if (!warehouse) return;

    reset({
      name: warehouse.name ?? '',
      address: warehouse.address ?? '',
      country: warehouse.countryCode ?? '',
      city: warehouse.city ?? ''
    });
    setCountrySearch('');
    setCitySearch('');
  }, [warehouse, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!warehouse?.id) return;

    const payload = {
      name: data.name,
      address: data.address,
      city: data.city,
      countryCode: data.country,
      countryName:
        allCountries.find((c) => c.isoCode === data.country)?.name || ''
    };

    mutate(
      { warehouseId: warehouse.id, warehouseData: payload },
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
      <DialogContent
        dir={isRTL ? 'rtl' : 'ltr'}
        className='max-h-[90vh] w-[95%] max-w-md overflow-y-auto sm:w-[95%] sm:max-w-md md:w-md lg:w-lg'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className='text-2xl'>{t('updateTitle')}</DialogTitle>
            <DialogDescription>{t('updateDescription')}</DialogDescription>
          </DialogHeader>

          <div className='mt-4 grid gap-4'>
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
                      setCitySearch('');
                    }}
                  >
                    <SelectTrigger className='h-10 w-full'>
                      <SelectValue placeholder={t('selectCountry')} />
                    </SelectTrigger>
                    <SelectContent className='max-h-60 overflow-y-auto'>
                      <div className='sticky top-0 z-10 bg-white p-2'>
                        <Input
                          placeholder={t('searchCountry')}
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          className='w-full'
                        />
                      </div>
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                          <SelectItem
                            key={country.isoCode}
                            value={country.isoCode}
                          >
                            {country.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className='p-2 text-gray-500'>
                          {t('noCountriesFound')}
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.country && (
                <p className='text-red-500'>{errors.country.message}</p>
              )}
            </div>

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
                    <SelectContent className='max-h-60 overflow-y-auto'>
                      <div className='sticky top-0 z-10 bg-white p-2'>
                        <Input
                          placeholder={t('searchCity')}
                          value={citySearch}
                          onChange={(e) => setCitySearch(e.target.value)}
                          className='w-full'
                          disabled={!selectedCountry}
                        />
                      </div>
                      {filteredCities.length > 0 ? (
                        filteredCities.map((city) => (
                          <SelectItem key={city.name} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className='p-2 text-gray-500'>
                          {t('noCitiesFound')}
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.city && (
                <p className='text-red-500'>{errors.city.message}</p>
              )}
            </div>

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

          <DialogFooter className='mt-4 flex justify-end gap-2'>
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
