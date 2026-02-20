export interface DefaultWarehouse {
  id: string;
  name: string;
  address: string;
  city: string;
  countryName: string;
  countryCode: string;
  warehouseItems: unknown[];
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_WAREHOUSE: DefaultWarehouse = {
  id: 'ec9bf329-e5ad-45dc-85a1-d5e2a86579c4',
  name: 'BixBites',
  address: 'BixBites',
  city: 'Dubai',
  countryName: 'United Arab Emirates',
  countryCode: 'AE',
  warehouseItems: [],
  createdAt: '2026-02-13T11:26:18.630Z',
  updatedAt: '2026-02-13T11:26:18.630Z'
};

export const DEFAULT_WAREHOUSE_ID = DEFAULT_WAREHOUSE.id;
