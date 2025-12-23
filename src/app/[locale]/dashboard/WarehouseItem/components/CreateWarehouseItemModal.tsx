// components/CreateWarehouseItemModal.tsx
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
  price?: number;
  quantity?: number;
  weight?: number;
}

const CreateWarehouseItemModal = ({
  open,
  onOpenChange,
  warehouseItem
}: Props) => {
  const t = useTranslations('WarehouseItemModal');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const isEditMode = !!warehouseItem;

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
      price: undefined,
      quantity: undefined,
      weight: undefined
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
        price: warehouseItem.price,
        quantity: warehouseItem.quantity,
        weight: warehouseItem.weight
      });
    } else {
      reset({
        name: '',
        warehouseId: '',
        price: undefined,
        quantity: undefined,
        weight: undefined
      });
    }
  }, [warehouseItem, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const payload: WarehouseItem = {
      ...(isEditMode && { id: warehouseItem!.id }),
      name: data.name,
      warehouseId: data.warehouseId,
      price: data.price ?? 0,
      quantity: data.quantity ?? 0,
      weight: data.weight ?? 0
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
        className={`mx-auto w-full sm:max-w-md ${
          isRTL ? 'text-right' : 'text-left'
        }`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className='items-center'>
            <DialogTitle className='text-2xl'>
              {isEditMode ? t('updateTitle') : t('createTitle')}
            </DialogTitle>
          </DialogHeader>

          <div className='mt-4 grid gap-4'>
            <div className='flex flex-col gap-2'>
              <Label className='text-start'>{t('name')}</Label>
              <Input
                className='text-start'
                placeholder={t('namePlaceholder')}
                {...register('name', {
                  required: t('nameRequired')
                })}
              />
              {errors.name && (
                <p className='text-sm text-red-500'>{errors.name.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label className='text-start'>{t('warehouse')}</Label>

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
                      <SelectTrigger className='w-full text-start'>
                        <SelectValue placeholder={t('selectWarehouse')} />
                      </SelectTrigger>
                      <SelectContent className='max-h-52 overflow-y-auto text-start'>
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
              <Label className='text-start'>{t('price')}</Label>
              <Input
                type='number'
                className='text-start'
                {...register('price', {
                  required: t('priceRequired'),
                  valueAsNumber: true,
                  min: { value: 1, message: t('priceMin') }
                })}
              />
              {errors.price && (
                <p className='text-sm text-red-500'>{errors.price.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label className='text-start'>{t('quantity')}</Label>
              <Input
                type='number'
                className='text-start'
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
              <Label className='text-start'>{t('weight')}</Label>
              <Input
                type='number'
                className='text-start'
                {...register('weight', {
                  required: t('weightRequired'),
                  valueAsNumber: true,
                  min: { value: 0.1, message: t('weightMin') }
                })}
              />
              {errors.weight && (
                <p className='text-sm text-red-500'>{errors.weight.message}</p>
              )}
            </div>
          </div>

          <DialogFooter
            className={`mt-4 flex gap-2 ${
              isRTL ? 'flex-row-reverse justify-start' : 'justify-end'
            }`}
          >
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
