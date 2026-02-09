'use client';

import useAuth from '@/auth/hooks/useAuth';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileViewPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className='flex w-full flex-col p-4'>
        <Skeleton className='h-32 w-full' />
      </div>
    );
  }

  const navUser = { fullName: user.name ?? undefined, email: user.email };

  return (
    <div className='flex w-full flex-col p-4'>
      <Card className='max-w-md'>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className='flex items-center gap-4'>
          <UserAvatarProfile user={navUser} showInfo />
          <div className='flex flex-col gap-1 text-sm'>
            <p>
              <span className='text-muted-foreground'>Name:</span>{' '}
              {user.name ?? '—'}
            </p>
            <p>
              <span className='text-muted-foreground'>Email:</span> {user.email}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
