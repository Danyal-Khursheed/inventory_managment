'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface UpdateUserFormData {
  id: string;
  name: string;
  sku: string;
  quantity: number;
}

interface UpdateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: UpdateUserFormData | null;
  onSubmit: (data: UpdateUserFormData) => void;
  loading?: boolean;
}

export const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  loading = false
}) => {
  const [formData, setFormData] = React.useState<UpdateUserFormData | null>(
    null
  );

  React.useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  if (!formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      prev
        ? { ...prev, [name]: name === 'quantity' ? Number(value) : value }
        : prev
    );
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>Edit user details below.</DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label>Name</Label>
            <Input name='name' value={formData.name} onChange={handleChange} />
          </div>
          <div className='grid gap-2'>
            <Label>SKU</Label>
            <Input name='sku' value={formData.sku} onChange={handleChange} />
          </div>
          <div className='grid gap-2'>
            <Label>Quantity</Label>
            <Input
              type='number'
              name='quantity'
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
