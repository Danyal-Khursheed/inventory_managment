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
import useAuth from '@/auth/hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { IconX } from '@tabler/icons-react';
import * as React from 'react';

export function UserNav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const locale = pathname?.match(/^\/(en|ar)/)?.[1] ?? 'en';

  const navUser = user
    ? {
        fullName: user.name ?? undefined,
        email: user.email,
        emailAddresses: [{ emailAddress: user.email }]
      }
    : null;

  if (!user) return null;

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <UserAvatarProfile user={navUser} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='relative w-56'
        align='end'
        sideOffset={10}
        forceMount
      >
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
            <p className='text-sm leading-none font-medium'>
              {user.name ?? user.email}
            </p>
            <p className='text-muted-foreground text-xs leading-none'>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push(`/${locale}/dashboard/profile`)}
          >
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
