'use client';

import { useQuery } from '@tanstack/react-query';
import {
  shippingCompanyService,
  ShippingCompaniesResponse
} from '@/services/shipping-company.service';

interface Params {
  pageNumber?: number;
  pageSize?: number;
}

export const useShippingCompanies = ({
  pageNumber = 1,
  pageSize = 10
}: Params) => {
  return useQuery<ShippingCompaniesResponse>({
    queryKey: ['shipping-companies', pageNumber, pageSize],
    queryFn: () => shippingCompanyService.getAll(pageNumber, pageSize)
  });
};
