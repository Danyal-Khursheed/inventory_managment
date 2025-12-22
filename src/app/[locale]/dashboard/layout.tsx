'use client';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem('auth_token');

  //   if (!token) {
  //     const currentPath = window.location.pathname;
  //     // Only redirect if we're not already on the sign-in page
  //     if (!currentPath.includes('/auth/sign-in')) {
  //       router.push(`/${locale}/auth/sign-in`);
  //     }
  //   }
  // }, [locale, router]);
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {/* page main content */}
        <div className='bg-background h-screen'>
          <div className='mx-auto h-[calc(100vh-100px)] w-full max-w-[1400px] overflow-y-auto px-4 py-10'>
            {children}
          </div>
        </div>
        {/* page main content ends */}
      </SidebarInset>
    </SidebarProvider>
  );
}
