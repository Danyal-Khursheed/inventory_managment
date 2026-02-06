import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '@/auth/utils/auth-helpers';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      removeToken();
      if (typeof window !== 'undefined') {
        // Only redirect if not already on an auth page
        const isAuthPage = window.location.pathname.includes('/auth');
        if (!isAuthPage) {
          // Extract locale from current path or default to 'en'
          const localeMatch = window.location.pathname.match(/^\/(en|ar)/);
          const locale = localeMatch ? localeMatch[1] : 'en';
          window.location.href = `/${locale}/auth/sign-in`;
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
