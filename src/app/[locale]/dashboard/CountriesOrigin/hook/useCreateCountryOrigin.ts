import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { countryOriginService } from '@/services/country-origin.service';
import { CountryOrigin } from '../types/types';

export const useCreateCountryOrigin = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('CountryOrigin');

  return useMutation({
    mutationFn: (payload: Partial<CountryOrigin>) =>
      countryOriginService.create(payload), // Call the API service to create the country

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['country-origin'] }); // Invalidate queries on success
      toast.success(t('createSuccess')); // Display success toast message
    },

    onError: (error: any) => {
      toast.error(error?.message || t('createError')); // Display error toast message
    }
  });
};
