'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
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
import { useLocale, useTranslations } from 'next-intl';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormValues) => void;
  loading?: boolean;
}

export interface FormValues {
  companyName: string;
  addressNick: string;
  addressLine1: string;
  cityName: string;
  countryName: string;
  countryCode: string;
  zipCode: string;
  latitude: string;
  longitude: string;
  phoneCode: string;
  mobileNo: string;
}

const CreateCountryRegionModal = ({
  open,
  onOpenChange,
  onSubmit,
  loading
}: Props) => {
  const t = useTranslations('CountryRegionForm');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>();

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={isRTL ? 'rtl' : 'ltr'}
        className='max-h-[90vh] w-[95vw] overflow-hidden p-0 sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg'
      >
        <DialogHeader>
          <DialogTitle className='mt-8 text-center text-xl font-semibold sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl'>
            {t('title')}
          </DialogTitle>
        </DialogHeader>

        <div className='flex max-h-[calc(90vh-140px)] flex-col gap-3 overflow-y-auto px-6 py-4'>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className='flex flex-col gap-3'
          >
            <div className='flex flex-col gap-2'>
              <Label>{t('companyName')}</Label>
              <Input
                {...register('companyName', {
                  required: t('errors.required', { field: t('companyName') }),
                  minLength: {
                    value: 3,
                    message: t('errors.min', {
                      field: t('companyName'),
                      count: 3
                    })
                  }
                })}
              />
              {errors.companyName && (
                <p className='text-sm text-red-500'>
                  {errors.companyName.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>{t('addressNick')}</Label>
              <Input
                {...register('addressNick', {
                  required: t('errors.required', { field: t('addressNick') })
                })}
              />
              {errors.addressNick && (
                <p className='text-sm text-red-500'>
                  {errors.addressNick.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>{t('addressLine1')}</Label>
              <Input
                {...register('addressLine1', {
                  required: t('errors.required', { field: t('addressLine1') }),
                  minLength: {
                    value: 5,
                    message: t('errors.min', {
                      field: t('addressLine1'),
                      count: 5
                    })
                  }
                })}
              />
              {errors.addressLine1 && (
                <p className='text-sm text-red-500'>
                  {errors.addressLine1.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>{t('cityName')}</Label>
              <Input
                {...register('cityName', {
                  required: t('errors.required', { field: t('cityName') })
                })}
              />
              {errors.cityName && (
                <p className='text-sm text-red-500'>
                  {errors.cityName.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>{t('countryName')}</Label>
              <Input
                {...register('countryName', {
                  required: t('errors.required', { field: t('countryName') })
                })}
              />
              {errors.countryName && (
                <p className='text-sm text-red-500'>
                  {errors.countryName.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>{t('countryCode')}</Label>
              <Input
                {...register('countryCode', {
                  required: t('errors.required', { field: t('countryCode') }),
                  minLength: {
                    value: 2,
                    message: t('errors.min', {
                      field: t('countryCode'),
                      count: 2
                    })
                  },
                  maxLength: {
                    value: 3,
                    message: t('errors.max', {
                      field: t('countryCode'),
                      count: 3
                    })
                  }
                })}
              />
              {errors.countryCode && (
                <p className='text-sm text-red-500'>
                  {errors.countryCode.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>{t('zipCode')}</Label>
              <Input
                {...register('zipCode', {
                  required: t('errors.required', { field: t('zipCode') }),
                  pattern: {
                    value: /^[0-9]{3,10}$/,
                    message: t('errors.invalidZip')
                  }
                })}
              />
              {errors.zipCode && (
                <p className='text-sm text-red-500'>{errors.zipCode.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>{t('latitude')}</Label>
              <Input
                type='text'
                step='any'
                {...register('latitude', {
                  required: t('errors.required', { field: t('latitude') }),
                  min: {
                    value: -90,
                    message: t('errors.latMin')
                  },
                  max: {
                    value: 90,
                    message: t('errors.latMax')
                  },
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message: t('errors.invalidLatitude')
                  }
                })}
              />
              {errors.latitude && (
                <p className='text-sm text-red-500'>
                  {errors.latitude.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>{t('longitude')}</Label>
              <Input
                type='text'
                step='any'
                {...register('longitude', {
                  required: t('errors.required', { field: t('longitude') }),
                  min: {
                    value: -180,
                    message: t('errors.lngMin')
                  },
                  max: {
                    value: 180,
                    message: t('errors.lngMax')
                  },
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message: t('errors.invalidLongitude')
                  }
                })}
              />
              {errors.longitude && (
                <p className='text-sm text-red-500'>
                  {errors.longitude.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>{t('phoneCode')}</Label>
              <Input
                {...register('phoneCode', {
                  required: t('errors.required', { field: t('phoneCode') }),
                  pattern: {
                    value: /^\+?[0-9]{1,4}$/,
                    message: t('errors.invalidPhoneCode')
                  }
                })}
              />
              {errors.phoneCode && (
                <p className='text-sm text-red-500'>
                  {errors.phoneCode.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>{t('mobileNo')}</Label>
              <Input
                {...register('mobileNo', {
                  required: t('errors.required', { field: t('mobileNo') }),
                  pattern: {
                    value: /^[0-9]{7,15}$/,
                    message: t('errors.invalidMobile')
                  }
                })}
              />
              {errors.mobileNo && (
                <p className='text-sm text-red-500'>
                  {errors.mobileNo.message}
                </p>
              )}
            </div>

            <DialogFooter className='bg-background sticky flex justify-end gap-2 pt-4'>
              <DialogClose asChild>
                <Button type='button' variant='outline'>
                  {t('cancel')}
                </Button>
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
