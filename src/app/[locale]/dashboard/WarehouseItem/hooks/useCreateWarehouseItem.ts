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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['warehouse-items'] });
      // Show success message based on whether it's create or update
      if (variables.id) {
        toast.success(
          t('updateSuccess') || 'Warehouse item updated successfully'
        );
      } else {
        toast.success(t('createSuccess'));
      }
    },
    onError: (error: any, variables) => {
      // Show error message based on whether it's create or update
      if (variables.id) {
        toast.error(
          error?.message ||
            t('updateError') ||
            'Failed to update warehouse item'
        );
      } else {
        toast.error(error?.message || t('createError'));
      }
    }
  });
};
