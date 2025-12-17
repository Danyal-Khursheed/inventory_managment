import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { saveToken } from '@/auth/utils/auth-helpers';
import type { SignupPayload } from '@/types/auth';

export const useSignup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SignupPayload) => authService.signup(payload),
    onSuccess: (data) => {
      saveToken(data.token.token);
      queryClient.setQueryData(['currentUser'], data.user);
      router.push('/dashboard');
    }
  });
};
