// hooks/useDeleteWarehouse.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { warehouseService } from '@/services/warehouse.service';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export const useDeleteWarehouse = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('WarehouseToast');
  return useMutation({
    mutationFn: (warehouseId: string) =>
      warehouseService.deleteWarehouse(warehouseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouses'] });
      toast.success(t('deleteSuccess'));
    },
    onError: (error: any) => {
      toast.error(error?.message || t('deleteError'));
    }
  });
};
