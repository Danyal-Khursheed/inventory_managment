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
import { useCreatePickup } from '../hooks';
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
    formState: { errors },
    reset
  } = useForm<PickupFormValues>();

  const createPickupMutation = useCreatePickup();

  const handleFormSubmit: SubmitHandler<PickupFormValues> = (data) => {
    createPickupMutation.mutate(data, {
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
        className='max-h-[90vh] w-[95vw] overflow-hidden p-0 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg'
      >
        <DialogHeader>
          <DialogTitle className='mt-8 text-center text-xl font-semibold sm:text-2xl'>
            {t('title')}
          </DialogTitle>
        </DialogHeader>

        <div className='flex max-h-[calc(90vh-140px)] flex-col gap-3 overflow-y-auto px-6 py-4'>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className='flex flex-col gap-3'
          >
            {/* Address Nick */}
            <Field
              label={t('address_nick')}
              error={errors.address_nick?.message}
            >
              <Input
                {...register('address_nick', {
                  required: t('errors.address_nick_required')
                })}
                disabled={createPickupMutation.isPending}
              />
            </Field>

            {/* Address */}
            <Field label={t('address')} error={errors.address?.message}>
              <Input
                {...register('address', {
                  required: t('errors.address_required')
                })}
                disabled={createPickupMutation.isPending}
              />
            </Field>

            {/* City */}
            <Field label={t('city_name')} error={errors.city_name?.message}>
              <Input
                {...register('city_name', {
                  required: t('errors.city_required')
                })}
                disabled={createPickupMutation.isPending}
              />
            </Field>

            {/* Country Name */}
            <Field
              label={t('country_name')}
              error={errors.country_name?.message}
            >
              <Input
                {...register('country_name', {
                  required: t('errors.country_required')
                })}
                disabled={createPickupMutation.isPending}
              />
            </Field>

            {/* Country Code & Mobile No */}
            <div className='flex flex-1 items-center gap-2'>
              <div className='w-[30%]'>
                <Field
                  label={t('country_code')}
                  error={errors.country_code?.message}
                >
                  <Input
                    {...register('country_code', {
                      required: t('errors.required'),
                      minLength: {
                        value: 2,
                        message: t('errors.country_code_length')
                      },
                      maxLength: {
                        value: 3,
                        message: t('errors.country_code_length')
                      }
                    })}
                    disabled={createPickupMutation.isPending}
                  />
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
                    disabled={createPickupMutation.isPending}
                  />
                </Field>
              </div>
            </div>

            {/* Zip Code */}
            <Field label={t('zip_code')} error={errors.zip_code?.message}>
              <Input
                {...register('zip_code', {
                  required: t('errors.zip_required'),
                  pattern: {
                    value: /^[0-9]{3,10}$/,
                    message: t('errors.zip_invalid')
                  }
                })}
                disabled={createPickupMutation.isPending}
              />
            </Field>

            {/* Latitude */}
            <Field label={t('latitude')} error={errors.latitude?.message}>
              <Input
                {...register('latitude', {
                  required: t('errors.latitude_required'),
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message: t('errors.latitude_invalid')
                  }
                })}
                disabled={createPickupMutation.isPending}
              />
            </Field>

            {/* Longitude */}
            <Field label={t('longitude')} error={errors.longitude?.message}>
              <Input
                {...register('longitude', {
                  required: t('errors.longitude_required'),
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message: t('errors.longitude_invalid')
                  }
                })}
                disabled={createPickupMutation.isPending}
              />
            </Field>

            <DialogFooter className='bg-background sticky pt-4'>
              <DialogClose asChild>
                <Button
                  type='button'
                  variant='outline'
                  disabled={createPickupMutation.isPending}
                >
                  {t('cancel')}
                </Button>
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

const Field = ({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className='flex flex-col gap-2'>
    <Label>{label}</Label>
    {children}
    {error && <p className='text-sm text-red-500'>{error}</p>}
  </div>
);

export default CreatePickupModal;
