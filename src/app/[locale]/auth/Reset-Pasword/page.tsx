'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SignIn from '@/app/Assets/Images/SignIn.png';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Image from 'next/image';
import { toast } from 'sonner';
import api from '@/auth/api/axios';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ GET VALUES FROM URL
  const otp = searchParams.get('otp') || '';
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/users/reset-password/confirm', {
        email,
        otp,
        token,
        newPassword
      });

      toast.success(response.data.message || 'Password reset successfully!');

      router.push('/auth/sign-in');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-muted/10 relative flex h-screen flex-col lg:grid lg:grid-cols-2'>
      {/* LEFT PANEL */}
      <div className='relative hidden h-full flex-col border-r bg-white p-6 lg:flex dark:bg-neutral-900'>
        <div className='relative h-full w-full overflow-hidden rounded-2xl border border-gray-100 shadow-lg dark:border-neutral-800'>
          <Image
            src={SignIn}
            alt='Reset Password Illustration'
            fill
            className='object-cover'
          />
          <div className='absolute inset-0 from-black/20 to-transparent' />
          <div className='absolute bottom-2 left-6 space-y-1 text-gray-700 drop-shadow'>
            <p className='text-xl font-semibold'>Reset your password</p>
            <p className='text-sm opacity-90'>
              Enter your OTP and new password
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className='flex items-center justify-center p-6 lg:p-10'>
        <div className='w-full max-w-md space-y-6'>
          <Card className='w-full border border-gray-200 shadow-sm dark:border-neutral-800'>
            <CardHeader className='space-y-1 text-center'>
              <CardTitle className='text-3xl font-bold tracking-tight'>
                Reset Password
              </CardTitle>
              <CardDescription>
                Enter your OTP and new password to reset
              </CardDescription>
            </CardHeader>

            <CardContent className='space-y-5'>
              <div className='space-y-2'>
                <Label htmlFor='otp'>OTP</Label>
                <Input id='otp' type='text' value={otp} disabled />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='newPassword'>New Password</Label>
                <Input
                  id='newPassword'
                  type='password'
                  placeholder='Enter new password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                  id='confirmPassword'
                  type='password'
                  placeholder='Confirm new password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button
                className='w-full'
                onClick={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
