// components/DeleteWarehouseItemModal.tsx
'use client';

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
  const { mutate: deleteItem, isPending } = useDeleteWarehouseItem();

  const handleDelete = () => {
    if (!warehouseItem?.id) return; // Ensure we have the ID
    console.log('Deleting item with ID:', warehouseItem.id); // Optional debug log

    deleteItem(warehouseItem.id, {
      onSuccess: () => {
        console.log('Deleted item with ID:', warehouseItem.id); // Debug log for successful deletion
        onOpenChange(false); // Close the modal on success
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='mx-auto w-full sm:max-w-md xl:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Delete Warehouse Item</DialogTitle>
        </DialogHeader>

        <div className='mt-4'>
          <p>
            Are you sure you want to delete{' '}
            <strong>{warehouseItem?.name}</strong>?
          </p>
        </div>

        <DialogFooter className='mt-4 flex justify-end gap-2'>
          <DialogClose asChild>
            <Button variant='outline' disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWarehouseItemModal;
