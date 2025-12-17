'use client';

import { createContext, useEffect } from 'react';
import { getToken } from '../utils/auth-helpers';
import { AuthContextType, SignupPayload } from '@/types/auth';
import { useLogin, useSignup, useCurrentUser, useLogout } from '@/hooks/auth';

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, refetch: refreshUser } = useCurrentUser();
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const logoutMutation = useLogout();

  // Auto-fetch user if token exists
  useEffect(() => {
    const existingToken = getToken();
    if (existingToken && !user) {
      refreshUser();
    }
  }, []);

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
