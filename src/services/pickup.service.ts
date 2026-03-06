// services/pickup.service.ts

import api from '@/lib/api';

/** API expects snake_case. Use this for create/update payloads. */
export interface PickupCreatePayload {
  address_nick: string;
  address?: string;
  address_line1?: string;
  address_line2?: string;
  city_name: string;
  country_name: string;
  country_code: string;
  mobile_no: string;
  zip_code?: string;
  phone_code?: string;
  latitude?: string;
  longitude?: string;
  warehouse_id: string;
}

export interface Pickup {
  id?: string;
  addressNick: string;
  zipCode: string;
  mobileNo: string;
  latitude: string;
  longitude: string;
  cityName: string;
  countryName: string;
  countryCode: string;
}

export interface PickupsResponse {
  data: Pickup[];
  totalCount: number;
}

/** Convert camelCase or mixed payload to snake_case for create-pickup-address API (whitelist expects snake_case only). */
function toCreatePickupPayload(
  data: Record<string, unknown>
): Record<string, unknown> {
  const keyMap: [string, string][] = [
    ['address_nick', 'address_nick'],
    ['addressNick', 'address_nick'],
    ['address', 'address'],
    ['address_line1', 'address_line1'],
    ['address_line2', 'address_line2'],
    ['city_name', 'city_name'],
    ['cityName', 'city_name'],
    ['country_name', 'country_name'],
    ['countryName', 'country_name'],
    ['country_code', 'country_code'],
    ['countryCode', 'country_code'],
    ['country_iso_code', 'country_code'],
    ['mobile_no', 'mobile_no'],
    ['mobileNo', 'mobile_no'],
    ['zip_code', 'zip_code'],
    ['zipCode', 'zip_code'],
    ['phone_code', 'phone_code'],
    ['latitude', 'latitude'],
    ['longitude', 'longitude'],
    ['warehouse_id', 'warehouse_id'],
    ['warehouseId', 'warehouse_id']
  ];
  const out: Record<string, unknown> = {};
  for (const [from, to] of keyMap) {
    if (data[from] !== undefined && data[from] !== null) {
      out[to] = data[from];
    }
  }
  return out;
}

export const pickupService = {
  getAllPickups: async (
    pageNumber = 1,
    pageSize = 10
  ): Promise<PickupsResponse> => {
    const { data } = await api.get<PickupsResponse>(
      'pickup-addresses/get-all-pickup-addresses',
      { params: { pageNumber, pageSize } }
    );
    return data;
  },
  createPickup: async (
    pickupData: Partial<Pickup> | PickupCreatePayload | Record<string, unknown>
  ): Promise<Pickup> => {
    const body = toCreatePickupPayload(pickupData as Record<string, unknown>);
    const { data } = await api.post<Pickup>(
      '/pickup-addresses/create-pickup-address',
      body
    );
    return data;
  }
};
