'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export interface ReceiverType {
  name: string;
  companyName: string;
  email: string;
  mobileNo: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ReceiverType) => void;
  defaultValues?: ReceiverType | null;
}

const CreateReceiverModal = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues
}: Props) => {
  const t = useTranslations('ReceiverModal');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ReceiverType>({
    defaultValues: defaultValues || {
      name: '',
      companyName: '',
      email: '',
      mobileNo: ''
    }
  });

  const mobileNo = watch('mobileNo');
  // Register validation only (value is controlled below)
  register('mobileNo', {
    required: t('errors.mobileRequired'),
    pattern: { value: /^[0-9]{7,15}$/, message: t('errors.mobileInvalid') }
  });

  const onFormSubmit: SubmitHandler<ReceiverType> = (data) => {
    onSubmit(data);
    reset(data);
    onOpenChange(false);
  };

  const handleClose = () => {
    reset(
      defaultValues || { name: '', companyName: '', email: '', mobileNo: '' }
    );
    onOpenChange(false);
  };

  // Reset form when defaultValues change
  useEffect(() => {
    reset(
      defaultValues || { name: '', companyName: '', email: '', mobileNo: '' }
    );
  }, [defaultValues, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={isRTL ? 'rtl' : 'ltr'}
        className='w-[95vw] max-w-lg rounded-xl px-4 sm:px-6'
      >
        <DialogHeader>
          <DialogTitle className='text-lg sm:text-xl'>{t('title')}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className='flex flex-col gap-4'
        >
          {/* Name */}
          <div className='flex flex-col gap-2'>
            <Label htmlFor='name'>{t('name')}</Label>
            <Input
              id='name'
              {...register('name', { required: t('errors.nameRequired') })}
            />
            {errors.name && (
              <p className='text-sm text-red-500'>{errors.name.message}</p>
            )}
          </div>

          {/* Company */}
          <div className='flex flex-col gap-2'>
            <Label htmlFor='companyName'>{t('company')}</Label>
            <Input
              id='companyName'
              {...register('companyName', {
                required: t('errors.companyRequired')
              })}
            />
            {errors.companyName && (
              <p className='text-sm text-red-500'>
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className='flex flex-col gap-2 sm:col-span-2'>
            <Label htmlFor='email'>{t('email')}</Label>
            <Input
              id='email'
              type='email'
              {...register('email', {
                required: t('errors.emailRequired'),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t('errors.emailInvalid')
                }
              })}
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>

          {/* Mobile — numbers only */}
          <div className='flex flex-col gap-2 sm:col-span-2'>
            <Label htmlFor='mobileNo'>{t('mobile')}</Label>
            <Input
              id='mobileNo'
              inputMode='numeric'
              autoComplete='tel'
              value={mobileNo ?? ''}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, '').slice(0, 15);
                setValue('mobileNo', v, { shouldValidate: true });
              }}
              onBlur={register('mobileNo').onBlur}
            />
            {errors.mobileNo && (
              <p className='text-sm text-red-500'>{errors.mobileNo.message}</p>
            )}
          </div>

          {/* Footer */}
          <DialogFooter className='flex flex-col-reverse gap-2 pt-2 sm:col-span-2 sm:flex-row sm:justify-end'>
            <Button
              type='button'
              variant='outline'
              className='w-full sm:w-auto'
              onClick={handleClose}
            >
              {t('cancel')}
            </Button>
            <Button type='submit' className='w-full sm:w-auto'>
              {t('create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReceiverModal;
