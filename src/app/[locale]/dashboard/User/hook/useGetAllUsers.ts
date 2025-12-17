import { useQuery } from '@tanstack/react-query';
import { usersService } from '@/services/users.service';

export const useGetAllUsers = (pageNumber = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ['users', pageNumber, pageSize],
    queryFn: () => usersService.getAllUsers(pageNumber, pageSize),
    staleTime: 30 * 1000 // 30 seconds
  });
};
