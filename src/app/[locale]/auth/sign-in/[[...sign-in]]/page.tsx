'use client';

import { useState } from 'react';
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
import { useTranslations, useLocale } from 'next-intl';

type FormData = {
  email: string;
  password: string;
};

export default function Page() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();
  const t = useTranslations('SignIn');

  const onSubmit = async (data: FormData) => {
    setError('');
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      router.push('/dashboard/User');
    } catch (err: any) {
      setError(
        err.response?.data?.message || t('Failed to sign in. Please try again.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-1 items-center justify-center p-6 lg:p-10'>
      <div className='w-full max-w-md space-y-6'>
        <Card className='w-full border shadow-sm'>
          <CardHeader className='space-y-1 text-center'>
            <CardTitle className='text-3xl font-bold'>{t('Sign In')}</CardTitle>
            <CardDescription className='text-lg'>
              {t('Access your dashboard by entering your credentials')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
              {error && (
                <div className='rounded-md bg-red-100 p-3 text-sm text-red-600'>
                  {error}
                </div>
              )}

              <div className='space-y-2'>
                <Label>{t('Email')}</Label>
                <Input
                  type='email'
                  placeholder={t('emailPlaceholder')}
                  disabled={isLoading}
                  {...register('email', {
                    required: t('Email is required'),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t('Invalid email address')
                    }
                  })}
                  className={isRTL ? 'text-right' : 'text-left'}
                />
                {errors.email && (
                  <p className='text-sm text-red-600'>{errors.email.message}</p>
                )}
              </div>

              <div className='relative space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label>{t('Password')}</Label>
                  <Link
                    href='/auth/Forgot-Password'
                    className='text-primary text-sm hover:underline'
                  >
                    {t('Forgot password?')}
                  </Link>
                </div>

                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('Enter your password')}
                  disabled={isLoading}
                  className={`pr-10 pl-3 ${isRTL ? 'pr-3 pl-10 text-right' : 'text-left'}`}
                  {...register('password', {
                    required: t('Password is required'),
                    minLength: {
                      value: 6,
                      message: t('Password must be at least 6 characters')
                    }
                  })}
                />

                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-9 ${isRTL ? 'left-3' : 'right-3'} text-gray-500`}
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
                className='w-full bg-[#CCCAE6] text-black hover:bg-[#CCCAE6]/50'
                disabled={isLoading}
              >
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {t('Sign In')}
              </Button>
            </form>

            <div className='mt-6 text-center text-sm'>
              <span className='text-muted-foreground'>
                {t("Don't have an account?")}{' '}
              </span>
              <Link
                href='/auth/sign-up'
                className='text-primary font-medium hover:underline'
              >
                {t('Sign up')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
