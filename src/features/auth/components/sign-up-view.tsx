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
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

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
    console.log('Form Data:', data);
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

      router.push('/dashboard/Warehouse');
    } catch (err: any) {
      setError(
        err.response?.data?.message || t('Failed to sign up. Please try again.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden sm:overflow-y-auto'>
      <div className='relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl'>
        <Card className='mx-2 border-2 backdrop-blur-sm md:shadow-2xl dark:bg-slate-900/80'>
          <CardHeader className='space-y-3 text-center'>
            <div className='bg-muted-foreground mx-auto flex h-12 w-12 items-center justify-center rounded-lg from-purple-500 to-pink-600 shadow-lg'>
              <UserPlus className='h-8 w-8 text-white' />
            </div>
            <CardTitle className='text-muted-foreground bg-clip-text text-3xl font-bold tracking-tight'>
              {t('Create Account')}
            </CardTitle>
            <CardDescription className='text-muted-foreground text-base'>
              {t('Enter your information to register your new account')}
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-5'>
            {error && (
              <div className='animate-in slide-in-from-top-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 shadow-sm dark:border-red-800 dark:bg-red-950/50 dark:text-red-200'>
                <div className='flex items-center gap-2'>
                  <div className='h-1.5 w-1.5 rounded-full bg-red-600' />
                  {error}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className='grid gap-5 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='fullName' className='text-sm font-medium'>
                    {t('Full Name')}
                  </Label>
                  <div className='relative'>
                    <User className='text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2' />
                    <Input
                      id='fullName'
                      placeholder={t('John Doe')}
                      disabled={isLoading}
                      className={cn(
                        'h-12 pl-12 transition-all focus:ring-2 focus:ring-purple-500/20',
                        errors.fullName &&
                          'border-red-500 focus:border-red-500',
                        isRTL && 'pr-12 pl-3 text-right'
                      )}
                      {...register('fullName', {
                        required: t('Full name is required')
                      })}
                    />
                  </div>
                  {errors.fullName && (
                    <p className='text-sm text-red-600 dark:text-red-400'>
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

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
                        'h-12 pl-12 transition-all focus:ring-2 focus:ring-purple-500/20',
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
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password' className='text-sm font-medium'>
                  {t('Password')}
                </Label>
                <div className='relative'>
                  <Lock className='text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2' />
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('At least 6 characters')}
                    disabled={isLoading}
                    className={cn(
                      'h-12 pr-12 pl-12 transition-all focus:ring-2 focus:ring-purple-500/20',
                      errors.password && 'border-red-500 focus:border-red-500',
                      isRTL && 'pr-12 pl-3 text-right'
                    )}
                    {...register('password', {
                      required: t('Password is required'),
                      minLength: {
                        value: 6,
                        message: t('Minimum 6 characters')
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

              <div className='grid gap-5 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label className='text-sm font-medium'>{t('Phone')}</Label>
                  <div className='flex gap-2'>
                    <Controller
                      name='countryCode'
                      control={control}
                      rules={{ required: t('Country code is required') }}
                      render={({ field }) => (
                        <PhoneInput
                          international
                          defaultCountry='PK'
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                          onCountryChange={(country) => {
                            if (country) {
                              field.onChange(
                                `+${getCountryCallingCode(country)}`
                              );
                            }
                          }}
                          className={cn(
                            'border-input bg-background h-12 w-20 rounded-md border px-2 text-sm transition-all focus-within:ring-2 focus-within:ring-purple-500/20',
                            errors.countryCode && 'border-red-500'
                          )}
                        />
                      )}
                    />
                    <div className='relative flex-1'>
                      <Phone className='text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2' />
                      <Input
                        type='tel'
                        placeholder={t('Phone Number')}
                        disabled={isLoading}
                        className={cn(
                          'h-12 appearance-none pl-12 transition-all [-moz-appearance:textfield] focus:ring-2 focus:ring-purple-500/20 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                          errors.phoneNumber &&
                            'border-red-500 focus:border-red-500',
                          isRTL && 'pr-12 pl-3 text-right'
                        )}
                        {...register('phoneNumber', {
                          required: t('Phone number is required')
                        })}
                      />
                    </div>
                  </div>
                  {errors.countryCode && (
                    <p className='text-sm text-red-600 dark:text-red-400'>
                      {errors.countryCode.message}
                    </p>
                  )}
                  {errors.phoneNumber && (
                    <p className='text-sm text-red-600 dark:text-red-400'>
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='address' className='text-sm font-medium'>
                    {t('Address')}
                  </Label>
                  <div className='relative'>
                    <MapPin className='text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2' />
                    <Input
                      id='address'
                      placeholder={t('Address')}
                      disabled={isLoading}
                      className={cn(
                        'h-12 pl-12 transition-all focus:ring-2 focus:ring-purple-500/20',
                        errors.address && 'border-red-500 focus:border-red-500',
                        isRTL && 'pr-12 pl-3 text-right'
                      )}
                      {...register('address', {
                        required: t('Address is required')
                      })}
                    />
                  </div>
                  {errors.address && (
                    <p className='text-sm text-red-600 dark:text-red-400'>
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type='submit'
                className='h-12 w-full from-purple-600 to-pink-600 text-white shadow-lg transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-xl disabled:opacity-50'
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    {t('Creating account...')}
                  </>
                ) : (
                  <>
                    <UserPlus className='mr-2 h-4 w-4' />
                    {t('Create Account')}
                  </>
                )}
              </Button>
            </form>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-card text-muted-foreground px-2'>
                  {t('Already have an account?')}
                </span>
              </div>
            </div>

            <div className='text-center'>
              <Link
                href='/auth/sign-in'
                className='text-md inline-flex items-center font-medium text-black transition-colors hover:text-black'
              >
                {t('Sign in')}
                <span className='ml-1'>→</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
