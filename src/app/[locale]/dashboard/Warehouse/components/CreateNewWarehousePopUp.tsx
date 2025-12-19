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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCreateWarehouse } from '../hook';

interface FormValues {
  name: string;
  address: string;
  city: string;
  country: string;
}

interface CreateNewWarehousePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateNewWarehousePopUp = ({
  open,
  onOpenChange
}: CreateNewWarehousePopupProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>();

  const { mutate, isPending } = useCreateWarehouse();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className='items-center'>
            <DialogTitle className='text-2xl'>Create Warehouse</DialogTitle>
            <DialogDescription>
              Fill warehouse details and save.
            </DialogDescription>
          </DialogHeader>

          <div className='mt-4 grid gap-4'>
            {['name', 'address', 'city', 'country'].map((field) => (
              <div key={field} className='flex flex-col gap-2'>
                <Label>{field.toUpperCase()}</Label>
                <Input
                  {...register(field as keyof FormValues, {
                    required: `${field} is required`
                  })}
                />
                {errors[field as keyof FormValues] && (
                  <p className='text-red-500'>
                    {errors[field as keyof FormValues]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <DialogFooter className='mt-4'>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewWarehousePopUp;
