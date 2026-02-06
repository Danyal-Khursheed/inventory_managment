'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import useAuth from '@/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Eye,
  EyeOff,
  Loader2,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  UserPlus
} from 'lucide-react';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

type FormData = {
  fullName: string;
  email: string;
  password: string;
  countryCode: string;
  phoneNumber: string;
  address: string;
};

export default function SignUpViewPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const t = useTranslations('SignUp');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      countryCode: '+92'
    }
  });

  const onSubmit = async (data: FormData) => {
    setError('');
    setIsLoading(true);
    try {
      await signup({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        countryCode: data.countryCode,
        phoneNumber: data.phoneNumber,
        address: data.address
      });
      const localeMatch = window.location.pathname.match(/^\/(en|ar)/);
      const loc = localeMatch ? localeMatch[1] : 'en';
      router.push(`/${loc}/dashboard/Statistics`);
    } catch (err: any) {
      setError(err.response?.data?.message || t('signUpFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const inputBase = cn(
    'h-11 rounded-lg border border-input bg-background px-4 transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/20',
    'disabled:opacity-50'
  );
  const inputError = 'border-destructive focus-visible:ring-destructive/20';
  const iconLeft = isRTL ? 'right-3' : 'left-3';
  const iconPadding = isRTL ? 'pl-4 pr-10' : 'pl-10 pr-4';
  const iconPaddingPassword = isRTL ? 'pl-4 pr-12' : 'pl-10 pr-12';

  return (
    <div
      className={cn('w-full max-w-[440px]', isRTL && 'text-right')}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className='mb-6'>
        <div className='bg-primary/10 text-primary mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl'>
          <UserPlus className='h-6 w-6' />
        </div>
        <h1 className='text-foreground text-2xl font-semibold tracking-tight'>
          {t('Create Account')}
        </h1>
        <p className='text-muted-foreground mt-2 text-sm'>
          {t('Enter your information to register your new account')}
        </p>
      </div>

      {error && (
        <div className='mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300'>
          <span className='h-2 w-2 shrink-0 rounded-full bg-red-500' />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label
              htmlFor='fullName'
              className='text-foreground text-sm font-medium'
            >
              {t('Full Name')}
            </Label>
            <div className='relative'>
              <User
                className={cn(
                  'text-muted-foreground absolute top-1/2 h-5 w-5 -translate-y-1/2',
                  iconLeft
                )}
              />
              <Input
                id='fullName'
                placeholder={t('John Doe')}
                disabled={isLoading}
                className={cn(
                  inputBase,
                  iconPadding,
                  errors.fullName && inputError
                )}
                {...register('fullName', {
                  required: t('Full name is required')
                })}
              />
            </div>
            {errors.fullName && (
              <p className='text-destructive text-xs'>
                {errors.fullName.message}
              </p>
            )}
          </div>

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
                  iconLeft
                )}
              />
              <Input
                id='email'
                type='email'
                placeholder={t('emailPlaceholder')}
                disabled={isLoading}
                className={cn(
                  inputBase,
                  iconPadding,
                  errors.email && inputError
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
        </div>

        <div className='space-y-2'>
          <Label
            htmlFor='password'
            className='text-foreground text-sm font-medium'
          >
            {t('Password')}
          </Label>
          <div className='relative'>
            <Lock
              className={cn(
                'text-muted-foreground absolute top-1/2 h-5 w-5 -translate-y-1/2',
                iconLeft
              )}
            />
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder={t('At least 6 characters')}
              disabled={isLoading}
              className={cn(
                inputBase,
                iconPaddingPassword,
                errors.password && inputError
              )}
              {...register('password', {
                required: t('Password is required'),
                minLength: { value: 6, message: t('Minimum 6 characters') }
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

        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='min-w-0 space-y-2'>
            <Label className='text-foreground text-sm font-medium'>
              {t('Phone')}
            </Label>
            <div className='flex min-w-0 gap-2'>
              <Controller
                name='countryCode'
                control={control}
                rules={{ required: t('Country code is required') }}
                render={({ field }) => (
                  <div className='w-24 shrink-0'>
                    <PhoneInput
                      international
                      defaultCountry='PK'
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      onCountryChange={(country) => {
                        if (country) {
                          field.onChange(`+${getCountryCallingCode(country)}`);
                        }
                      }}
                      className={cn(
                        'border-input bg-background focus-within:ring-primary/20 flex h-11 w-full min-w-0 items-center rounded-lg border px-2 transition-colors focus-within:ring-2',
                        '[&_.PhoneInputInput]:placeholder:text-muted-foreground [&_.PhoneInputInput]:min-w-0 [&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none',
                        '[&_.PhoneInputCountrySelect]:cursor-pointer',
                        errors.countryCode &&
                          'border-destructive focus-within:ring-destructive/20'
                      )}
                    />
                  </div>
                )}
              />
              <div className='relative min-w-0 flex-1'>
                <Phone
                  className={cn(
                    'text-muted-foreground absolute top-1/2 h-5 w-5 -translate-y-1/2',
                    iconLeft
                  )}
                />
                <Input
                  type='tel'
                  placeholder={t('Phone Number')}
                  disabled={isLoading}
                  className={cn(
                    inputBase,
                    iconPadding,
                    errors.phoneNumber && inputError
                  )}
                  {...register('phoneNumber', {
                    required: t('Phone number is required')
                  })}
                />
              </div>
            </div>
            {(errors.countryCode || errors.phoneNumber) && (
              <p className='text-destructive text-xs'>
                {errors.countryCode?.message || errors.phoneNumber?.message}
              </p>
            )}
          </div>

          <div className='min-w-0 space-y-2'>
            <Label
              htmlFor='address'
              className='text-foreground text-sm font-medium'
            >
              {t('Address')}
            </Label>
            <div className='relative'>
              <MapPin
                className={cn(
                  'text-muted-foreground absolute top-1/2 h-5 w-5 -translate-y-1/2',
                  iconLeft
                )}
              />
              <Input
                id='address'
                placeholder={t('Address')}
                disabled={isLoading}
                className={cn(
                  inputBase,
                  iconPadding,
                  errors.address && inputError
                )}
                {...register('address', { required: t('Address is required') })}
              />
            </div>
            {errors.address && (
              <p className='text-destructive text-xs'>
                {errors.address.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type='submit'
          className='mt-2 h-11 w-full rounded-lg font-medium'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2
                className={cn('h-4 w-4 animate-spin', isRTL ? 'ml-2' : 'mr-2')}
              />
              {t('Creating account...')}
            </>
          ) : (
            <>
              <UserPlus className={cn('h-4 w-4', isRTL ? 'ml-2' : 'mr-2')} />
              {t('Create Account')}
            </>
          )}
        </Button>
      </form>

      <p className='text-muted-foreground mt-8 text-center text-sm'>
        {t('Already have an account?')}{' '}
        <Link
          href={`/${locale}/auth/sign-in`}
          className='text-primary font-medium hover:underline'
        >
          {t('Sign in')}
        </Link>
      </p>
    </div>
  );
}
