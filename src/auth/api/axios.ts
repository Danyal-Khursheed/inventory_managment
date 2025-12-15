import axios from 'axios';
import { getToken } from '../utils/auth-helpers';

const api = axios.create({
  baseURL: 'https://kingshipbackend-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
