import { WarehouseItem } from '@/app/[locale]/dashboard/WarehouseItem/types/types';
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
  totalCount: number;
}

export interface WarehouseItemsResponse {
  data: WarehouseItem[];
  totalCount: number;
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

  getAllWarehouseItems: async (
    pageNumber = 1,
    pageSize = 10
  ): Promise<WarehouseItemsResponse> => {
    const { data } = await api.get<WarehouseItemsResponse>(
      '/warehouse-items/get-all-warehouse-items',
      {
        params: { pageNumber, pageSize }
      }
    );
    return data;
  },

  createWarehouseItem: async (
    payload: WarehouseItem
  ): Promise<WarehouseItem> => {
    const { data } = await api.post(
      '/warehouse-items/create-warehouse-item',
      payload
    );
    return data;
  }
};

export const warehouseItemService = {
  update: async (
    id: string,
    payload: Partial<WarehouseItem>
  ): Promise<WarehouseItem> => {
    const { data } = await api.patch(`/warehouse-items/${id}`, payload);
    return data;
  }
};

//   delete: async (id: string): Promise<void> => {
//     await api.delete(`/warehouse-items/${id}`);
//   }
// };
