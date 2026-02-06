import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, usePathname } from 'next/navigation';
import { removeToken } from '@/auth/utils/auth-helpers';

export const useLogout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      removeToken();
      queryClient.clear();
    },
    onSuccess: () => {
      // Extract locale from current path or default to 'en'
      const localeMatch = pathname?.match(/^\/(en|ar)/);
      const locale = localeMatch ? localeMatch[1] : 'en';
      router.push(`/${locale}/auth/sign-in`);
    }
  });
};
