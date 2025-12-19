'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/auth/hooks/useAuth';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2, Mail, Lock, LogIn } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

type FormData = {
  email: string;
  password: string;
};

export default function Page() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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
      router.push('/dashboard/Packages');
    } catch (err: any) {
      setError(
        err.response?.data?.message || t('Failed to sign in. Please try again.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='relative flex min-h-screen items-center justify-center'>
      <div className='relative w-full max-w-md'>
        <Card className='mx-2 border-2 backdrop-blur-sm md:shadow-2xl dark:bg-slate-900/80'>
          <CardHeader className='space-y-3 text-center'>
            <div className='bg-muted-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg shadow-lg'>
              <LogIn className='h-8 w-8 text-white' />
            </div>
            <CardTitle className='text-muted-foreground text-3xl font-bold tracking-tight'>
              {t('Sign In')}
            </CardTitle>
            <CardDescription className='text-muted-foreground text-base'>
              {t('Access your dashboard by entering your credentials')}
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            {error && (
              <div className='animate-in slide-in-from-top-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 shadow-sm dark:border-red-800 dark:bg-red-950/50 dark:text-red-200'>
                <div className='flex items-center gap-2'>
                  <div className='h-1.5 w-1.5 rounded-full bg-red-600' />
                  {error}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-sm font-medium'>
                  {t('Email')}
                </Label>
                <div className='relative'>
                  <Mail className='text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2' />
                  <Input
                    id='email'
                    type='email'
                    placeholder={t('emailPlaceholder')}
                    disabled={isLoading}
                    className={cn(
                      'h-12 pl-12 transition-all focus:ring-2 focus:ring-blue-500/20',
                      errors.email && 'border-red-500 focus:border-red-500',
                      isRTL && 'pr-12 pl-3 text-right'
                    )}
                    {...register('email', {
                      required: t('Email is required'),
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: t('Invalid email address')
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className='text-sm text-red-600 dark:text-red-400'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='password' className='text-sm font-medium'>
                    {t('Password')}
                  </Label>
                  <Link
                    href='/auth/Forgot-Password'
                    className='text-sm font-medium'
                  >
                    {t('Forgot password?')}
                  </Link>
                </div>
                <div className='relative'>
                  <Lock className='text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2' />
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('Enter your password')}
                    disabled={isLoading}
                    className={cn(
                      'h-12 pr-12 pl-12 transition-all focus:ring-2 focus:ring-blue-500/20',
                      errors.password && 'border-red-500 focus:border-red-500',
                      isRTL && 'pr-12 pl-3 text-right'
                    )}
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
                    className={cn(
                      'text-muted-foreground hover:text-foreground absolute top-1/2 -translate-y-1/2 transition-colors',
                      isRTL ? 'left-4' : 'right-4'
                    )}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className='h-5 w-5' />
                    ) : (
                      <Eye className='h-5 w-5' />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-sm text-red-600 dark:text-red-400'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type='submit'
                className='transition-all-700 h-12 w-full text-white shadow-lg disabled:opacity-50'
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    {t('Signing in...')}
                  </>
                ) : (
                  <>
                    <LogIn className='mr-2 h-4 w-4' />
                    {t('Sign In')}
                  </>
                )}
              </Button>
            </form>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-card text-muted-foreground'>
                  {t("Don't have an account?")}
                </span>
              </div>
            </div>

            <div className='text-center'>
              <Link
                href='/auth/sign-up'
                className='text-md text-bg-muted-foreground inline-flex items-center font-medium hover:text-black'
              >
                {t('Sign up')}
                <span className='ml-1'>→</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
