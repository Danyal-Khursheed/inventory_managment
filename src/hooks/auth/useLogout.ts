import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { removeToken } from '@/auth/utils/auth-helpers';

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      removeToken();
      queryClient.clear();
    },
    onSuccess: () => {
      router.push('/auth/sign-in');
    }
  });
};
