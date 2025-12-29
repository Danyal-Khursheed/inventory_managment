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
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslations, useLocale } from 'next-intl';
import { useCreateShippingCompany } from '../hooks/useCreateShippingCompany';

interface FormValues {
  serviceName: string;
  serviceType: string;
}

interface CreateServicePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateServicePopUp = ({
  open,
  onOpenChange
}: CreateServicePopupProps) => {
  const t = useTranslations('createService');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const { mutate, isPending } = useCreateShippingCompany();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    defaultValues: {
      serviceName: '',
      serviceType: ''
    }
  });

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(
      {
        serviceName: data.serviceName,
        serviceType: data.serviceType
      },
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
        className='w-full max-w-sm sm:w-[90%]'
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogHeader className='text-center'>
            <DialogTitle className='text-lg font-semibold'>
              {t('createServiceTitle')}
            </DialogTitle>
            <DialogDescription>
              {t('createServiceDescription')}
            </DialogDescription>
          </DialogHeader>

          <div className='mt-4 flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <Label>{t('serviceName')}</Label>
              <Input
                placeholder={t('serviceNamePlaceholder')}
                {...register('serviceName', {
                  required: t('serviceNameRequired')
                })}
              />
              {errors.serviceName && (
                <p className='text-sm text-red-500'>
                  {errors.serviceName.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>{t('serviceType')}</Label>
              <Input
                placeholder={t('serviceTypePlaceholder')}
                {...register('serviceType', {
                  required: t('serviceTypeRequired')
                })}
              />
              {errors.serviceType && (
                <p className='text-sm text-red-500'>
                  {errors.serviceType.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className='mt-4 flex justify-end gap-2'>
            <DialogClose asChild>
              <Button
                variant='outline'
                className='w-full sm:w-auto'
                disabled={isPending}
              >
                {t('cancel')}
              </Button>
            </DialogClose>

            <Button
              type='submit'
              className='w-full sm:w-auto'
              disabled={isPending}
            >
              {isPending ? t('creating') : t('create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServicePopUp;
