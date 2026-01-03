// hooks/useUpdateWarehouseItem.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { WarehouseItem } from '../types/types';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { warehouseItemService } from '@/services/warehouseItem';

export const useUpdateWarehouseItem = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('WarehouseItem');

  return useMutation({
    mutationFn: ({
      itemId,
      itemData
    }: {
      itemId: string;
      itemData: Partial<WarehouseItem>;
    }) => warehouseItemService.update(itemId, itemData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouseItems'] });
      toast.success(t('updateSuccess'));
    },

    onError: (error: any) => {
      toast.error(error?.message || t('updateError'));
    }
  });
};
