'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { IconX } from '@tabler/icons-react';
import * as React from 'react';

export function UserNav() {
  const { user } = useUser();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  if (!user) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <UserAvatarProfile user={user} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='relative w-56'
        align='end'
        sideOffset={10}
        forceMount
      >
        {/* Close Button */}
        <Button
          size='icon'
          variant='ghost'
          className='absolute top-4 right-1 p-1 hover:bg-gray-100'
          onClick={() => setOpen(false)}
        >
          <IconX className='text-muted-foreground h-4 w-4' />
        </Button>

        <DropdownMenuLabel className='pt-4 font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>{user.fullName}</p>
            <p className='text-muted-foreground text-xs leading-none'>
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
            Profile
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
          {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
          {/* <DropdownMenuItem>New Team</DropdownMenuItem> */}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <SignOutButton redirectUrl='/auth/sign-in' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
