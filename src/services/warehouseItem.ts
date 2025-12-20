// src/services/warehouseItem.ts
import api from '@/lib/api';

export interface WarehouseItem {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  weight: number;
  warehouseId: string;
}

export interface WarehouseItemResponse {
  data: WarehouseItem[];
  total: number;
  page: number;
  pageSize: number;
}

export const warehouseService = {
  getAll: async (page = 1, pageSize = 10): Promise<WarehouseItemResponse> => {
    const { data } = await api.get('/warehouse-items', {
      params: { page, pageSize }
    });
    return data;
  },

  create: async (payload: WarehouseItem): Promise<WarehouseItem> => {
    const { data } = await api.post('/warehouse-items', payload);
    return data;
  },

  update: async (
    id: string,
    payload: Partial<WarehouseItem>
  ): Promise<WarehouseItem> => {
    const { data } = await api.patch(`/warehouse-items/${id}`, payload);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/warehouse-items/${id}`);
  }
};
