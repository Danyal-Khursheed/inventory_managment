import api from '@/lib/api';

export interface OrderItem {
  warehouseItemId: string;
  quantity: number;
  totalPrice: number;
  totalWeight: number;
}

export interface CreateOrderPayload {
  warehouseId: string;
  countryOriginId: string;
  pickupAddressId: string;
  items: OrderItem[];
}

export interface Order extends CreateOrderPayload {
  id: string;
  createdAt: string;
}

export interface OrderResponse {
  data: Order[];
  totalCount: number;
}

export const orderService = {
  create: async (payload: CreateOrderPayload): Promise<Order> => {
    const { data } = await api.post<Order>('/orders/create-order', payload);
    return data;
  },

  getAll: async (pageNumber = 1, pageSize = 10) => {
    const { data } = await api.get('/orders', {
      params: { pageNumber, pageSize }
    });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/orders/${id}`);
  }
};

//   getById: async (id: string): Promise<Order> => {
//     const { data } = await api.get<Order>(`/orders/${id}`);
//     return data;
//   },

//   update: async (id: string, payload: Partial<CreateOrderPayload>): Promise<Order> => {
//     const { data } = await api.put<Order>(`/orders/${id}`, payload);
//     return data;
//   },
