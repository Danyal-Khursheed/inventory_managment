import api from '@/lib/api';

export interface OrderItem {
  warehouseItemId: string;
  quantity: number;
  totalPrice: number;
  totalWeight: number;
}

/** GET /orders/:id response shape */
export interface OrderDetailWarehouse {
  id: string;
  name: string;
  address?: string;
  city?: string;
  countryName?: string;
  countryCode?: string;
}

export interface OrderDetailCountryOrigin {
  id: string;
  companyName?: string;
  addressNick?: string;
  addressLine1?: string;
  cityName?: string;
  countryName?: string;
  countryCode?: string;
  zipCode?: string;
  latitude?: string;
  longitude?: string;
  phoneCode?: string;
  mobileNo?: string;
}

export interface OrderDetailPickupAddress {
  id: string;
  addressNick?: string;
  address?: string;
  zipCode?: string;
  mobileNo?: string;
  latitude?: string;
  longitude?: string;
  cityName?: string;
  countryName?: string;
  countryCode?: string;
}

export interface OrderDetailWarehouseItem {
  id: string;
  name?: string;
  sku?: string;
  upc?: string;
  pricePerItem?: string;
  weightPerItem?: string;
  quantity?: number;
}

export interface OrderDetailOrderItem {
  id?: string;
  warehouseItemId: string;
  quantity: number;
  unitPrice?: string;
  totalPrice?: string;
  totalWeight?: string;
  warehouseItem?: OrderDetailWarehouseItem;
}

export interface OrderDetail {
  id: string;
  warehouseId: string;
  warehouse?: OrderDetailWarehouse | null;
  countryOriginId: string;
  countryOrigin?: OrderDetailCountryOrigin | null;
  pickupAddressId: string;
  pickupAddress?: OrderDetailPickupAddress | null;
  receiverName?: string;
  receiverCompanyName?: string;
  receiverEmail?: string;
  receiverMobileNo?: string;
  cod?: boolean;
  referenceId?: string;
  codAmount?: string;
  instructions?: string;
  boxLength?: string;
  boxWidth?: string;
  boxHeight?: string;
  volumetricWeight?: string;
  shippingCompanyId?: string | null;
  orderStatus?: string;
  paymentStatus?: string;
  deliveryDate?: string | null;
  orderItems?: OrderDetailOrderItem[];
}

export interface CreateOrderReceiver {
  name: string;
  companyName: string;
  email: string;
  mobileNo: string;
}

export interface CreateOrderBox {
  length: number;
  width: number;
  height: number;
  volumetricWeight: number;
}

export interface CreateOrderPayload {
  warehouseId: string;
  countryOriginId: string;
  pickupAddressId: string;
  receiver: CreateOrderReceiver;
  cod: boolean;
  referenceId: string;
  codAmount: number;
  instructions: string;
  box: CreateOrderBox;
  items: OrderItem[];
}

/** PUT /orders/:id payload — no items (whitelist validation); includes orderStatus, paymentStatus, etc. */
export interface UpdateOrderPayload extends Omit<CreateOrderPayload, 'items'> {
  orderStatus: string;
  paymentStatus: string;
  deliveryDate?: string | null;
  shippingCompanyId?: string | null;
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

  update: async (id: string, payload: UpdateOrderPayload): Promise<Order> => {
    const { data } = await api.put<Order>(`/orders/${id}`, payload);
    return data;
  },

  getAll: async (pageNumber = 1, pageSize = 10) => {
    const { data } = await api.get('/orders', {
      params: { pageNumber, pageSize }
    });
    return data;
  },

  getById: async (id: string): Promise<OrderDetail> => {
    const { data } = await api.get<{ data: OrderDetail }>(`/orders/${id}`);
    return data.data;
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
