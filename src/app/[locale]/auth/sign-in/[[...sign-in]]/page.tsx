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
      router.push(`/${locale}/dashboard/Statistics`);
    } catch (err: any) {
      setError(err.response?.data?.message || t('signInFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'border-border w-full max-w-[440px] rounded-2xl border px-6 py-8 shadow-sm',
        isRTL && 'text-right'
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className='mb-8 flex flex-col items-center text-center'>
        <div className='bg-primary/10 text-primary mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl'>
          <LogIn className='h-6 w-6' />
        </div>
        <h1 className='text-foreground text-2xl font-semibold tracking-tight'>
          {t('Sign In')}
        </h1>
        <p className='text-muted-foreground mt-2 text-sm'>
          {t('Access your dashboard by entering your credentials')}
        </p>
      </div>

      {error && (
        <div
          className={cn(
            'mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300'
          )}
        >
          <span className='h-2 w-2 shrink-0 rounded-full bg-red-500' />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <div className='space-y-2'>
          <Label
            htmlFor='email'
            className='text-foreground text-sm font-medium'
          >
            {t('Email')}
          </Label>
          <div className='relative'>
            <Mail
              className={cn(
                'text-muted-foreground absolute top-1/2 h-5 w-5 -translate-y-1/2',
                isRTL ? 'right-3' : 'left-3'
              )}
            />
            <Input
              id='email'
              type='email'
              placeholder={t('emailPlaceholder')}
              disabled={isLoading}
              className={cn(
                'border-input bg-background placeholder:text-muted-foreground focus-visible:ring-primary/20 h-11 rounded-lg border px-4 transition-colors focus-visible:ring-2',
                isRTL ? 'pr-10 pl-4' : 'pr-4 pl-10',
                errors.email &&
                  'border-destructive focus-visible:ring-destructive/20'
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
            <p className='text-destructive text-xs'>{errors.email.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label
              htmlFor='password'
              className='text-foreground text-sm font-medium'
            >
              {t('Password')}
            </Label>
            <Link
              href={`/${locale}/auth/Forgot-Password`}
              className='text-primary text-xs font-medium hover:underline'
            >
              {t('Forgot password?')}
            </Link>
          </div>
          <div className='relative'>
            <Lock
              className={cn(
                'text-muted-foreground absolute top-1/2 h-5 w-5 -translate-y-1/2',
                isRTL ? 'right-3' : 'left-3'
              )}
            />
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder={t('Enter your password')}
              disabled={isLoading}
              className={cn(
                'border-input bg-background placeholder:text-muted-foreground focus-visible:ring-primary/20 h-11 rounded-lg border px-4 transition-colors focus-visible:ring-2',
                isRTL ? 'pr-12 pl-4' : 'pr-12 pl-10',
                errors.password &&
                  'border-destructive focus-visible:ring-destructive/20'
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
                'text-muted-foreground hover:text-foreground absolute top-1/2 -translate-y-1/2',
                isRTL ? 'left-3' : 'right-3'
              )}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className='h-5 w-5' />
              ) : (
                <Eye className='h-5 w-5' />
              )}
            </button>
          </div>
          {errors.password && (
            <p className='text-destructive text-xs'>
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type='submit'
          className='h-11 w-full rounded-lg font-medium'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2
                className={cn('h-4 w-4 animate-spin', isRTL ? 'ml-2' : 'mr-2')}
              />
              {t('Signing in')}
            </>
          ) : (
            <>
              <LogIn className={cn('h-4 w-4', isRTL ? 'ml-2' : 'mr-2')} />
              {t('Sign In')}
            </>
          )}
        </Button>
      </form>

      <p className='text-muted-foreground mt-8 text-center text-sm'>
        {t("Don't have an account?")}{' '}
        <Link
          href={`/${locale}/auth/sign-up`}
          className='text-primary font-medium hover:underline'
        >
          {t('Sign up')}
        </Link>
      </p>
    </div>
  );
}
