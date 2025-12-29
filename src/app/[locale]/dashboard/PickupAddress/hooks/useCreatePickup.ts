import { useMutation, useQueryClient } from '@tanstack/react-query';
import { pickupService, Pickup } from '@/services/pickup.service';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export const useCreatePickup = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('PickupToast');

  return useMutation({
    mutationFn: (pickupData: Partial<Pickup>) =>
      pickupService.createPickup(pickupData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pickups'] });
      toast.success(t('createSuccess'));
    },
    onError: (error: any) => {
      toast.error(error?.message || t('createError'));
    }
  });
};
