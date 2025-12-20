'use client';

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
import { CreateNewWarehousePopupProps, FormValues } from '../types/types';
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

const CreateNewWarehousePopUp = ({
  open,
  onOpenChange
}: CreateNewWarehousePopupProps) => {
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
    defaultValues: { name: '', country: '', city: '', address: '' }
  });
  const selectedCountry = watch('country');
  const countries = Country.getAllCountries();
  const cities = City.getCitiesOfCountry(selectedCountry || '') || [];

  const { mutate, isPending } = useCreateWarehouse();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir={isRTL ? 'rtl' : 'ltr'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className='items-center'>
            <DialogTitle className='text-2xl'>{t('createTitle')}</DialogTitle>
            <DialogDescription>{t('createDescription')}</DialogDescription>
          </DialogHeader>

          <div className='mt-4 grid gap-4'>
            <div className='flex flex-col gap-2'>
              <Label>{t('name')}</Label>
              <Input
                placeholder={t('namePlaceholder')}
                {...register('name', {
                  required: t('nameRequired')
                })}
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

            <div className='flex flex-col gap-2'>
              <Label>{t('address')}</Label>
              <Input
                placeholder={t('addressPlaceholder')}
                {...register('address', {
                  required: t('addressRequired')
                })}
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
            <Button type='submit' disabled={isPending}>
              {isPending ? t('creating') : t('create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewWarehousePopUp;
