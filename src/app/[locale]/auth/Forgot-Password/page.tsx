'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SignIn from '@/app/Assets/Images/SignIn.png';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Image from 'next/image';
import { toast } from 'sonner';
import { log } from 'console';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      toast.error('Please enter your email.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        'https://kingshipbackend-production.up.railway.app/api/users/forgot-password',
        {
          method: 'POST',
          body: JSON.stringify({ email }),
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const data = await res.json();
      toast.success('Password reset link sent to your email!');

      router.push(
        `/auth/Reset-Pasword?otp=${data.otp}&token=${data.token}&email=${email}`
      );
    } catch (err) {
      toast.error('Failed to send reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-muted/10 relative flex h-screen flex-col lg:grid lg:grid-cols-2'>
      <div className='relative hidden h-full flex-col border-r bg-white p-6 lg:flex dark:bg-neutral-900'>
        <div className='relative h-full w-full overflow-hidden rounded-2xl border border-gray-100 shadow-lg dark:border-neutral-800'>
          <Image
            src={SignIn}
            alt='Reset Password Illustration'
            fill
            className='object-cover'
          />
          <div className='absolute inset-0 from-black/20 to-transparent' />
          <div className='absolute bottom-2 left-6 space-y-1 text-gray-700 drop-shadow'>
            <p className='text-xl font-semibold'>Forgot your password?</p>
            <p className='text-sm opacity-90'>
              Enter your email to reset your password
            </p>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center p-6 lg:p-10'>
        <div className='w-full max-w-md space-y-6'>
          <Card className='w-full border border-gray-200 shadow-sm dark:border-neutral-800'>
            <CardHeader className='space-y-1 text-center'>
              <CardTitle className='text-3xl font-bold tracking-tight'>
                Forgot Password
              </CardTitle>
              <CardDescription>
                Enter your email below and we'll send you a reset link
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className='space-y-5'>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='name@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Button
                  className='w-full'
                  onClick={handleReset}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>

                <div className='mt-6 text-center text-sm'>
                  <span className='text-muted-foreground'>
                    Remembered your password?{' '}
                  </span>
                  <Link
                    href='/auth/sign-in'
                    className='text-primary font-medium underline-offset-4 hover:underline'
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
