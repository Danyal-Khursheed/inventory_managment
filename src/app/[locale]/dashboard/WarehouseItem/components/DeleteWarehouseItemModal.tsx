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
      <DialogContent className='mx-auto w-full sm:max-w-md md:max-w-md lg:max-w-md xl:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Delete Warehouse Item</DialogTitle>
        </DialogHeader>

        <div className='mt-4 flex flex-col gap-4'>
          <p>
            Are you sure you want to delete{' '}
            <strong>{warehouseItem?.name}</strong>?
          </p>
        </div>

        <DialogFooter className='mt-4 flex justify-end gap-2'>
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
