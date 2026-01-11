import { orderService } from '@/services/orderService';
import { useQuery } from '@tanstack/react-query';

export const useGetOrderById = (orderId: string | null) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderService.getById(orderId!),
    enabled: !!orderId
  });
};
