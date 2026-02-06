'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useAuth from '@/auth/hooks/useAuth';
import { getToken } from '@/auth/utils/auth-helpers';
import Spinner from '@/components/spinningLoading/Spinner';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();
      const isAuthPage = pathname?.includes('/auth');

      // Extract locale from pathname
      const localeMatch = pathname?.match(/^\/(en|ar)/);
      const locale = localeMatch ? localeMatch[1] : 'en';

      // If on auth page, allow rendering
      if (isAuthPage) {
        setShouldRender(true);
        setIsChecking(false);
        return;
      }

      // If no token, redirect immediately
      if (!token) {
        router.replace(`/${locale}/auth/sign-in`);
        return;
      }

      // If token exists but no user yet, wait a bit for user to load
      if (token && !user) {
        // Give it a moment for useCurrentUser to fetch
        const timeout = setTimeout(() => {
          // If still no user after timeout, token might be invalid
          if (!user) {
            router.replace(`/${locale}/auth/sign-in`);
          } else {
            setShouldRender(true);
            setIsChecking(false);
          }
        }, 1000);

        return () => clearTimeout(timeout);
      }

      // If we have token and user, allow rendering
      if (token && user) {
        setShouldRender(true);
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [user, isAuthenticated, pathname, router]);

  // Show loading spinner while checking auth
  if (isChecking || (!pathname?.includes('/auth') && !getToken())) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  // Only render children if auth check passed
  if (shouldRender || pathname?.includes('/auth')) {
    return <>{children}</>;
  }

  // Default: show loading
  return (
    <div className='flex h-screen items-center justify-center'>
      <Spinner />
    </div>
  );
}
