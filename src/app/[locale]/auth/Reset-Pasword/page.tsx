'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { toast } from 'sonner';
import api from '@/lib/api';
import { Eye, EyeOff } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('ResetPassword');

  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const handleResetPassword = async () => {
    if (!newPassword) {
      toast.error(t('Enter new password'));
      return;
    }

    if (newPassword.length < 6) {
      toast.error(t('Enter new password'));
      return;
    }

    if (!token) {
      toast.error(t('Reset Password'));
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post(`/users/reset-password?token=${token}`, {
        token,
        newPassword
      });

      toast.success(response.data.message || t('Reset Password'));
      router.push('/auth/sign-in');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t('Reset Password'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-muted/10 relative flex h-screen flex-col justify-center'>
      <div className='flex items-center justify-center p-6 lg:p-10'>
        <div className='w-full max-w-md space-y-6'>
          <Card className='w-full border border-gray-200 shadow-sm dark:border-neutral-800'>
            <CardHeader className='space-y-1 text-center'>
              <CardTitle className='text-3xl font-bold tracking-tight'>
                {t('Reset Password')}
              </CardTitle>
              <CardDescription>
                {t('Enter your new password to reset')}
              </CardDescription>
            </CardHeader>

            <CardContent className='space-y-5'>
              <div className='relative space-y-2'>
                <Label htmlFor='newPassword'>{t('New Password')}</Label>

                <Input
                  id='newPassword'
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('Enter new password')}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                  className={`pr-10 pl-10 ${isRTL ? 'pr-3 pl-10 text-right' : 'pr-10 pl-3 text-left'}`}
                />

                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-8 ${isRTL ? 'left-3' : 'right-3'} text-gray-500`}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>

              <Button
                className='w-full bg-[#CCCAE6] text-black/80 hover:bg-[#CCCAE6]/50 hover:text-black'
                onClick={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? t('Resetting') : t('Reset Password')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
