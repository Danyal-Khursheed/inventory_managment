import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { saveToken } from '@/auth/utils/auth-helpers';

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (data) => {
      saveToken(data.token.token);
      queryClient.setQueryData(['currentUser'], data.user);
      router.push('/dashboard');
    }
  });
};
