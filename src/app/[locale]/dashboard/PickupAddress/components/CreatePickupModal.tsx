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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLocale, useTranslations } from 'next-intl';
import { Country, City } from 'country-state-city';

import { useCreatePickup } from '../hooks';
import { useGetAllWarehouses } from '../../WarehouseItem/hooks';
import { PickupFormValues } from '../types/types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreatePickupModal = ({ open, onOpenChange }: Props) => {
  const t = useTranslations('PickupForm');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<PickupFormValues>({
    defaultValues: {
      address_nick: '',
      address: '',
      country_name: '',
      country_iso_code: '',
      city_name: '',
      phone_code: '',
      mobile_no: '',
      zip_code: '',
      latitude: '',
      longitude: '',
      warehouseId: ''
    }
  });

  const createPickupMutation = useCreatePickup();

  const selectedCountryIso = watch('country_iso_code');

  const countries = Country.getAllCountries();
  const cities = selectedCountryIso
    ? City.getCitiesOfCountry(selectedCountryIso) || []
    : [];

  const { data: warehouses } = useGetAllWarehouses({
    pageNumber: 1,
    pageSize: 10
  });

  const handleFormSubmit: SubmitHandler<PickupFormValues> = (data) => {
    const payload = {
      address_nick: data.address_nick,
      address: data.address,
      city_name: data.city_name,
      country_name: data.country_name,
      country_code: data.country_iso_code,
      mobile_no: data.mobile_no,
      zip_code: data.zip_code,
      latitude: data.latitude,
      longitude: data.longitude,
      warehouse_id: data.warehouseId
    };

    createPickupMutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={isRTL ? 'rtl' : 'ltr'}
        className='max-h-[90vh] w-[95vw] p-0 sm:max-w-lg'
      >
        <DialogHeader className='px-6 pt-6'>
          <DialogTitle className='text-center text-xl font-semibold'>
            {t('title')}
          </DialogTitle>
        </DialogHeader>

        <div className='max-h-[calc(90vh-140px)] overflow-y-auto px-6 py-4'>
          <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-3'>
            <Field
              label={t('address_nick')}
              error={errors.address_nick?.message}
            >
              <Input
                {...register('address_nick', {
                  required: t('errors.address_nick_required'),
                  minLength: {
                    value: 2,
                    message: t('errors.min', { count: 2 })
                  },
                  maxLength: {
                    value: 30,
                    message: t('errors.max', { count: 30 })
                  }
                })}
              />
            </Field>

            <Field label={t('address')} error={errors.address?.message}>
              <Input
                {...register('address', {
                  required: t('errors.address_required'),
                  minLength: {
                    value: 5,
                    message: t('errors.min', { count: 5 })
                  },
                  maxLength: {
                    value: 150,
                    message: t('errors.max', { count: 150 })
                  }
                })}
              />
            </Field>

            <Field
              label={t('country_name')}
              error={errors.country_iso_code?.message}
            >
              <Controller
                name='country_iso_code'
                control={control}
                rules={{ required: t('errors.country_required') }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      const country = countries.find(
                        (c) => c.isoCode === value
                      );
                      setValue('country_name', country?.name || '');
                      setValue('city_name', '');
                      setValue(
                        'phone_code',
                        country?.phonecode ? `+${country.phonecode}` : ''
                      );
                    }}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder={t('selectCountry')} />
                    </SelectTrigger>
                    <SelectContent className='max-h-64'>
                      {countries.map((c) => (
                        <SelectItem key={c.isoCode} value={c.isoCode}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field label={t('city_name')} error={errors.city_name?.message}>
              <Controller
                name='city_name'
                control={control}
                rules={{ required: t('errors.city_required') }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!selectedCountryIso}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder={t('selectCity')} />
                    </SelectTrigger>
                    <SelectContent className='max-h-64'>
                      {cities.map((city) => (
                        <SelectItem key={city.name} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <div className='flex gap-2'>
              <div className='w-[30%]'>
                <Field label={t('country_code')}>
                  <Input {...register('phone_code')} readOnly />
                </Field>
              </div>
              <div className='w-[70%]'>
                <Field label={t('mobile_no')} error={errors.mobile_no?.message}>
                  <Input
                    {...register('mobile_no', {
                      required: t('errors.mobile_required'),
                      pattern: {
                        value: /^[0-9]{7,15}$/,
                        message: t('errors.mobile_invalid')
                      }
                    })}
                  />
                </Field>
              </div>
            </div>

            <Field label={t('zip_code')} error={errors.zip_code?.message}>
              <Input
                {...register('zip_code', {
                  required: t('errors.zip_required'),
                  pattern: {
                    value: /^[0-9]{3,10}$/,
                    message: t('errors.zip_invalid')
                  }
                })}
              />
            </Field>

            <Field label={t('latitude')} error={errors.latitude?.message}>
              <Input
                {...register('latitude', {
                  required: t('errors.latitude_required'),
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message: t('errors.latitude_invalid')
                  }
                })}
              />
            </Field>

            <Field label={t('longitude')} error={errors.longitude?.message}>
              <Input
                {...register('longitude', {
                  required: t('errors.longitude_required'),
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message: t('errors.longitude_invalid')
                  }
                })}
              />
            </Field>

            <Field label={t('warehouse')} error={errors.warehouseId?.message}>
              <Controller
                name='warehouseId'
                control={control}
                rules={{ required: t('errors.warehouse_required') }}
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

            <DialogFooter className='pt-4'>
              <DialogClose asChild>
                <Button variant='outline'>{t('cancel')}</Button>
              </DialogClose>
              <Button type='submit' disabled={createPickupMutation.isPending}>
                {createPickupMutation.isPending ? t('loading') : t('submit')}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePickupModal;

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
