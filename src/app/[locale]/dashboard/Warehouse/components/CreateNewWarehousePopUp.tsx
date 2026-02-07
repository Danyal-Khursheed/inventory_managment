'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  CreateNewWarehousePopupProps,
  CreateWarehouse,
  FormValues
} from '../types/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useCreateWarehouse } from '../hook';
import { Country, City } from 'country-state-city';
import { useTranslations, useLocale } from 'next-intl';
import { SelectViewport } from '@radix-ui/react-select';

const CreateNewWarehousePopUp = ({
  open,
  onOpenChange,
  initialData
}: CreateNewWarehousePopupProps & { initialData?: CreateWarehouse }) => {
  const t = useTranslations('Warehouse');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      country: '',
      city: '',
      address: ''
    }
  });

  const [countrySearch, setCountrySearch] = useState('');
  const [citySearch, setCitySearch] = useState('');

  const selectedCountry = watch('country');

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name);
      setValue('address', initialData.address);
      setValue('country', initialData.countryCode);
      setValue('city', initialData.city);
    }
  }, [initialData, setValue]);

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

  const { mutate, isPending } = useCreateWarehouse();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const payload = {
      name: data.name,
      address: data.address,
      city: data.city,
      countryName:
        allCountries.find((c) => c.isoCode === data.country)?.name || '',
      countryCode: data.country
    };

    mutate(payload, {
      onSuccess: () => {
        reset();
        setCountrySearch('');
        setCitySearch('');
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={isRTL ? 'rtl' : 'ltr'}
        className='max-h-[90vh] w-[95%] max-w-md overflow-y-auto sm:mx-auto sm:w-[90%] sm:max-w-md md:w-md lg:w-lg'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className='items-center'>
            <DialogTitle className='text-2xl'>{t('createTitle')}</DialogTitle>
            <DialogDescription>{t('createDescription')}</DialogDescription>
          </DialogHeader>

          <div className='mt-4'>
            <div className='flex w-full flex-col gap-2'>
              <Label>{t('name')}</Label>
              <Input
                placeholder={t('namePlaceholder')}
                {...register('name', { required: t('nameRequired') })}
              />
              {errors.name && (
                <p className='text-red-500'>{errors.name.message}</p>
              )}
            </div>

            <div className='mt-4 flex w-full flex-col gap-2'>
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
                    <SelectContent className='p-0'>
                      <div className='border-b p-2'>
                        <Input
                          placeholder={t('searchCountry')}
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          className='w-full'
                        />
                      </div>

                      <SelectViewport className='max-h-60'>
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
                      </SelectViewport>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.country && (
                <p className='text-red-500'>{errors.country.message}</p>
              )}
            </div>

            <div className='mt-4 flex w-full flex-col gap-2'>
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
                    <SelectContent className='p-0'>
                      <div className='border-b p-2'>
                        <Input
                          placeholder={t('searchCity')}
                          value={citySearch}
                          onChange={(e) => setCitySearch(e.target.value)}
                          disabled={!selectedCountry}
                        />
                      </div>

                      <SelectViewport className='max-h-60'>
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
                      </SelectViewport>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.city && (
                <p className='text-red-500'>{errors.city.message}</p>
              )}
            </div>

            <div className='mt-4 flex w-full flex-col gap-2'>
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

          <DialogFooter className='mt-4 flex flex-col justify-end gap-2 sm:flex-row'>
            <DialogClose asChild>
              <Button
                variant='outline'
                className='w-full cursor-pointer sm:w-auto'
              >
                {t('cancel')}
              </Button>
            </DialogClose>
            <Button
              type='submit'
              disabled={isPending}
              className='w-full cursor-pointer sm:w-auto'
            >
              {isPending ? t('creating') : t('create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewWarehousePopUp;
