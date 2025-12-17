'use client';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useLocale } from 'next-intl';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      redirect(`/${locale}/auth/sign-in`);
    }
  }, [locale, router]);
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {/* page main content */}
        {children}
        {/* page main content ends */}
      </SidebarInset>
    </SidebarProvider>
  );
}
