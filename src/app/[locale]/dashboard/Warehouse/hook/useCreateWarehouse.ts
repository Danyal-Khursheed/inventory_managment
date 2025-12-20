// hooks/useCreateWarehouse.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { warehouseService } from '@/services/warehouse.service';
import type { Warehouse } from '@/services/warehouse.service';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export const useCreateWarehouse = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('WarehouseToast');
  return useMutation({
    mutationFn: (warehouseData: Partial<Warehouse>) =>
      warehouseService.createWarehouse(warehouseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouses'] });
      toast.success(t('createSuccess'));
    },
    onError: (error: any) => {
      toast.error(error?.message || t('createError'));
    }
  });
};
