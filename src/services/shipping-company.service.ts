import api from '@/lib/api';

export interface ShippingCompany {
  id?: string;
  serviceName: string;
  serviceType: string;
  [key: string]: any;
}

export interface ShippingCompaniesResponse {
  data: ShippingCompany[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export const shippingCompanyService = {
  getAll: async (
    pageNumber = 1,
    pageSize = 10
  ): Promise<ShippingCompaniesResponse> => {
    const { data } = await api.get<ShippingCompaniesResponse>(
      '/shipping-companies/get-all-shipping-companies',
      {
        params: { pageNumber, pageSize } // <-- dynamically pass pageNumber and pageSize
      }
    );
    return data;
  },

  create: async (
    companyData: Partial<ShippingCompany>
  ): Promise<ShippingCompany> => {
    const { data } = await api.post<ShippingCompany>(
      '/shipping-companies/create-shipping-company',
      companyData
    );
    return data;
  }
};
