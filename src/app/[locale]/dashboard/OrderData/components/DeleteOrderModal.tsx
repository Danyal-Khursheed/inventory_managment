'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDeleteOrder } from '../hooks/useDeleteOrder';
import { useLocale, useTranslations } from 'next-intl';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string | null;
}

const DeleteOrderModal = ({ open, onOpenChange, orderId }: Props) => {
  const { mutate: deleteOrder, isPending } = useDeleteOrder();
  const t = useTranslations('DeleteOrderModal');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const handleDelete = () => {
    if (!orderId) return;

    deleteOrder(orderId, {
      onSuccess: () => onOpenChange(false)
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir={isRTL ? 'rtl' : 'ltr'}>
        <DialogHeader className='items-start'>
          <DialogTitle className='text-2xl'>{t('Delete Order')}</DialogTitle>
          <DialogDescription>
            {t('Are you sure you want to delete? This action cannot be undone')}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='mt-4 flex gap-2'>
          <DialogClose asChild>
            <Button variant='outline' disabled={isPending}>
              {t('cancel')}
            </Button>
          </DialogClose>

          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isPending || !orderId}
          >
            {isPending ? t('deleting') : t('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteOrderModal;
