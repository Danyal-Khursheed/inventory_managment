import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { getToken } from '@/auth/utils/auth-helpers';

export const useCurrentUser = () => {
  const pathname = usePathname();
  const isAuthPage = pathname?.includes('/auth');
  const token = getToken();

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.getCurrentUser,
    enabled: !!token && !isAuthPage, // Only fetch if token exists and not on auth pages
    retry: false,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};
