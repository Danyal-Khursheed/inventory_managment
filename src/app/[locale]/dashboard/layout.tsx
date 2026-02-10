'use client';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { CloseSidebarOnNavigate } from '@/components/layout/close-sidebar-on-navigate';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getToken } from '@/auth/utils/auth-helpers';
import Spinner from '@/components/spinningLoading/Spinner';
import useAuth from '@/auth/hooks/useAuth';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  const router = useRouter();
  const { user } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    // Check token immediately on mount (client-side only)
    const token = getToken();

    if (!token) {
      // No token - redirect immediately using window.location for instant redirect
      if (!hasRedirected) {
        setHasRedirected(true);
        window.location.href = `/${locale}/auth/sign-in`;
      }
      return;
    }

    // Token exists - check if user is loaded
    if (user) {
      // User is loaded, allow access
      setIsAuthorized(true);
    } else {
      // User not loaded yet - wait for it with timeout
      const timeout = setTimeout(() => {
        if (!user) {
          // No user after timeout - token might be invalid
          if (!hasRedirected) {
            setHasRedirected(true);
            window.location.href = `/${locale}/auth/sign-in`;
          }
        } else {
          setIsAuthorized(true);
        }
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [user, locale, router, hasRedirected]);

  // If redirecting, show loading
  if (hasRedirected) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  // Show loading while checking - prevents dashboard flash
  if (isAuthorized === null || !isAuthorized) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  // Only render dashboard if authorized
  return (
    <SidebarProvider defaultOpen={true}>
      <CloseSidebarOnNavigate />
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className='bg-background h-screen overflow-x-hidden'>
          <div className='mx-auto h-[calc(100vh-100px)] w-full max-w-[1400px] py-10 md:px-4'>
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
