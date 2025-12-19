// hooks/useCreateWarehouse.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { warehouseService } from '@/services/warehouse.service';
import type { Warehouse } from '@/services/warehouse.service';

export const useCreateWarehouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (warehouseData: Partial<Warehouse>) =>
      warehouseService.createWarehouse(warehouseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouses'] });
    }
  });
};
