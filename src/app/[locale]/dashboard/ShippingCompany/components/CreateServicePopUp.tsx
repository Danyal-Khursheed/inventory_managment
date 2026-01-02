'use client';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslations, useLocale } from 'next-intl';

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
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent
} from '@/components/ui/select';

import { useCreateShippingCompany } from '../hooks/useCreateShippingCompany';
import { useGetAllWarehouses } from '../../Warehouse/hook';

interface FormValues {
  serviceName: string;
  serviceType: string;
  warehouseId: string;
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
    control,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    defaultValues: {
      serviceName: '',
      serviceType: '',
      warehouseId: ''
    }
  });

  const { data: warehouses } = useGetAllWarehouses({
    pageNumber: 1,
    pageSize: 10
  });

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(
      {
        serviceName: data.serviceName,
        serviceType: data.serviceType,
        warehouseId: data.warehouseId
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
      <DialogContent dir={isRTL ? 'rtl' : 'ltr'} className='w-full max-w-md'>
        <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-5'>
          <DialogHeader className='text-center'>
            <DialogTitle className='text-lg font-semibold'>
              {t('createServiceTitle')}
            </DialogTitle>
            <DialogDescription>
              {t('createServiceDescription')}
            </DialogDescription>
          </DialogHeader>

          <Field label={t('serviceName')} error={errors.serviceName?.message}>
            <Input
              placeholder={t('serviceNamePlaceholder')}
              {...register('serviceName', {
                required: t('serviceNameRequired')
              })}
            />
          </Field>

          <Field label={t('serviceType')} error={errors.serviceType?.message}>
            <Input
              placeholder={t('serviceTypePlaceholder')}
              {...register('serviceType', {
                required: t('serviceTypeRequired')
              })}
            />
          </Field>

          <Field label={t('warehouse')} error={errors.warehouseId?.message}>
            <Controller
              name='warehouseId'
              control={control}
              rules={{ required: t('warehouseRequired') }}
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

          <DialogFooter className='gap-2'>
            <DialogClose asChild>
              <Button
                variant='outline'
                disabled={isPending}
                className='w-full sm:w-auto'
              >
                {t('cancel')}
              </Button>
            </DialogClose>

            <Button
              type='submit'
              disabled={isPending}
              className='w-full sm:w-auto'
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
    {error && <p className='text-destructive text-sm'>{error}</p>}
  </div>
);
