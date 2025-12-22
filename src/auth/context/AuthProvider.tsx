'use client';

import { createContext, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getToken } from '../utils/auth-helpers';
import { AuthContextType, SignupPayload } from '@/types/auth';
import { useLogin, useSignup, useCurrentUser, useLogout } from '@/hooks/auth';

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.includes('/auth');
  const { data: user, refetch: refreshUser } = useCurrentUser();
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const logoutMutation = useLogout();

  // Auto-fetch user if token exists, but only if not on auth pages
  useEffect(() => {
    if (isAuthPage) return; // Don't fetch on auth pages

    const existingToken = getToken();
    if (existingToken && !user) {
      refreshUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthPage]);

  const signup = async (data: SignupPayload) => {
    await signupMutation.mutateAsync(data);
  };

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const token = getToken();

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        token,
        isAuthenticated: !!user,
        signup,
        login,
        logout,
        refreshUser: async () => {
          await refreshUser();
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
