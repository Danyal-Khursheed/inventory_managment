import axios from 'axios';
import { getToken } from '../utils/auth-helpers';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - token might be expired
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/auth/sign-in';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
