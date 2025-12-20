// hooks/useUpdateWarehouse.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { warehouseService } from '@/services/warehouse.service';
import type { Warehouse } from '@/services/warehouse.service';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export const useUpdateWarehouse = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('WarehouseToast');

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
      toast.success(t('updateSuccess'));
    },

    onError: (error: any) => {
      toast.error(error?.message || t('updateError'));
    }
  });
};
