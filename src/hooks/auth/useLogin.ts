import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { saveToken } from '@/auth/utils/auth-helpers';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (data) => {
      saveToken(data.token.token);
      queryClient.setQueryData(['currentUser'], data.user);
      // Don't redirect here - let the component handle it with locale
    }
  });
};
