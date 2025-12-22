// hooks/useCreateWarehouseItem.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { WarehouseItem } from '../types/types';
import { warehouseService } from '@/services/warehouseItem';

export const useCreateWarehouseItem = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('WarehouseItemToast');

  return useMutation({
    mutationFn: (itemData: WarehouseItem) =>
      warehouseService.createWarehouseItem(itemData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouse-items'] });
      toast.success(t('createSuccess'));
    },
    onError: (error: any) => {
      toast.error(error?.message || t('createError'));
    }
  });
};
