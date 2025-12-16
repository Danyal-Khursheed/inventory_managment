'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/auth/hooks/useAuth';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

type FormData = {
  email: string;
  password: string;
};

export default function Page() {
  const { login, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setError('');
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      router.push('/dashboard/overview');
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Failed to sign in. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  if (showPassword) {
  }

  return (
    <div>
      <div className='flex flex-1 items-center justify-center p-6 lg:p-10'>
        <div className='w-full max-w-md space-y-6'>
          <Card className='w-full border border-gray-200 shadow-sm dark:border-neutral-800'>
            <CardHeader className='space-y-1 text-center'>
              <CardTitle className='text-3xl font-bold tracking-tight'>
                Sign In
              </CardTitle>
              <CardDescription>
                Access your dashboard by entering your credentials
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                {error && (
                  <div className='rounded-md bg-red-100 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400'>
                    {error}
                  </div>
                )}

                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='name@example.com'
                    disabled={isLoading}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className='text-sm text-red-600'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className='relative space-y-2'>
                  <div className='flex items-center justify-between'>
                    <Label htmlFor='password'>Password</Label>
                    <Link
                      href='/auth/Forgot-Password'
                      className='text-primary text-sm underline-offset-4 hover:underline'
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    disabled={isLoading}
                    className='pr-10'
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                  />

                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute top-9 right-3 text-gray-500'
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>

                  {errors.password && (
                    <p className='text-sm text-red-600'>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type='submit'
                  className='w-full bg-[#CCCAE6] text-black/80 hover:bg-[#CCCAE6]/50 hover:text-black'
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Sign In
                </Button>
              </form>

              <div className='mt-6 text-center text-sm'>
                <span className='text-muted-foreground'>
                  Don&apos;t have an account?{' '}
                </span>
                <Link
                  href='/auth/sign-up'
                  className='text-primary font-medium hover:underline'
                >
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
