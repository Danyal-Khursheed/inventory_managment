import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CreateOrderPayload } from '../types/types';
import { orderService, UpdateOrderPayload } from '@/services/orderService';

export const ORDER_QUERY_KEY = 'orders';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => orderService.create(payload),
    onSuccess: (data) => {
      toast.success('Order created successfully!');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create order');
    }
  });
};

export const useOrder = (id: string | null) => {
  return useQuery({
    queryKey: [ORDER_QUERY_KEY, id],
    queryFn: () => orderService.getById(id!),
    enabled: !!id
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload
    }: {
      id: string;
      payload: UpdateOrderPayload;
    }) => orderService.update(id, payload),
    onSuccess: (data) => {
      toast.success('Order updated successfully!');
      queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEY, data.id] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update order');
    }
  });
};

// export const useDeleteOrder = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: string) => orderService.delete(id),
//     onSuccess: () => {
//       toast.success('Order deleted successfully!');
//       queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEY] });
//     },
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message || 'Failed to delete order');
//     },
//   });
// };
