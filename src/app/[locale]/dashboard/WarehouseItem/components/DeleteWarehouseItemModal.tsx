// components/DeleteWarehouseItemModal.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { WarehouseItem } from '../types/types';
import { useDeleteWarehouseItem } from '../hooks';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warehouseItem: WarehouseItem | null;
}

const DeleteWarehouseItemModal = ({
  open,
  onOpenChange,
  warehouseItem
}: Props) => {
  const t = useTranslations('DeleteWarehouseItemModal');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const { mutate: deleteItem, isPending } = useDeleteWarehouseItem();

  const handleDelete = () => {
    if (!warehouseItem?.id) return;

    deleteItem(warehouseItem.id, {
      onSuccess: () => {
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={isRTL ? 'rtl' : 'ltr'}
        className={`mx-auto w-full sm:max-w-md ${
          isRTL ? 'text-right' : 'text-left'
        }`}
      >
        <DialogHeader>
          <DialogTitle className='text-xl'>{t('title')}</DialogTitle>
        </DialogHeader>

        <div className='mt-4'>
          <p className='text-start'>
            {t('confirmation')} <strong>{warehouseItem?.name}</strong>?
          </p>
        </div>

        <DialogFooter
          className={`mt-4 flex gap-2 ${
            isRTL ? 'flex-row-reverse justify-start' : 'justify-end'
          }`}
        >
          <DialogClose asChild>
            <Button variant='outline' disabled={isPending}>
              {t('cancel')}
            </Button>
          </DialogClose>

          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? t('deleting') : t('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWarehouseItemModal;
