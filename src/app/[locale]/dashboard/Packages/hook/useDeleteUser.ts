import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersService } from '@/services/users.service';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => {
      console.log('Mutation received ID:', userId);
      return usersService.deleteUser(userId);
    },
    onSuccess: () => {
      console.log('User deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('Delete failed:', error);
    }
  });
};
