'use client';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import React from 'react';
import { ActiveThemeProvider } from '../active-theme';

export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <ClerkProvider
          appearance={{
            baseTheme: resolvedTheme === 'dark' ? dark : undefined
          }}
          signInUrl={
            process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/auth/sign-in'
          }
          signUpUrl={
            process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/auth/sign-up'
          }
          afterSignInUrl={
            process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL ||
            '/dashboard/Warehouse'
          }
          afterSignUpUrl={
            process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL ||
            '/dashboard/Warehouse'
          }
        >
          {children}
        </ClerkProvider>
      </ActiveThemeProvider>
    </>
  );
}
