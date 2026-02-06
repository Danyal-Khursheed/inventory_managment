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
      // Get locale from current path or default to 'en'
      const pathname = window.location.pathname;
      const localeMatch = pathname.match(/^\/(en|ar)/);
      const locale = localeMatch ? localeMatch[1] : 'en';
      router.push(`/${locale}/dashboard/Statistics`);
    }
  });
};
