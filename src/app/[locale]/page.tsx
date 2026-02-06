'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getToken } from '@/auth/utils/auth-helpers';
import Spinner from '@/components/spinningLoading/Spinner';

export default function Page() {
  const params = useParams();
  const locale = params.locale as string;
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    // Check token immediately on mount
    const token = getToken();

    if (!hasRedirected) {
      setHasRedirected(true);

      if (token) {
        // If token exists, redirect to dashboard
        window.location.href = `/${locale}/dashboard/Statistics`;
      } else {
        // If no token, redirect to sign-in immediately
        window.location.href = `/${locale}/auth/sign-in`;
      }
    }
  }, [locale, hasRedirected]);

  // Show loading while redirecting - prevents any flash
  return (
    <div className='flex h-screen items-center justify-center'>
      <Spinner />
    </div>
  );
}
