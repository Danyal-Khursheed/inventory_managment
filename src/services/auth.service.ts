import api from '@/lib/api';
import type { SignupPayload, User } from '@/types/auth';

export interface LoginResponse {
  token: {
    token: string;
  };
  user: User;
}

export interface SignupResponse {
  token: {
    token: string;
  };
  user: User;
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/users/login', {
      email,
      password
    });
    return data;
  },

  signup: async (payload: SignupPayload): Promise<SignupResponse> => {
    const { data } = await api.post<SignupResponse>('/users/register', payload);
    return data;
  },

  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get<User>('/users/me');
    return data;
  },

  resetPassword: async (
    token: string,
    newPassword: string
  ): Promise<{ message: string }> => {
    const { data } = await api.post<{ message: string }>(
      `/users/reset-password?token=${token}`,
      { token, newPassword }
    );
    return data;
  }
};
