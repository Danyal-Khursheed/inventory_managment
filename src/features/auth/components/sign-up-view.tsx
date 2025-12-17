'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import useAuth from '@/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

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
  const [showPassword, setShowPassword] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>();

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

      router.push('/dashboard/User');
    } catch (err: any) {
      setError(
        err.response?.data?.message || t('Failed to sign up. Please try again.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex h-screen items-center justify-center overflow-y-auto'>
      <div className='w-full max-w-lg'>
        <Card className='border shadow-sm'>
          <CardHeader className='space-y-1 text-center'>
            <CardTitle className='text-3xl font-bold'>
              {t('Create Account')}
            </CardTitle>
            <CardDescription className='text-lg'>
              {t('Enter your information to register your new account')}
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-5'>
            {error && (
              <div className='rounded bg-red-100 p-3 text-sm text-red-600'>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
              <div className='flex flex-col gap-2'>
                <Label>{t('Full Name')}</Label>
                <Input
                  placeholder={t('John Doe')}
                  disabled={isLoading}
                  {...register('fullName', {
                    required: t('Full name is required')
                  })}
                />
                {errors.fullName && (
                  <p className='text-sm text-red-500'>
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className='flex flex-col gap-2'>
                <Label>{t('Email')}</Label>
                <Input
                  type='email'
                  placeholder={t('emailPlaceholder')}
                  disabled={isLoading}
                  {...register('email', {
                    required: t('Email is required')
                  })}
                />
                {errors.email && (
                  <p className='text-sm text-red-500'>{errors.email.message}</p>
                )}
              </div>

              <div className='relative flex flex-col gap-2'>
                <Label>{t('Password')}</Label>

                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('At least 6 characters')}
                  disabled={isLoading}
                  className={`${isRTL ? 'pl-10 text-right' : 'pr-10 text-left'}`}
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
                  className={`absolute top-8 text-gray-500 ${
                    isRTL ? 'left-3' : 'right-3'
                  }`}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>

                {errors.password && (
                  <p className='text-sm text-red-500'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className='flex flex-col gap-2'>
                <Label>{t('Phone')}</Label>
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
                        onChange={() => {}}
                        onCountryChange={(country) => {
                          if (country)
                            field.onChange(
                              `+${getCountryCallingCode(country)}`
                            );
                        }}
                        className='border-input bg-background h-10 w-32 rounded-md border px-2 text-sm'
                        countrySelectProps={{
                          className: 'flex items-center gap-2'
                        }}
                      />
                    )}
                  />

                  <Input
                    type='number'
                    placeholder={t('Phone Number')}
                    disabled={isLoading}
                    className='h-10 flex-1 appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                    {...register('phoneNumber', {
                      required: t('Phone number is required')
                    })}
                  />
                </div>
                {errors.countryCode && (
                  <p className='text-sm text-red-500'>
                    {errors.countryCode.message}
                  </p>
                )}
                {errors.phoneNumber && (
                  <p className='text-sm text-red-500'>
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div className='flex flex-col gap-2'>
                <Label>{t('Address')}</Label>
                <Input
                  placeholder={t('Address')}
                  disabled={isLoading}
                  {...register('address', {
                    required: t('Address is required')
                  })}
                />
                {errors.address && (
                  <p className='text-sm text-red-500'>
                    {errors.address.message}
                  </p>
                )}
              </div>

              <Button
                type='submit'
                className='w-full bg-[#CCCAE6] text-black hover:bg-[#CCCAE6]/50 hover:text-black'
                disabled={isLoading}
              >
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {t('Create Account')}
              </Button>
            </form>

            <div className='mt-6 text-center text-sm'>
              <span className='text-muted-foreground'>
                {t('Already have an account?')}{' '}
              </span>
              <Link
                href='/auth/sign-in'
                className='text-primary cusror-pointer font-medium hover:underline'
              >
                {t('Sign in')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
