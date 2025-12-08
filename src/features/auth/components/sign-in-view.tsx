'use client';

import { useState } from 'react';
import Link from 'next/link';
import useAuth from '@/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Signin from '@/app/Assets/Images/Signin.png';

export default function SignInViewPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Failed to sign in. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      {/* Left side - Branding */}
      <div className='bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0' />
        <div className='relative z-20 flex items-center text-lg font-medium'></div>
        <div className='relative h-full w-full overflow-hidden rounded-2xl'>
          <Image src={Signin} alt='Logo' fill className='object-contain' />
        </div>
        {/* <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;Welcome back! Sign in to continue your journey with
              us.&rdquo;
            </p>
            <footer className='text-sm'>Your Dashboard</footer>
          </blockquote>
        </div> */}
      </div>

      {/* Right side - Sign In Form */}
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          <Card className='w-full'>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl font-bold'>Sign In</CardTitle>
              <CardDescription>
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-4'>
                {error && (
                  <div className='bg-destructive/15 text-destructive rounded-md p-3 text-sm'>
                    {error}
                  </div>
                )}
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='name@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <Label htmlFor='password'>Password</Label>
                    <Link
                      href='/forgot-password'
                      className='text-muted-foreground hover:text-primary text-sm underline-offset-4 hover:underline'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id='password'
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Sign In
                </Button>
              </form>
              <div className='mt-6 text-center text-sm'>
                <span className='text-muted-foreground'>
                  Don't have an account?{' '}
                </span>
                <Link
                  href='/auth/sign-up'
                  className='text-primary font-medium underline-offset-4 hover:underline'
                >
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
          <p className='text-muted-foreground px-8 text-center text-xs'>
            By continuing, you agree to our{' '}
            <Link
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
