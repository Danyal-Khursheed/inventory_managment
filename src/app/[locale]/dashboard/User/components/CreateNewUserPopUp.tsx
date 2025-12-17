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

interface CreateNewUserPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateNewUserPopUp = ({
  open,
  onOpenChange
}: CreateNewUserPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
            <DialogDescription>
              Fill in the details and save the user.
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4'>
            <div className='grid gap-3'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' name='name' />
            </div>

            <div className='grid gap-3'>
              <Label htmlFor='username'>Username</Label>
              <Input id='username' name='username' />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit'>Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateNewUserPopUp;
