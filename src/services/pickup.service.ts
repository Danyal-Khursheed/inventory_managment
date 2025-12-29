// services/pickup.service.ts

import api from '@/lib/api';

export interface Pickup {
  id?: string;
  address_nick: string;
  address_line1: string;
  address_line2: string;
  zip_code: string;
  phone_code: string;
  mobile_no: string;
  is_default: number;
  latitude: string;
  longitude: string;
  pickup_data: object;
  hash: string;
  city_name: string;
  country_name: string;
  country_code: string;
  [key: string]: any;
}

export interface PickupsResponse {
  data: Pickup[];
  totalCount: number;
}

export const pickupService = {
  getAllPickups: async (
    pageNumber = 1,
    pageSize = 10
  ): Promise<PickupsResponse> => {
    const { data } = await api.get<PickupsResponse>(
      'pickup-addresses/get-all-pickup-addresses?pageNumber=1&pageSize=10',
      { params: { pageNumber, pageSize } }
    );
    return data;
  },

  createPickup: async (pickupData: Partial<Pickup>): Promise<Pickup> => {
    const { data } = await api.post<Pickup>(
      '/pickup-addresses/create-pickup-address',
      pickupData
    );
    return data;
  },

  updatePickup: async (
    pickupId: string,
    pickupData: Partial<Pickup>
  ): Promise<Pickup> => {
    // const { data } = await api.patch<Pickup>(`/pickups/update?id=${pickupId}`, pickupData);
    // return data;
    return { id: pickupId, ...pickupData } as Pickup; // dummy
  },

  deletePickup: async (pickupId: string): Promise<void> => {
    // await api.delete('/pickups/delete', { params: { id: pickupId } });
  }
};
