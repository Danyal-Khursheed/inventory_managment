'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';

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

import { useGetAllWarehouses } from '../hooks';
import { useCreateWarehouseItem } from '../hooks/useCreateWarehouseItem';
import { WarehouseItem } from '../types/types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warehouseItem: WarehouseItem | null;
}

interface FormValues {
  name: string;
  warehouseId: string;
  pricePerItem: number;
  quantity: number;
  weightPerItem: number;
}

const CreateWarehouseItemModal = ({
  open,
  onOpenChange,
  warehouseItem
}: Props) => {
  const t = useTranslations('WarehouseItemModal');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const isEditMode = Boolean(warehouseItem);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      warehouseId: '',
      pricePerItem: undefined,
      quantity: undefined,
      weightPerItem: undefined
    }
  });

  const {
    data: warehouses,
    isLoading,
    error
  } = useGetAllWarehouses({ pageNumber: 1, pageSize: 10 });

  const { mutate: createWarehouseItem, isPending } = useCreateWarehouseItem();

  useEffect(() => {
    if (warehouseItem) {
      reset({
        name: warehouseItem.name,
        warehouseId: warehouseItem.warehouseId,
        pricePerItem: warehouseItem.pricePerItem,
        quantity: warehouseItem.quantity,
        weightPerItem: warehouseItem.weightPerItem
      });
    } else {
      reset({
        name: '',
        warehouseId: '',
        pricePerItem: undefined,
        quantity: undefined,
        weightPerItem: undefined
      });
    }
  }, [warehouseItem, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const payload: WarehouseItem = {
      ...(isEditMode && { id: warehouseItem!.id }),
      name: data.name,
      warehouseId: data.warehouseId,
      pricePerItem: data.pricePerItem,
      quantity: data.quantity,
      weightPerItem: data.weightPerItem
    };

    createWarehouseItem(payload, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      }
    });
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={isRTL ? 'rtl' : 'ltr'}
        className={`mx-auto w-full sm:max-w-md ${isRTL ? 'text-right' : 'text-left'}`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className='items-center'>
            <DialogTitle className='text-2xl'>
              {isEditMode ? t('updateTitle') : t('createTitle')}
            </DialogTitle>
          </DialogHeader>

          <div className='mt-4 grid gap-4'>
            <div className='flex flex-col gap-2'>
              <Label>{t('name')}</Label>
              <Input
                {...register('name', {
                  required: t('nameRequired'),
                  minLength: { value: 3, message: t('nameMinLength') }
                })}
              />
              {errors.name && (
                <p className='text-sm text-red-500'>{errors.name.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>{t('warehouse')}</Label>
              {isLoading ? (
                <p className='text-sm'>{t('loadingWarehouses')}</p>
              ) : error ? (
                <p className='text-sm text-red-500'>
                  {t('fetchWarehouseError')}
                </p>
              ) : (
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
                        {warehouses?.data?.map((warehouse) => (
                          <SelectItem key={warehouse.id} value={warehouse.id}>
                            {warehouse.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              )}
              {errors.warehouseId && (
                <p className='text-sm text-red-500'>
                  {errors.warehouseId.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>{t('pricePerItem')}</Label>
              <Input
                type='number'
                {...register('pricePerItem', {
                  required: t('priceRequired'),
                  valueAsNumber: true,
                  min: { value: 1, message: t('priceMin') }
                })}
              />
              {errors.pricePerItem && (
                <p className='text-sm text-red-500'>
                  {errors.pricePerItem.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>{t('quantity')}</Label>
              <Input
                type='number'
                {...register('quantity', {
                  required: t('quantityRequired'),
                  valueAsNumber: true,
                  min: { value: 1, message: t('quantityMin') }
                })}
              />
              {errors.quantity && (
                <p className='text-sm text-red-500'>
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label>{t('weightPerItem')}</Label>
              <Input
                type='number'
                {...register('weightPerItem', {
                  required: t('weightRequired'),
                  valueAsNumber: true,
                  min: { value: 0.1, message: t('weightMin') }
                })}
              />
              {errors.weightPerItem && (
                <p className='text-sm text-red-500'>
                  {errors.weightPerItem.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className='mt-4 flex justify-end gap-2'>
            <DialogClose asChild>
              <Button
                type='button'
                variant='outline'
                onClick={handleCancel}
                disabled={isPending}
              >
                {t('cancel')}
              </Button>
            </DialogClose>

            <Button type='submit' disabled={isPending}>
              {isPending
                ? isEditMode
                  ? t('updating')
                  : t('creating')
                : isEditMode
                  ? t('update')
                  : t('create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWarehouseItemModal;
