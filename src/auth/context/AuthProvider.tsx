'use client';

import { createContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { useRouter } from 'next/navigation';
import { AuthContextType, User } from '../types/auth';
import { getToken, saveToken, removeToken } from '../utils/auth-helpers';

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

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    const jwt = res.data.token;

    saveToken(jwt);
    setToken(jwt);

    await refreshUser();

    router.push('/dashboard');
  };

  const signup = async (email: string, password: string, name?: string) => {
    const res = await api.post('/auth/signup', { email, password, name });
    const jwt = res.data.token;

    saveToken(jwt);
    setToken(jwt);

    await refreshUser();

    router.push('/dashboard');
  };

  const refreshUser = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setToken(null);
    router.push('/sign-in');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
