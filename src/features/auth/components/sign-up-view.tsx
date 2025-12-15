'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import useAuth from '@/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import Image from 'next/image';
import SignIn from '@/app/Assets/Images/SignIn.png';

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  countryCode: string;
  phoneNumber: string;
  companyName: string;
  companyEmail: string;
  companyCountryCode: string;
  companyPhoneNumber: string;
  address: string;
};

export default function SignUpViewPage() {
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setError('');

    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await signup({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        countryCode: data.countryCode,
        phoneNumber: data.phoneNumber,
        companyName: data.companyName,
        companyEmail: data.companyEmail,
        companyCountryCode: data.companyCountryCode,
        companyPhoneNumber: data.companyPhoneNumber,
        address: data.address
      });

      router.push('/auth/sign-in');
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Failed to sign up. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-screen bg-gray-200 lg:grid lg:grid-cols-2'>
      <div className='hidden h-full border-r p-9 lg:flex dark:border-neutral-800 dark:bg-neutral-900'>
        <div className='relative h-full w-full overflow-hidden border border-gray-100 dark:border-neutral-800'>
          <Image
            src={SignIn}
            alt='Sign Up Illustration'
            fill
            className='object-cover'
          />
          <div className='absolute inset-0 from-gray-700 to-transparent' />
          <div className='absolute bottom-3 left-6 text-gray-700'>
            <p className='text-xl font-semibold'>Create Your Account</p>
            <p className='text-sm opacity-90'>Join us and get started today.</p>
          </div>
        </div>
      </div>

      <div className='flex h-screen flex-col items-center justify-start overflow-y-auto p-6 lg:p-10'>
        <div className='w-full max-w-md'>
          <Card className='w-full border border-gray-200 shadow-sm dark:border-neutral-800'>
            <CardHeader className='space-y-1 text-center'>
              <CardTitle className='text-3xl font-bold'>
                Create Account
              </CardTitle>
              <CardDescription>
                Enter your information to register your new account
              </CardDescription>
            </CardHeader>

            <CardContent className='space-y-5'>
              {error && (
                <div className='rounded bg-red-100 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400'>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                <div className='flex flex-col gap-2'>
                  <Label>Full Name</Label>
                  <Input
                    placeholder='John Doe'
                    disabled={isLoading}
                    {...register('fullName', {
                      required: 'Full name is required'
                    })}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Label>Email</Label>
                  <Input
                    type='email'
                    placeholder='name@example.com'
                    disabled={isLoading}
                    {...register('email', { required: 'Email is required' })}
                  />
                </div>

                <div className='relative flex flex-col gap-2'>
                  <Label>Password</Label>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='At least 6 characters'
                    disabled={isLoading}
                    className='pr-10'
                    {...register('password', {
                      required: 'Password is required',
                      minLength: 6
                    })}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute top-10 right-3 -translate-y-1/2 text-gray-500'
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className='relative flex flex-col gap-2'>
                  <Label>Confirm Password</Label>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm your password'
                    disabled={isLoading}
                    className='pr-10'
                    {...register('confirmPassword', { required: true })}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute top-10 right-3 -translate-y-1/2 text-gray-500'
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <div className='flex flex-col gap-2'>
                  <Label>Country Code</Label>
                  <Input
                    disabled={isLoading}
                    {...register('countryCode', { required: true })}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Label>Phone Number</Label>
                  <Input
                    type='number'
                    disabled={isLoading}
                    {...register('phoneNumber', { required: true })}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Label>Company Name</Label>
                  <Input
                    disabled={isLoading}
                    {...register('companyName', { required: true })}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Label>Company Email</Label>
                  <Input
                    type='email'
                    disabled={isLoading}
                    {...register('companyEmail', { required: true })}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Label>Company Country Code</Label>
                  <Input
                    type='number'
                    disabled={isLoading}
                    {...register('companyCountryCode', { required: true })}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Label>Company Phone Number</Label>
                  <Input
                    type='number'
                    disabled={isLoading}
                    {...register('companyPhoneNumber', { required: true })}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Label>Address</Label>
                  <Input
                    disabled={isLoading}
                    {...register('address', { required: true })}
                  />
                </div>

                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Create Account
                </Button>
              </form>

              <div className='mt-6 text-center text-sm'>
                <span className='text-muted-foreground'>
                  Already have an account?{' '}
                </span>
                <Link
                  href='/auth/sign-in'
                  className='text-primary font-medium hover:underline'
                >
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
