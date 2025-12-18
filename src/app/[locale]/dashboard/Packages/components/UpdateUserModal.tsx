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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CreateUserFormData, UpdateUserModalProps } from '../types/types';

export const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  loading = false
}) => {
  // Correctly typed formData as CreateUserFormData.
  const [formData, setFormData] = React.useState<CreateUserFormData>({
    name: '',
    sku: '',
    quantity: 0
  });

  // Handle change event for form inputs.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value
    }));
  };

  // Handle form submission (onSubmit callback).
  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>
            Fill the form below to update the user.
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='sku'>SKU</Label>
            <Input
              id='sku'
              name='sku'
              value={formData.sku}
              onChange={handleChange}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='quantity'>Quantity</Label>
            <Input
              id='quantity'
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
