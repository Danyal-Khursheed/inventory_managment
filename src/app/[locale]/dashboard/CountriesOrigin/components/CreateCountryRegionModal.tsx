'use client';

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
import { useLocale, useTranslations } from 'next-intl';
import { Country, City } from 'country-state-city';

import { FormValues } from '../types/types';
import { useGetAllWarehouses } from '../../WarehouseItem/hooks';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormValues) => void;
  loading?: boolean;
  isError?: boolean;
}

const CreateCountryRegionModal = ({
  open,
  onOpenChange,
  onSubmit,
  loading,
  isError
}: Props) => {
  const t = useTranslations('CountryRegionForm');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      companyName: '',
      addressNick: '',
      addressLine1: '',
      cityName: '',
      countryName: '',
      countryCode: '',
      zipCode: '',
      latitude: '',
      longitude: '',
      phoneCode: '',
      mobileNo: '',
      warehouseId: ''
    }
  });

  const selectedCountryCode = watch('countryCode');

  const countries = Country.getAllCountries();
  const cities = selectedCountryCode
    ? (City.getCitiesOfCountry(selectedCountryCode) ?? [])
    : [];

  const { data: warehouses } = useGetAllWarehouses({
    pageNumber: 1,
    pageSize: 10
  });

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={isRTL ? 'rtl' : 'ltr'}
        className='max-h-[95vh] w-[95vw] p-0 sm:max-w-lg'
      >
        <DialogHeader className='px-6 pt-6'>
          <DialogTitle className='text-center text-xl font-semibold sm:text-2xl'>
            {t('title')}
          </DialogTitle>
        </DialogHeader>

        <div className='max-h-[calc(90vh-140px)] overflow-y-auto px-6 py-4'>
          <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-3'>
            <Field label={t('companyName')} error={errors.companyName?.message}>
              <Input
                {...register('companyName', {
                  required: t('errors.required', { field: t('companyName') }),
                  minLength: {
                    value: 3,
                    message: t('errors.min', {
                      field: t('companyName'),
                      count: 3
                    })
                  },
                  maxLength: {
                    value: 50,
                    message: t('errors.max', {
                      field: t('companyName'),
                      count: 50
                    })
                  }
                })}
              />
            </Field>

            <Field label={t('addressNick')} error={errors.addressNick?.message}>
              <Input
                {...register('addressNick', {
                  required: t('errors.required', { field: t('addressNick') }),
                  minLength: {
                    value: 2,
                    message: t('errors.min', {
                      field: t('addressNick'),
                      count: 2
                    })
                  },
                  maxLength: {
                    value: 30,
                    message: t('errors.max', {
                      field: t('addressNick'),
                      count: 30
                    })
                  }
                })}
              />
            </Field>

            <Field
              label={t('addressLine1')}
              error={errors.addressLine1?.message}
            >
              <Input
                {...register('addressLine1', {
                  required: t('errors.required', { field: t('addressLine1') }),
                  minLength: {
                    value: 5,
                    message: t('errors.min', {
                      field: t('addressLine1'),
                      count: 5
                    })
                  },
                  maxLength: {
                    value: 100,
                    message: t('errors.max', {
                      field: t('addressLine1'),
                      count: 100
                    })
                  }
                })}
              />
            </Field>

            <Field label={t('countryName')} error={errors.countryCode?.message}>
              <Controller
                name='countryCode'
                control={control}
                rules={{
                  required: t('errors.required', { field: t('countryName') })
                }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);

                      const country = countries.find(
                        (c) => c.isoCode === value
                      );
                      setValue('countryName', country?.name || '');
                      setValue('cityName', '');
                      setValue(
                        'phoneCode',
                        country?.phonecode ? `+${country.phonecode}` : ''
                      );
                    }}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder={t('selectCountry')} />
                    </SelectTrigger>
                    <SelectContent className='max-h-64'>
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

            <Field label={t('cityName')} error={errors.cityName?.message}>
              <Controller
                name='cityName'
                control={control}
                rules={{
                  required: t('errors.required', { field: t('cityName') })
                }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!selectedCountryCode}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder={t('selectCity')} />
                    </SelectTrigger>
                    <SelectContent className='max-h-64'>
                      {cities?.map((city) => (
                        <SelectItem key={city.name} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field label={t('zipCode')} error={errors.zipCode?.message}>
              <Input
                {...register('zipCode', {
                  required: t('errors.required', { field: t('zipCode') }),
                  pattern: {
                    value: /^[0-9]{3,10}$/,
                    message: t('errors.zip')
                  }
                })}
              />
            </Field>

            <Field label={t('latitude')} error={errors.latitude?.message}>
              <Input
                {...register('latitude', {
                  required: t('errors.required', { field: t('latitude') }),
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message: t('errors.latitude')
                  }
                })}
              />
            </Field>

            <Field label={t('longitude')} error={errors.longitude?.message}>
              <Input
                {...register('longitude', {
                  required: t('errors.required', { field: t('longitude') }),
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message: t('errors.longitude')
                  }
                })}
              />
            </Field>

            <div className='flex gap-2'>
              <div className='w-[20%]'>
                <Field label={t('phoneCode')} error={errors.phoneCode?.message}>
                  <Input
                    {...register('phoneCode', {
                      required: t('errors.required', { field: t('phoneCode') }),
                      pattern: {
                        value: /^\+\d{1,4}$/,
                        message: t('errors.phoneCode')
                      }
                    })}
                  />
                </Field>
              </div>

              <div className='w-[80%]'>
                <Field label={t('mobileNo')} error={errors.mobileNo?.message}>
                  <Input
                    {...register('mobileNo', {
                      required: t('errors.required', { field: t('mobileNo') }),
                      pattern: {
                        value: /^[0-9]{7,15}$/,
                        message: t('errors.mobile')
                      }
                    })}
                  />
                </Field>
              </div>
            </div>

            <Field label={t('warehouse')} error={errors.warehouseId?.message}>
              <Controller
                name='warehouseId'
                control={control}
                rules={{
                  required: t('errors.required', { field: t('warehouse') })
                }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className='w-full'>
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
                <Button variant='outline'>{t('cancel')}</Button>
              </DialogClose>
              <Button type='submit' disabled={loading}>
                {loading ? t('loading') : t('submit')}
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
  children,
  className
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex flex-col gap-1 ${className || ''}`}>
    <Label>{label}</Label>
    {children}
    {error && <p className='text-sm text-red-500'>{error}</p>}
  </div>
);
