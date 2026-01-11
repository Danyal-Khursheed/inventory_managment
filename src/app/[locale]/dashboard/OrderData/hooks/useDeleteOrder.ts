import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services/orderService';
import { toast } from 'sonner';

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => orderService.delete(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllOrders'] });
      toast.success('Order deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to delete order');
    }
  });
};
