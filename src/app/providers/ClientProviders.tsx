'use client';

import { Provider } from 'react-redux';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/auth/context/AuthProvider';
import { QueryProvider } from '@/app/providers/query-provider';
import store from '@/redux-toolkit/store';

export default function ClientProviders({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <QueryProvider>
        <AuthProvider>
          <Toaster />
          {children}
        </AuthProvider>
      </QueryProvider>
    </Provider>
  );
}
