'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Page() {
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('ForgotPassword');

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async () => {
    setError('');
    if (!email) {
      setError(t('emailRequired'));
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        'https://kingshipbackend-production.up.railway.app/api/users/forgot-password',
        {
          method: 'POST',
          body: JSON.stringify({ email }),
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const data = await res.json();

      console.log(data);
      // console.log('Token:', data?.token, 'Email:', email);

      toast.success(t('Password reset link sent to your email!'));

      router.push(`/${locale}/auth/Reset-Password?token=${data?.token}`);
    } catch (err) {
      setError(t('sendResetLinkFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-muted/10 flex min-h-screen items-center justify-center px-4'>
      <div
        className={cn(
          'border-border w-full max-w-[440px] rounded-2xl border px-6 py-8 shadow-sm',
          isRTL && 'text-right'
        )}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className='mb-8 flex flex-col items-center text-center'>
          <div className='bg-primary/10 text-primary mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl'>
            <Mail className='h-6 w-6' />
          </div>
          <h1 className='text-foreground text-2xl font-semibold tracking-tight'>
            {t('Forgot Password')}
          </h1>
          <p className='text-muted-foreground mt-2 text-sm'>
            {t('Enter your email below and we will send you a reset link')}
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

        <div className='space-y-5'>
          <div className='space-y-2'>
            <Label
              htmlFor='email'
              className='text-foreground text-sm font-medium'
            >
              {t('Email')}
            </Label>
            <div className='relative'>
              <Input
                id='email'
                type='email'
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className={cn(
                  'border-input bg-background placeholder:text-muted-foreground focus-visible:ring-primary/20 h-11 rounded-lg border px-4 transition-colors focus-visible:ring-2',
                  isRTL ? 'pr-4 pl-10' : 'pr-10 pl-4'
                )}
              />
            </div>
          </div>

          <Button
            type='button'
            className='h-11 w-full rounded-lg font-medium'
            onClick={handleReset}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2
                  className={cn(
                    'h-4 w-4 animate-spin',
                    isRTL ? 'ml-2' : 'mr-2'
                  )}
                />
                {t('Sending')}
              </>
            ) : (
              t('Send Reset Link')
            )}
          </Button>

          <p className='text-muted-foreground mt-6 text-center text-sm'>
            {t('Remembered your password?')}{' '}
            <Link
              href={`/${locale}/auth/sign-in`}
              className='text-primary font-medium hover:underline'
            >
              {t('Sign In')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useTranslations } from 'next-intl';

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle
// } from '@/components/ui/card';
// import { toast } from 'sonner';

// export default function Page() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const t = useTranslations('ForgotPassword');

//   const handleReset = async () => {
//     if (!email) {
//       toast.error(t('emailRequired'));
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const res = await fetch(
//         'https://kingshipbackend-production.up.railway.app/api/users/forgot-password',
//         {
//           method: 'POST',
//           body: JSON.stringify({ email }),
//           headers: { 'Content-Type': 'application/json' }
//         }
//       );

//       const data = await res.json();
//       console.log(data);

//       toast.success(t('Password reset link sent to your email!'));

//       router.push(`/auth/Reset-Pasword?token=${data.token}`);
//     } catch (err) {
//       toast.error(t('sendResetLinkFailed'));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className='bg-muted/10 relative flex h-screen flex-col justify-center'>
//       <div className='flex items-center justify-center p-6'>
//         <div className='w-full max-w-md space-y-6'>
//           <Card className='w-full border border-gray-200 shadow-sm dark:border-neutral-800'>
//             <CardHeader className='space-y-1 text-center'>
//               <CardTitle className='text-3xl font-bold'>
//                 {t('Forgot Password')}
//               </CardTitle>
//               <CardDescription>
//                 {t('Enter your email below and we will send you a reset link')}
//               </CardDescription>
//             </CardHeader>

//             <CardContent>
//               <div className='space-y-5'>
//                 <div className='space-y-2'>
//                   <Label htmlFor='email'>{t('Email')}</Label>
//                   <Input
//                     id='email'
//                     type='email'
//                     placeholder={t('emailPlaceholder')}
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 <Button
//                   className='g-[#CCCAE6]/50 w-full text-white'
//                   onClick={handleReset}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? t('Sending') : t('Send Reset Link')}
//                 </Button>

//                 <div className='mt-6 text-center text-sm'>
//                   <span className='text-muted-foreground'>
//                     {t('Remembered your password?')}{' '}
//                   </span>
//                   <Link
//                     href='/auth/sign-in'
//                     className='text-primary font-medium underline-offset-4 hover:underline'
//                   >
//                     {t('Sign In')}
//                   </Link>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
