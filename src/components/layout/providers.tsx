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
  // we need the resolvedTheme value to set the baseTheme for clerk based on the dark or light theme
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
            process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || '/dashboard/User'
          }
          afterSignUpUrl={
            process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || '/dashboard/User'
          }
        >
          {children}
        </ClerkProvider>
      </ActiveThemeProvider>
    </>
  );
}
