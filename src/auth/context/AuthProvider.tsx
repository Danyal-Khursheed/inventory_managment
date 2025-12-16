'use client';

import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../api/axios';
import { getToken, saveToken, removeToken } from '../utils/auth-helpers';
import { User, AuthContextType, SignupPayload } from '@/types/auth';

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const existingToken = getToken();
    if (existingToken) {
      setToken(existingToken);
      refreshUser();
    }
  }, []);

  // ✅ SIGNUP
  const signup = async (data: SignupPayload) => {
    try {
      const res = await api.post('/users/register', data);

      const { token, user } = res.data;

      saveToken(token.token);
      setToken(token.token);
      setUser(user);

      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  // ✅ LOGIN
  const login = async (email: string, password: string) => {
    const res = await api.post('/users/login', {
      email,
      password
    });

    const jwt = res.data.token.token;

    saveToken(jwt);
    setToken(jwt);
    console.log(res.data, 'token');

    await refreshUser();
    router.push('/dashboard');
  };

  const refreshUser = async () => {
    try {
      const res = await api.get('/api/users/me');
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setToken(null);
    router.push('/auth/sign-in');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        signup,
        login,
        logout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
