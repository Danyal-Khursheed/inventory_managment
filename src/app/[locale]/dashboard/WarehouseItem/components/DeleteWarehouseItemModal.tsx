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
import { WarehouseItem } from '@/services/warehouseItem';

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
  const handleDelete = () => {
    console.log('Deleted:', warehouseItem);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Warehouse Item</DialogTitle>
        </DialogHeader>
        <p className='py-4'>
          Are you sure you want to delete <strong>{warehouseItem?.name}</strong>
          ?
        </p>
        <DialogFooter className='flex justify-end gap-2'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button variant='destructive' onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWarehouseItemModal;
