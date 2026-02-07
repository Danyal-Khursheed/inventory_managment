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
import { Warehouse } from '@/services/warehouse.service';
import { useDeleteWarehouse } from '../hook';
import { useLocale, useTranslations } from 'next-intl';
import { DeleteProps } from '../types/types';

export const DeleteWarehouseModal = ({
  open,
  onOpenChange,
  warehouse
}: DeleteProps) => {
  const { mutate, isPending } = useDeleteWarehouse();
  const t = useTranslations('DeleteWarehouseModal');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const handleDelete = () => {
    if (!warehouse?.id) return;

    mutate(warehouse.id, {
      onSuccess: () => onOpenChange(false)
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir={isRTL ? 'rtl' : 'ltr'}>
        <DialogHeader className='items-start'>
          <DialogTitle className='text-2xl'>
            {t('Delete Warehouse')}
          </DialogTitle>
          <DialogDescription>
            {t('Are you sure you want to delete This action cannot be undone')}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='mt-4'>
          <DialogClose asChild>
            <Button variant='outline'>{t('cancel')}</Button>
          </DialogClose>

          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isPending || !warehouse}
          >
            {isPending ? t('deleting') : t('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
