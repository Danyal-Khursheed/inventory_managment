import { CountryOrigin } from '@/app/[locale]/dashboard/CountriesOrigin/types/types';
import api from '@/lib/api';

export interface CountryOriginResponse {
  data: CountryOrigin[];
  totalCount: number;
}

export const countryOriginService = {
  create: async (payload: Partial<CountryOrigin>): Promise<CountryOrigin> => {
    const { data } = await api.post<CountryOrigin>(
      '/companies_origin/create-company-origin',
      payload
    );
    return data;
  },

  getAll: async (
    pageNumber = 1,
    pageSize = 10
  ): Promise<CountryOriginResponse> => {
    const { data } = await api.get<CountryOriginResponse>(
      'companies_origin/get-all-packages',
      {
        params: { pageNumber, pageSize }
      }
    );
    return data;
  }
};
