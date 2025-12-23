// hooks/useDeleteWarehouseItem.ts
import { warehouseDeleteItemService } from '@/services/warehouseItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteWarehouseItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => warehouseDeleteItemService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['warehouse-items'],
        exact: false
      });
      toast.success('Warehouse item deleted successfully');
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Failed to delete warehouse item');
    }
  });
};
