// hooks/useDeleteWarehouse.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { warehouseService } from '@/services/warehouse.service';

export const useDeleteWarehouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (warehouseId: string) =>
      warehouseService.deleteWarehouse(warehouseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouses'] });
    },
    onError: (error) => {
      console.error('Delete failed:', error);
    }
  });
};
