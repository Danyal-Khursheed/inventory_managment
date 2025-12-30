'use client';

import { useQuery } from '@tanstack/react-query';
import {
  countryOriginService,
  CountryOriginResponse
} from '@/services/country-origin.service';

export const useCountryOrigin = (pageNumber: number, pageSize: number) => {
  return useQuery<CountryOriginResponse>({
    queryKey: ['country-origin', pageNumber, pageSize],
    queryFn: () => countryOriginService.getAll(pageNumber, pageSize)
  });
};
