// hooks/useUpdateWarehouse.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { warehouseService } from '@/services/warehouse.service';
import type { Warehouse } from '@/services/warehouse.service';

export const useUpdateWarehouse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      warehouseId,
      warehouseData
    }: {
      warehouseId: string;
      warehouseData: Partial<Warehouse>;
    }) => warehouseService.updateWarehouse(warehouseId, warehouseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouses'] });
    }
  });
};
