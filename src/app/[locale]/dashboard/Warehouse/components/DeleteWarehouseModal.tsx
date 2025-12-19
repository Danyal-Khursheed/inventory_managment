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

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warehouse: Warehouse | null;
}

export const DeleteWarehouseModal = ({
  open,
  onOpenChange,
  warehouse
}: Props) => {
  const { mutate, isPending } = useDeleteWarehouse();

  const handleDelete = () => {
    if (!warehouse?.id) return;

    mutate(warehouse.id, {
      onSuccess: () => {
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className='items-center'>
          <DialogTitle className='text-2xl'>Delete Warehouse</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{' '}
            <span className='font-semibold'>{warehouse?.name}</span>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='mt-4'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>

          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isPending || !warehouse}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
