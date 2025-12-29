import { useMutation, useQueryClient } from '@tanstack/react-query';
import { shippingCompanyService } from '@/services/shipping-company.service';
import type { ShippingCompany } from '@/services/shipping-company.service';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export const useCreateShippingCompany = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('ShippingCompanyToast');

  return useMutation({
    mutationFn: (companyData: Partial<ShippingCompany>) =>
      shippingCompanyService.create(companyData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipping-companies'] });
      toast.success(t('createSuccess'));
    },

    onError: (error: any) => {
      toast.error(error?.message || t('createError'));
    }
  });
};
