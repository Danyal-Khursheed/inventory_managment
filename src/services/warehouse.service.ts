// services/warehouse.service.ts
import api from '@/lib/api';

export interface Warehouse {
  name?: string;
  address?: string;
  city?: string;
  country?: string;
  [key: string]: any;
}

export interface WarehousesResponse {
  data: Warehouse[];
  total: number;
  page: number;
  pageSize: number;
}

export const warehouseService = {
  getAllWarehouses: async (
    pageNumber = 1,
    pageSize = 10
  ): Promise<WarehousesResponse> => {
    const { data } = await api.get<WarehousesResponse>(
      '/warehouses/get-all-warehouses',
      {
        params: { pageNumber, pageSize }
      }
    );
    return data;
  },

  createWarehouse: async (
    warehouseData: Partial<Warehouse>
  ): Promise<Warehouse> => {
    const { data } = await api.post<Warehouse>(
      '/warehouses/create-warehouse',
      warehouseData
    );
    return data;
  },

  updateWarehouse: async (
    warehouseId: string,
    warehouseData: Partial<Warehouse>
  ): Promise<Warehouse> => {
    const { data } = await api.patch<Warehouse>(
      `/warehouses/update-warehouse?id=${warehouseId}`,
      warehouseData
    );
    return data;
  },

  deleteWarehouse: async (warehouseId: string): Promise<void> => {
    await api.delete('warehouses/delete-warehouse', {
      params: { id: warehouseId }
    });
  }
};
